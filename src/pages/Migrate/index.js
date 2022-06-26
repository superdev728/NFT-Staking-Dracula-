import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Grid,
  Button,
  Snackbar,
} from '@mui/material'
import Alert from '@mui/material/Alert';
import Pagination from '@mui/material/Pagination';
import styled from "styled-components";
// import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import {
  MintContainer,
  GenSection,
  MintSection,
  MintButton,
  Labheader,
} from 'styled/mint'
import MintHeadSection from 'components/MintHeadSection';
import { isMobile } from "react-device-detect"
import { useWallet } from "@solana/wallet-adapter-react";
import {
  awaitTransactionSignatureConfirmation,
  CANDY_MACHINE_PROGRAM,
  CandyMachineAccount,
  createAccountsForMint,
  getCandyMachineState,
  getCollectionPDA,
  mintOneToken,
  SetupState,
} from '../../styled/candy-machine';
import * as anchor from "@project-serum/anchor";
import { GatewayProvider } from "@civic/solana-gateway-react";
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { sendTransaction } from '../../styled/connection';
import {
  Commitment,
  Connection,
  PublicKey,
  Transaction,
} from '@solana/web3.js';
import { AlertState, formatNumber, getAtaForMint, toDate } from '../../styled/utils';
import toast, { Toaster } from "react-hot-toast";

