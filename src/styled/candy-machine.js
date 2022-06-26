import * as anchor from '@project-serum/anchor';
import { MintLayout, TOKEN_PROGRAM_ID, Token } from '@solana/spl-token';
import { SystemProgram, SYSVAR_SLOT_HASHES_PUBKEY, } from '@solana/web3.js';
import { sendTransactions, SequenceType } from './connection';
import { CIVIC, getAtaForMint, getNetworkExpire, getNetworkToken, SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID, } from './utils';
export const CANDY_MACHINE_PROGRAM = new anchor.web3.PublicKey('cndy3Z4yapfJBmL3ShUp5exZKqR3z33thTzeNMm2gRZ');
const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
export const awaitTransactionSignatureConfirmation = async (txid, timeout, connection, queryStatus = false) => {
    let done = false;
    let status = {
        slot: 0,
        confirmations: 0,
        err: null,
    };
    let subId = 0;
    status = await new Promise(async (resolve, reject) => {
        setTimeout(() => {
            if (done) {
                return;
            }
            done = true;
            reject({ timeout: true });
        }, timeout);
        while (!done && queryStatus) {
            // eslint-disable-next-line no-loop-func
            (async () => {
                try {
                    const signatureStatuses = await connection.getSignatureStatuses([
                        txid,
                    ]);
                    status = signatureStatuses && signatureStatuses.value[0];
                    if (!done) {
                        if (!status) {
                            console.log('REST null result for', txid, status);
                        }
                        else if (status.err) {
                            done = true;
                            reject(status.err);
                        }
                        else if (!status.confirmations) {
                            console.log('REST no confirmations for', txid, status);
                        }
                        else {
                            done = true;
                            resolve(status);
                        }
                    }
                }
                catch (e) {
                    if (!done) {
                        console.log('REST connection error: txid', txid, e);
                    }
                }
            })();
            await sleep(2000);
        }
    });
    //@ts-ignore
    if (connection._signatureSubscriptions[subId]) {
        connection.removeSignatureListener(subId);
    }
    done = true;
    return status;
};
const createAssociatedTokenAccountInstruction = (associatedTokenAddress, payer, walletAddress, splTokenMintAddress) => {
    const keys = [
        { pubkey: payer, isSigner: true, isWritable: true },
        { pubkey: associatedTokenAddress, isSigner: false, isWritable: true },
        { pubkey: walletAddress, isSigner: false, isWritable: false },
        { pubkey: splTokenMintAddress, isSigner: false, isWritable: false },
        {
            pubkey: anchor.web3.SystemProgram.programId,
            isSigner: false,
            isWritable: false,
        },
        { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        {
            pubkey: anchor.web3.SYSVAR_RENT_PUBKEY,
            isSigner: false,
            isWritable: false,
        },
    ];
    return new anchor.web3.TransactionInstruction({
        keys,
        programId: SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
        data: Buffer.from([]),
    });
};
export const getCandyMachineState = async (anchorWallet, candyMachineId, connection) => {
    const provider = new anchor.Provider(connection, anchorWallet, {
        preflightCommitment: 'processed',
    });
    const idl = await anchor.Program.fetchIdl(CANDY_MACHINE_PROGRAM, provider);
    const program = new anchor.Program(idl, CANDY_MACHINE_PROGRAM, provider);
    const state = await program.account.candyMachine.fetch(candyMachineId);
    const itemsAvailable = state.data.itemsAvailable.toNumber();
    const itemsRedeemed = state.itemsRedeemed.toNumber();
    const itemsRemaining = itemsAvailable - itemsRedeemed;
    return {
        id: candyMachineId,
        program,
        state: {
            authority: state.authority,
            itemsAvailable,
            itemsRedeemed,
            itemsRemaining,
            isSoldOut: itemsRemaining === 0,
            isActive: false,
            isPresale: false,
            isWhitelistOnly: false,
            goLiveDate: state.data.goLiveDate,
            treasury: state.wallet,
            tokenMint: state.tokenMint,
            gatekeeper: state.data.gatekeeper,
            endSettings: state.data.endSettings,
            whitelistMintSettings: state.data.whitelistMintSettings,
            hiddenSettings: state.data.hiddenSettings,
            price: state.data.price,
            retainAuthority: state.data.retainAuthority,
        },
    };
};
const getMasterEdition = async (mint) => {
    return (await anchor.web3.PublicKey.findProgramAddress([
        Buffer.from('metadata'),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
        Buffer.from('edition'),
    ], TOKEN_METADATA_PROGRAM_ID))[0];
};
const getMetadata = async (mint) => {
    return (await anchor.web3.PublicKey.findProgramAddress([
        Buffer.from('metadata'),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
    ], TOKEN_METADATA_PROGRAM_ID))[0];
};
export const getCandyMachineCreator = async (candyMachine) => {
    return await anchor.web3.PublicKey.findProgramAddress([Buffer.from('candy_machine'), candyMachine.toBuffer()], CANDY_MACHINE_PROGRAM);
};
export const getCollectionPDA = async (candyMachineAddress) => {
    return await anchor.web3.PublicKey.findProgramAddress([Buffer.from('collection'), candyMachineAddress.toBuffer()], CANDY_MACHINE_PROGRAM);
};
export const getCollectionAuthorityRecordPDA = async (mint, newAuthority) => {
    return (await anchor.web3.PublicKey.findProgramAddress([
        Buffer.from('metadata'),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
        Buffer.from('collection_authority'),
        newAuthority.toBuffer(),
    ], TOKEN_METADATA_PROGRAM_ID))[0];
};
export const createAccountsForMint = async (candyMachine, payer) => {
    const mint = anchor.web3.Keypair.generate();
    const userTokenAccountAddress = (await getAtaForMint(mint.publicKey, payer))[0];
    const signers = [mint];
    const instructions = [
        anchor.web3.SystemProgram.createAccount({
            fromPubkey: payer,
            newAccountPubkey: mint.publicKey,
            space: MintLayout.span,
            lamports: await candyMachine.program.provider.connection.getMinimumBalanceForRentExemption(MintLayout.span),
            programId: TOKEN_PROGRAM_ID,
        }),
        Token.createInitMintInstruction(TOKEN_PROGRAM_ID, mint.publicKey, 0, payer, payer),
        createAssociatedTokenAccountInstruction(userTokenAccountAddress, payer, payer, mint.publicKey),
        Token.createMintToInstruction(TOKEN_PROGRAM_ID, mint.publicKey, userTokenAccountAddress, payer, [], 1),
    ];
    return {
        mint: mint,
        userTokenAccount: userTokenAccountAddress,
        transaction: (await sendTransactions(candyMachine.program.provider.connection, candyMachine.program.provider.wallet, [instructions], [signers], SequenceType.StopOnFailure, 'singleGossip', () => { }, () => false, undefined, [], [])).txs[0].txid,
    };
};
export const mintOneToken = async (candyMachine, payer, beforeTransactions = [], afterTransactions = [], setupState) => {
    var _a;
    const mint = (_a = setupState === null || setupState === void 0 ? void 0 : setupState.mint) !== null && _a !== void 0 ? _a : anchor.web3.Keypair.generate();
    const userTokenAccountAddress = (await getAtaForMint(mint.publicKey, payer))[0];
    const userPayingAccountAddress = candyMachine.state.tokenMint
        ? (await getAtaForMint(candyMachine.state.tokenMint, payer))[0]
        : payer;
    const candyMachineAddress = candyMachine.id;
    const remainingAccounts = [];
    const instructions = [];
    const signers = [];
    if (!setupState) {
        signers.push(mint);
        instructions.push(...[
            anchor.web3.SystemProgram.createAccount({
                fromPubkey: payer,
                newAccountPubkey: mint.publicKey,
                space: MintLayout.span,
                lamports: await candyMachine.program.provider.connection.getMinimumBalanceForRentExemption(MintLayout.span),
                programId: TOKEN_PROGRAM_ID,
            }),
            Token.createInitMintInstruction(TOKEN_PROGRAM_ID, mint.publicKey, 0, payer, payer),
            createAssociatedTokenAccountInstruction(userTokenAccountAddress, payer, payer, mint.publicKey),
            Token.createMintToInstruction(TOKEN_PROGRAM_ID, mint.publicKey, userTokenAccountAddress, payer, [], 1),
        ]);
    }
    if (candyMachine.state.gatekeeper) {
        remainingAccounts.push({
            pubkey: (await getNetworkToken(payer, candyMachine.state.gatekeeper.gatekeeperNetwork))[0],
            isWritable: true,
            isSigner: false,
        });
        if (candyMachine.state.gatekeeper.expireOnUse) {
            remainingAccounts.push({
                pubkey: CIVIC,
                isWritable: false,
                isSigner: false,
            });
            remainingAccounts.push({
                pubkey: (await getNetworkExpire(candyMachine.state.gatekeeper.gatekeeperNetwork))[0],
                isWritable: false,
                isSigner: false,
            });
        }
    }
    if (candyMachine.state.whitelistMintSettings) {
        const mint = new anchor.web3.PublicKey(candyMachine.state.whitelistMintSettings.mint);
        const whitelistToken = (await getAtaForMint(mint, payer))[0];
        remainingAccounts.push({
            pubkey: whitelistToken,
            isWritable: true,
            isSigner: false,
        });
        if (candyMachine.state.whitelistMintSettings.mode.burnEveryTime) {
            remainingAccounts.push({
                pubkey: mint,
                isWritable: true,
                isSigner: false,
            });
            remainingAccounts.push({
                pubkey: payer,
                isWritable: false,
                isSigner: true,
            });
        }
    }
    if (candyMachine.state.tokenMint) {
        remainingAccounts.push({
            pubkey: userPayingAccountAddress,
            isWritable: true,
            isSigner: false,
        });
        remainingAccounts.push({
            pubkey: payer,
            isWritable: false,
            isSigner: true,
        });
    }
    const metadataAddress = await getMetadata(mint.publicKey);
    const masterEdition = await getMasterEdition(mint.publicKey);
    const [candyMachineCreator, creatorBump] = await getCandyMachineCreator(candyMachineAddress);
    instructions.push(await candyMachine.program.instruction.mintNft(creatorBump, {
        accounts: {
            candyMachine: candyMachineAddress,
            candyMachineCreator,
            payer: payer,
            wallet: candyMachine.state.treasury,
            mint: mint.publicKey,
            metadata: metadataAddress,
            masterEdition,
            mintAuthority: payer,
            updateAuthority: payer,
            tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
            recentBlockhashes: SYSVAR_SLOT_HASHES_PUBKEY,
            instructionSysvarAccount: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
        },
        remainingAccounts: remainingAccounts.length > 0 ? remainingAccounts : undefined,
    }));
    const [collectionPDA] = await getCollectionPDA(candyMachineAddress);
    const collectionPDAAccount = await candyMachine.program.provider.connection.getAccountInfo(collectionPDA);
    if (collectionPDAAccount && candyMachine.state.retainAuthority) {
        try {
            const collectionData = (await candyMachine.program.account.collectionPda.fetch(collectionPDA));
            const collectionMint = collectionData.mint;
            const collectionAuthorityRecord = await getCollectionAuthorityRecordPDA(collectionMint, collectionPDA);
            if (collectionMint) {
                const collectionMetadata = await getMetadata(collectionMint);
                const collectionMasterEdition = await getMasterEdition(collectionMint);
                instructions.push(await candyMachine.program.instruction.setCollectionDuringMint({
                    accounts: {
                        candyMachine: candyMachineAddress,
                        metadata: metadataAddress,
                        payer: payer,
                        collectionPda: collectionPDA,
                        tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
                        instructions: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
                        collectionMint,
                        collectionMetadata,
                        collectionMasterEdition,
                        authority: candyMachine.state.authority,
                        collectionAuthorityRecord,
                    },
                }));
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    const instructionsMatrix = [instructions];
    const signersMatrix = [signers];
    try {
        const txns = (await sendTransactions(candyMachine.program.provider.connection, candyMachine.program.provider.wallet, instructionsMatrix, signersMatrix, SequenceType.StopOnFailure, 'singleGossip', () => { }, () => false, undefined, beforeTransactions, afterTransactions)).txs.map(t => t.txid);
        const mintTxn = txns[0];
        return {
            mintTxId: mintTxn,
            metadataKey: metadataAddress,
        };
    }
    catch (e) {
        console.log(e);
    }
    return null;
};
export const shortenAddress = (address, chars = 4) => {
    return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};