const ConnectButton = styled(WalletDialogButton)`
  width: 100%;
  height: 60px;
  margin-top: 10px;
  margin-bottom: 5px;
  background: linear-gradient(180deg, #604ae5 0%, #813eee 100%);
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const gens = [
  { name: "Gen0", img: "/gen0.png", empty: false },
  { name: "Gen1", img: "/emptygen.png", empty: true },
  { name: "Gen2", img: "/emptygen.png", empty: true },
  { name: "Gen3", img: "/emptygen.png", empty: true },
  { name: "Gen4", img: "/emptygen.png", empty: true },
  { name: "Gen5", img: "/emptygen.png", empty: true },
  { name: "Gen6", img: "/emptygen.png", empty: true },
  { name: "Gen7", img: "/emptygen.png", empty: true },
  { name: "Gen8", img: "/emptygen.png", empty: true },
]

const getCandyMachineId = () => {
  try {
    const candyMachineId = new anchor.web3.PublicKey(
      process.env.REACT_APP_CANDY_MACHINE_ID
    );
    return candyMachineId;
  } catch (e) {
    console.log("Failed to construct CandyMachineId", e);
    return undefined;
  }
};

const candyMachineId = getCandyMachineId();
const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST;
const connection = new anchor.web3.Connection(
  rpcHost ? rpcHost : anchor.web3.clusterApiUrl("devnet")
);
const txTimeout = 30000;
const network = process.env.REACT_APP_SOLANA_NETWORK

export default function Migrate() {

  // -------------

  const [isUserMinting, setIsUserMinting] = useState(false);
  const [candyMachine, setCandyMachine] = useState();
  const [alertState, setAlertState] = useState({
    open: false,
    message: '',
    severity: undefined,
  });
  const [isActive, setIsActive] = useState(false);
  const [endDate, setEndDate] = useState();
  const [itemsRemaining, setItemsRemaining] = useState();
  const [isWhitelistUser, setIsWhitelistUser] = useState(false);
  const [isPresale, setIsPresale] = useState(false);
  const [isValidBalance, setIsValidBalance] = useState(false);
  const [discountPrice, setDiscountPrice] = useState();
  const [needTxnSplit, setNeedTxnSplit] = useState(true);
  const [setupTxn, setSetupTxn] = useState();

  const rpcUrl = rpcHost;
  const wallet = useWallet();

  const anchorWallet = useMemo(() => {
    if (
      !wallet ||
      !wallet.publicKey ||
      !wallet.signAllTransactions ||
      !wallet.signTransaction
    ) {
      return;
    }

    return {
      publicKey: wallet.publicKey,
      signAllTransactions: wallet.signAllTransactions,
      signTransaction: wallet.signTransaction,
    };
  }, [wallet]);

  const refreshCandyMachineState = useCallback(
    async (commitment = 'confirmed') => {
      if (!anchorWallet) {
        return;
      }

      const connection = new Connection(rpcHost, commitment);

      if (candyMachineId) {
        try {
          const cndy = await getCandyMachineState(
            anchorWallet,
            candyMachineId,
            connection,
          );
          let active =
            cndy?.state.goLiveDate?.toNumber() < new Date().getTime() / 1000;
          let presale = false;

          // duplication of state to make sure we have the right values!
          let isWLUser = false;
          let userPrice = cndy.state.price;

          // whitelist mint?
          if (cndy?.state.whitelistMintSettings) {
            // is it a presale mint?
            if (
              cndy.state.whitelistMintSettings.presale &&
              (!cndy.state.goLiveDate ||
                cndy.state.goLiveDate.toNumber() > new Date().getTime() / 1000)
            ) {
              presale = true;
            }
            // is there a discount?
            if (cndy.state.whitelistMintSettings.discountPrice) {
              setDiscountPrice(cndy.state.whitelistMintSettings.discountPrice);
              userPrice = cndy.state.whitelistMintSettings.discountPrice;
            } else {
              setDiscountPrice(undefined);
              // when presale=false and discountPrice=null, mint is restricted
              // to whitelist users only
              if (!cndy.state.whitelistMintSettings.presale) {
                cndy.state.isWhitelistOnly = true;
              }
            }
            // retrieves the whitelist token
            const mint = new anchor.web3.PublicKey(
              cndy.state.whitelistMintSettings.mint,
            );
            const token = (
              await getAtaForMint(mint, anchorWallet.publicKey)
            )[0];

            try {
              const balance = await connection.getTokenAccountBalance(token);
              isWLUser = parseInt(balance.value.amount) > 0;
              // only whitelist the user if the balance > 0
              setIsWhitelistUser(isWLUser);

              if (cndy.state.isWhitelistOnly) {
                active = isWLUser && (presale || active);
              }
            } catch (e) {
              setIsWhitelistUser(false);
              // no whitelist user, no mint
              if (cndy.state.isWhitelistOnly) {
                active = false;
              }
              console.log(
                'There was a problem fetching whitelist token balance',
              );
            }
          }
          userPrice = isWLUser ? userPrice : cndy.state.price;

          if (cndy?.state.tokenMint) {
            // retrieves the SPL token
            const mint = new anchor.web3.PublicKey(cndy.state.tokenMint);
            const token = (
              await getAtaForMint(mint, anchorWallet.publicKey)
            )[0];
            try {
              const balance = await connection.getTokenAccountBalance(token);

              const valid = new anchor.BN(balance.value.amount).gte(userPrice);

              // only allow user to mint if token balance >  the user if the balance > 0
              setIsValidBalance(valid);
              active = active && valid;
            } catch (e) {
              setIsValidBalance(false);
              active = false;
              // no whitelist user, no mint
              console.log('There was a problem fetching SPL token balance');
            }
          } else {
            const balance = new anchor.BN(
              await connection.getBalance(anchorWallet.publicKey),
            );
            const valid = balance.gte(userPrice);
            setIsValidBalance(valid);
            active = active && valid;
          }

          // datetime to stop the mint?
          if (cndy?.state.endSettings?.endSettingType.date) {
            setEndDate(toDate(cndy.state.endSettings.number));
            if (
              cndy.state.endSettings.number.toNumber() <
              new Date().getTime() / 1000
            ) {
              active = false;
            }
          }
          // amount to stop the mint?
          if (cndy?.state.endSettings?.endSettingType.amount) {
            let limit = Math.min(
              cndy.state.endSettings.number.toNumber(),
              cndy.state.itemsAvailable,
            );
            if (cndy.state.itemsRedeemed < limit) {
              setItemsRemaining(limit - cndy.state.itemsRedeemed);
            } else {
              setItemsRemaining(0);
              cndy.state.isSoldOut = true;
            }
          } else {
            setItemsRemaining(cndy.state.itemsRemaining);
          }

          if (cndy.state.isSoldOut) {
            active = false;
          }

          const [collectionPDA] = await getCollectionPDA(candyMachineId);
          const collectionPDAAccount = await connection.getAccountInfo(
            collectionPDA,
          );

          setIsActive((cndy.state.isActive = active));
          setIsPresale((cndy.state.isPresale = presale));
          setCandyMachine(cndy);

          const txnEstimate =
            892 +
            (!!collectionPDAAccount && cndy.state.retainAuthority ? 182 : 0) +
            (cndy.state.tokenMint ? 66 : 0) +
            (cndy.state.whitelistMintSettings ? 34 : 0) +
            (cndy.state.whitelistMintSettings?.mode?.burnEveryTime ? 34 : 0) +
            (cndy.state.gatekeeper ? 33 : 0) +
            (cndy.state.gatekeeper?.expireOnUse ? 66 : 0);

          setNeedTxnSplit(txnEstimate > 1230);
        } catch (e) {
          if (e instanceof Error) {
            if (
              e.message === `Account does not exist ${candyMachineId}`
            ) {
              setAlertState({
                open: true,
                message: `Couldn't fetch candy machine state from candy machine with address: ${candyMachineId}, using rpc: ${rpcHost}! You probably typed the REACT_APP_CANDY_MACHINE_ID value in wrong in your .env file, or you are using the wrong RPC!`,
                severity: 'error',
                hideDuration: null,
              });
            } else if (
              e.message.startsWith('failed to get info about account')
            ) {
              setAlertState({
                open: true,
                message: `Couldn't fetch candy machine state with rpc: ${rpcHost}! This probably means you have an issue with the REACT_APP_SOLANA_RPC_HOST value in your .env file, or you are not using a custom RPC!`,
                severity: 'error',
                hideDuration: null,
              });
            }
          } else {
            setAlertState({
              open: true,
              message: `${e}`,
              severity: 'error',
              hideDuration: null,
            });
          }
        }
      } else {
        setAlertState({
          open: true,
          message: `Your REACT_APP_CANDY_MACHINE_ID value in the .env file doesn't look right! Make sure you enter it in as plain base-58 address!`,
          severity: 'error',
          hideDuration: null,
        });
      }
    },
    [anchorWallet, candyMachineId, rpcHost],
  );

  const onMint = async (
    beforeTransactions = [],
    afterTransactions = [],
  ) => {
    try {
      setIsUserMinting(true);
      document.getElementById('#identity')?.click();
      if (wallet.connected && candyMachine?.program && wallet.publicKey) {
        let setupMint;
        if (needTxnSplit && setupTxn === undefined) {
          setAlertState({
            open: true,
            message: 'Please sign account setup transaction',
            severity: 'info',
          });
          setupMint = await createAccountsForMint(
            candyMachine,
            wallet.publicKey,
          );
          let status = { err: true };
          if (setupMint.transaction) {
            status = await awaitTransactionSignatureConfirmation(
              setupMint.transaction,
              txTimeout,
              connection,
              true,
            );
          }
          if (status && !status.err) {
            setSetupTxn(setupMint);
            setAlertState({
              open: true,
              message:
                'Setup transaction succeeded! Please sign minting transaction',
              severity: 'info',
            });
          } else {
            setAlertState({
              open: true,
              message: 'Mint failed! Please try again!',
              severity: 'error',
            });
            setIsUserMinting(false);
            return;
          }
        } else {
          setAlertState({
            open: true,
            message: 'Please sign minting transaction',
            severity: 'info',
          });
        }

        let mintResult = await mintOneToken(
          candyMachine,
          wallet.publicKey,
          beforeTransactions,
          afterTransactions,
          setupMint ?? setupTxn,
        );

        let status = { err: true };
        let metadataStatus = null;
        if (mintResult) {
          status = await awaitTransactionSignatureConfirmation(
            mintResult.mintTxId,
            txTimeout,
            connection,
            true,
          );

          metadataStatus =
            await candyMachine.program.provider.connection.getAccountInfo(
              mintResult.metadataKey,
              'processed',
            );
        }

        if (status && !status.err && metadataStatus) {
          let remaining = itemsRemaining - 1;
          setItemsRemaining(remaining);
          setIsActive((candyMachine.state.isActive = remaining > 0));
          candyMachine.state.isSoldOut = remaining === 0;
          setSetupTxn(undefined);
          setAlertState({
            open: true,
            message: 'Congratulations! Mint succeeded!',
            severity: 'success',
            hideDuration: 7000,
          });
          refreshCandyMachineState('processed');
        } else if (status && !status.err) {
          setAlertState({
            open: true,
            message:
              'Mint likely failed! Anti-bot SOL 0.01 fee potentially charged! Check the explorer to confirm the mint failed and if so, make sure you are eligible to mint before trying again.',
            severity: 'error',
            hideDuration: 8000,
          });
          refreshCandyMachineState();
        } else {
          setAlertState({
            open: true,
            message: 'Mint failed! Please try again!',
            severity: 'error',
          });
          refreshCandyMachineState();
        }
      }
    } catch (error) {
      let message = error.msg || 'Minting failed! Please try again!';
      if (!error.msg) {
        if (!error.message) {
          message = 'Transaction timeout! Please try again.';
        } else if (error.message.indexOf('0x137')) {
          if (itemsRemaining > 0) {
            message = `Minting Success!`;
          } else {
            message = `SOLD OUT!`;
          }
        } else if (error.message.indexOf('0x135')) {
          message = `Insufficient funds to mint. Please fund your wallet.`;
        }
      } else {
        console.log(error.code, 'errcode2')
        if (error.code === 311) {
          message = `SOLD OUT!`;
          window.location.reload();
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`;
        }
      }
      if (message === 'Minting Success!') {
        setAlertState({
          open: true,
          message: 'Congratulations! Mint succeeded!',
          severity: 'success',
          hideDuration: 7000,
        });
      } else {
        setAlertState({
          open: true,
          message,
          severity: 'error',
        });
      }
      refreshCandyMachineState();
    } finally {
      setIsUserMinting(false);
    }
  };

  const toggleMintButton = () => {
    let active = !isActive || isPresale;

    if (active) {
      if (candyMachine.state.isWhitelistOnly && !isWhitelistUser) {
        active = false;
      }
      if (endDate && Date.now() >= endDate.getTime()) {
        active = false;
      }
    }

    if (
      isPresale &&
      candyMachine.state.goLiveDate &&
      candyMachine.state.goLiveDate.toNumber() <= new Date().getTime() / 1000
    ) {
      setIsPresale((candyMachine.state.isPresale = false));
    }

    setIsActive((candyMachine.state.isActive = active));
  };

  useEffect(() => {
    refreshCandyMachineState();
  }, [
    anchorWallet,
    candyMachineId,
    connection,
    refreshCandyMachineState,
  ]);

  useEffect(() => {
    (function loop() {
      setTimeout(() => {
        refreshCandyMachineState();
        loop();
      }, 20000);
    })();
  }, [refreshCandyMachineState]);

  // -------------

  useEffect(() => {
    refreshCandyMachineState();
  }, [
    anchorWallet,
    candyMachineId,
    connection,
    refreshCandyMachineState,
  ]);
  return (
    <Grid>
      <Toaster />
      <MintHeadSection mintHeadType={1} />
      {
        isMobile ?
          <>
            <Labheader component={'h2'} className="mobile-flex-justify-align mobile-padding-60-0-20-0 mobile-m0">Laboratory Gen0</Labheader>
            <MintContainer container className='mobile-width-100vw mobile-padding-0-5vw'>
              <GenSection item lg={6} md={12}>
                <Grid className='gen-form mobile-width-100res mobile-padding-30-20 mobile-height-auto'>
                  <Grid className='gen-section'>
                    <Grid className='gen-header mobile-ta-center'>Burn your Gen0 Lab to upgrade it to the next Gen1</Grid>
                    <Grid container className='gen-items mobile-width-100res mobile-height-auto mobile-space-gap'>
                      {gens.map((item, index) => {
                        if (index < 6) {
                          return (
                            <Grid item md={6} className='gen-item' key={index}>
                              <Grid className='gen-item-section'>
                                <img
                                  className='gen-img'
                                  alt='gen-img'
                                  src={item.img}
                                />
                              </Grid>
                            </Grid>
                          )
                        }
                      })}
                    </Grid>
                    <Grid className='gen-pagination'>
                      <Pagination
                        count={3}
                        variant="outlined"
                        hidePrevButton
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </GenSection>
              <MintSection item lg={6} md={12} className='mobile-width-90vw mobile-marginTop-50 mobile-flex-direction monile-align gap20'>
                <Grid className='nft-form mobile-width-100res mobile-flex-direction mobile-align mobile-height-auto'>
                  <img alt='nft' src='/nft-item.png' className='mobile-width-100res' />
                  <img alt='nft' src='/nft-bottom.png' className='mobile-width-120vw mobile-position-bottom' />
                  <Grid className="mobile-font-20">Mint Gen 1 (+25 000 $DNA)</Grid>
                  <Button className='mobile-width-100res mobile-marginTop-50 mobile-font-20'>Mint</Button>
                </Grid>
              </MintSection>
            </MintContainer>
          </>
          :
          <>
            <Labheader component={'h2'}>Laboratory Gen0</Labheader>
            <MintContainer container>
              <GenSection item lg={6} md={12}>
                <Grid className='gen-form'>
                  <Grid className='gen-section'>
                    <Grid className='gen-header'>Burn your Gen0 Lab to upgrade it to the next Gen1</Grid>
                    <Grid container className='gen-items'>
                      {gens.map((item, index) => {
                        return (
                          <Grid item md={4} className='gen-item' key={index}>
                            <Grid className='gen-item-section'>
                              <img
                                className='gen-img'
                                alt='gen-img'
                                src={item.img}
                              />
                            </Grid>
                          </Grid>
                        )
                      })}
                    </Grid>
                    <Grid className='gen-pagination'>
                      <Pagination
                        count={3}
                        variant="outlined"
                        hidePrevButton
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </GenSection>
              <MintSection item lg={6} md={12}>
                <Grid className='nft-form mobile-height-auto'>
                  <img alt='nft' className='nft-item' src='/nft-item.png' />
                  <img alt='nft' className='nft-shadow' src='/nft-shadow.png' />
                  <img alt='nft' className='nft-bottom' src='/nft-bottom.png' />
                </Grid>
                <Grid>Mint Gen 1 (+25 000 $DNA)</Grid>
                {!wallet.connected ? (
                  <ConnectButton>Connect Wallet</ConnectButton>
                ) : (
                  <MintContainer>
                    {candyMachine?.state.isActive &&
                      candyMachine?.state.gatekeeper &&
                      wallet.publicKey &&
                      wallet.signTransaction ?
                      (
                        <GatewayProvider
                          wallet={{
                            publicKey:
                              wallet.publicKey ||
                              new PublicKey(CANDY_MACHINE_PROGRAM),
                            //@ts-ignore
                            signTransaction: wallet.signTransaction,
                          }}
                          gatekeeperNetwork={
                            candyMachine?.state?.gatekeeper?.gatekeeperNetwork
                          }
                          clusterUrl={
                            network === WalletAdapterNetwork.Devnet
                              ? 'https://api.devnet.solana.com'
                              : rpcHost
                          }
                          handleTransaction={async (transaction) => {
                            setIsUserMinting(true);
                            const userMustSign = transaction.signatures.find(sig =>
                              sig.publicKey.equals(wallet.publicKey),
                            );
                            if (userMustSign) {
                              setAlertState({
                                open: true,
                                message: 'Please sign one-time Civic Pass issuance',
                                severity: 'info',
                              });
                              try {
                                transaction = await wallet.signTransaction(
                                  transaction,
                                );
                              } catch (e) {
                                setAlertState({
                                  open: true,
                                  message: 'User cancelled signing',
                                  severity: 'error',
                                });
                                setTimeout(() => window.location.reload(), 2000);
                                setIsUserMinting(false);
                                throw e;
                              }
                            } else {
                              setAlertState({
                                open: true,
                                message: 'Refreshing Civic Pass',
                                severity: 'info',
                              });
                            }
                            try {
                              await sendTransaction(
                                connection,
                                wallet,
                                transaction,
                                [],
                                true,
                                'confirmed',
                              );
                              setAlertState({
                                open: true,
                                message: 'Please sign minting',
                                severity: 'info',
                              });
                            } catch (e) {
                              setAlertState({
                                open: true,
                                message:
                                  'Solana dropped the transaction, please try again',
                                severity: 'warning',
                              });
                              console.error(e);
                              // setTimeout(() => window.location.reload(), 2000);
                              setIsUserMinting(false);
                              throw e;
                            }
                            await onMint();
                          }}
                          broadcastTransaction={false}
                          options={{ autoShowModal: false }}
                        >
                          <MintButton
                            candyMachine={candyMachine}
                            isMinting={isUserMinting}
                            setIsMinting={val => setIsUserMinting(val)}
                            onMint={onMint}
                            isActive={
                              isActive ||
                              (isPresale && isWhitelistUser && isValidBalance)
                            }
                          />
                        </GatewayProvider>
                      )
                      :
                      (
                        <MintButton
                          candyMachine={candyMachine}
                          isMinting={isUserMinting}
                          setIsMinting={val => setIsUserMinting(val)}
                          onMint={onMint}
                          isActive={
                            isActive ||
                            (isPresale && isWhitelistUser && isValidBalance)
                          }
                        />
                      )}
                  </MintContainer>
                )}
              </MintSection>
            </MintContainer>
          </>
      }
      <Snackbar
        open={alertState.open}
        autoHideDuration={
          alertState.hideDuration === undefined ? 6000 : alertState.hideDuration
        }
        onClose={() => {
          setAlertState({ ...alertState, open: false })
        }}
      >
        <Alert
          variant="filled"
          onClose={() => {
            setAlertState({ ...alertState, open: false })
          }}
          severity={`${alertState.severity}`}
        >
          {
            console.log(alertState, 'alertState')
          }
          {alertState.message}
        </Alert>
      </Snackbar>
    </Grid>
  )
}
