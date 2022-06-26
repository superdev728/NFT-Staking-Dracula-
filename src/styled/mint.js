import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import Button from '@material-ui/core/Button';
import { CandyMachineAccount } from './candy-machine';
import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState, useRef } from 'react';
import { GatewayStatus, useGateway } from '@civic/solana-gateway-react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { findGatewayToken, getGatewayTokenAddressForOwnerAndGatekeeperNetwork, onGatewayTokenChange, removeAccountChangeListener, } from '@identity.com/solana-gateway-ts';

import {
    // background,
    // backgroundColor,
    borderStyle,
    borderWidth,
    borderImage,
} from 'utils/styles'

export const MintHead = styled(Grid)(() => ({
    '& .wallet-section': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: '8px',
        '& .your-wallet': {
            display: 'flex',
            alignItems: 'center',
            height: '32px',
            fontWeight: '500',
            fontSize: '14px',
            textAlign: 'center',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginRight: '8px',
            '& svg': {
                marginRight: '8px',
            }
        },
    },
    '& .cache-section': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: '8px',
        '& .token-text': {
            fontWeight: '500',
            fontSize: '14px',
            textAlign: 'center',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginLeft: '10px',
            marginRight: '16px',
        },
        '& .token-amount': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 30px',
            height: '58px',
            background: 'linear-gradient(69.77deg, rgba(223, 20, 154, 0.1) -5.25%, rgba(23, 193, 246, 0.1) 67.69%)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50px',
            fontSize: '24px',
        }
    },
    '& .cache-section-content': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '8px',
        '& .token-text': {
            fontWeight: '500',
            fontSize: '14px',
            textAlign: 'center',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginLeft: '10px',
            marginRight: '16px',
        },
        '& .token-amount': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 30px',
            height: '58px',
            background: 'linear-gradient(69.77deg, rgba(223, 20, 154, 0.1) -5.25%, rgba(23, 193, 246, 0.1) 67.69%)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50px',
            fontSize: '24px',
        }
    }
}));

export const Labheader = styled(Grid)(({ theme }) => ({
    fontWeight: '700',
    fontSize: '22px',
    lineHeight: '140%',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    marginTop: '75px',
    marginBottom: '24px',

    [theme.breakpoints.down('md')]: {
        paddingLeft: 'calc(0% + 45px)',
    },
    [theme.breakpoints.up('md')]: {
        paddingLeft: 'calc(0% + 45px)',
    },
    [theme.breakpoints.up('lg')]: {
        paddingLeft: 'calc(0% + 45px)',
    },
    [theme.breakpoints.up('xl')]: {
        paddingLeft: 'calc(10%)',
    },
}))

export const MintContainer = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        padding: '0 0%',
    },
    [theme.breakpoints.up('md')]: {
        padding: '0 0%',
    },
    [theme.breakpoints.up('lg')]: {
        padding: '0 0%',
    },
    [theme.breakpoints.up('xl')]: {
        padding: '0 5%',
    },
    display: 'flex',
    justifyContent: 'space-between',
}));

export const GenSection = styled(Grid)(({ theme }) => ({

    [theme.breakpoints.up('md')]: {
        paddingLeft: '0%',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '100px',
    },
    '& .gen-form': {
        width: '540px',
        height: '650px',
        background: 'linear-gradient(143.3deg, rgba(223, 20, 154, 0.21) 0%, rgba(223, 20, 154, 0) 33.55%), linear-gradient(232.25deg, rgba(127, 66, 186, 0.56) 0%, rgba(127, 66, 186, 0) 24.42%), linear-gradient(315deg, rgba(32, 179, 240, 0.37) -1.53%, rgba(32, 179, 240, 0) 22.36%)',
        backgroundColor: '#12101d',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        borderStyle,
        borderWidth,
        borderImage,
        padding: '50px',
        '& .gen-section': {
            '& .gen-header': {
                fontSize: '1.3rem',
                marginBottom: '28px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            },
            '& .gen-items': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '444px',
                height: '444px',
                '& .gen-item': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            },
            '& .gen-pagination': {
                marginTop: '24px',
                '& nav ul li button, & nav ul li button path': {
                    color: 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                },
                '[aria-current="true"]': {
                    color: '#FFFFFF',
                    background: 'rgba(23, 193, 246, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                },
            }
        },
    },
}));

export const MintSection = styled(Grid)(({ theme }) => ({

    [theme.breakpoints.up('md')]: {
        marginBottom: '100px',
    },

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    '& .nft-form': {
        width: '500px',
        height: '460px',
        position: 'relative',
        '& .nft-item': {
            width: '394px',
            height: '394px',
            position: 'absolute',
            left: '53px',
            top: '0px',
            zIndex: 1,
        },
        '& .nft-shadow': {
            position: 'absolute',
            right: '-76px',
            bottom: '18px',
        },
        '& .nft-bottom': {
            position: 'absolute',
            bottom: '0',
        },
    },
    '& button': {
        fontFamily: 'EB Garamond',
        color: '#FFFFFF',
        fontSize: '24px',
        fontWeight: '700',
        letterSpacing: '0.04em',
        width: '394px',
        height: '58px',
        background: 'linear-gradient(94.49deg, #DF149A -57.23%, #4F58C9 34.64%, #17C1F6 95.14%)',
        borderRadius: '100px',
    },
}));

export const CTAButton = styled(Button)`
  width: 100%;
  height: 60px;
  margin-top: 10px;
  margin-bottom: 5px;
  background: linear-gradient(180deg, #604ae5 0%, #813eee 100%);
  color: white;
  font-size: 16px;
  font-weight: bold;
`; // add your own styles here
export const MintButton = ({ onMint, candyMachine, isMinting, setIsMinting, isActive, }) => {
    const wallet = useWallet();
    const connection = useConnection();
    const [verified, setVerified] = useState(false);
    const { requestGatewayToken, gatewayStatus } = useGateway();
    const [webSocketSubscriptionId, setWebSocketSubscriptionId] = useState(-1);
    const [clicked, setClicked] = useState(false);
    const getMintButtonContent = () => {
        if (candyMachine === null || candyMachine === void 0 ? void 0 : candyMachine.state.isSoldOut) {
            return 'SOLD OUT';
        }
        else if (isMinting) {
            return React.createElement(CircularProgress, null);
        }
        else if ((candyMachine === null || candyMachine === void 0 ? void 0 : candyMachine.state.isPresale) ||
            (candyMachine === null || candyMachine === void 0 ? void 0 : candyMachine.state.isWhitelistOnly)) {
            return 'WHITELIST MINT';
        }
        return 'MINT';
    };
    useEffect(() => {
        const mint = async () => {
            await removeAccountChangeListener(connection.connection, webSocketSubscriptionId);
            await onMint();
            setClicked(false);
            setVerified(false);
        };
        if (verified && clicked) {
            mint();
        }
    }, [
        verified,
        clicked,
        connection.connection,
        onMint,
        webSocketSubscriptionId,
    ]);
    const previousGatewayStatus = usePrevious(gatewayStatus);
    useEffect(() => {
        const fromStates = [
            GatewayStatus.NOT_REQUESTED,
            GatewayStatus.REFRESH_TOKEN_REQUIRED,
        ];
        const invalidToStates = [...fromStates, GatewayStatus.UNKNOWN];
        if (fromStates.find(state => previousGatewayStatus === state) &&
            !invalidToStates.find(state => gatewayStatus === state)) {
            setIsMinting(true);
        }
        console.log('change: ', gatewayStatus);
    }, [setIsMinting, previousGatewayStatus, gatewayStatus]);
    return (React.createElement(CTAButton,
        {
            disabled: isMinting || !isActive, onClick: async () => {
                if ((candyMachine === null || candyMachine === void 0 ? void 0 : candyMachine.state.isActive) && (candyMachine === null || candyMachine === void 0 ? void 0 : candyMachine.state.gatekeeper)) {
                    const network = candyMachine.state.gatekeeper.gatekeeperNetwork.toBase58();
                    if (network === 'ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6') {
                        if (gatewayStatus === GatewayStatus.ACTIVE) {
                            await onMint();
                        }
                        else {
                            // setIsMinting(true);
                            await requestGatewayToken();
                            console.log('after: ', gatewayStatus);
                        }
                    }
                    else if (network === 'ttib7tuX8PTWPqFsmUFQTj78MbRhUmqxidJRDv4hRRE' ||
                        network === 'tibePmPaoTgrs929rWpu755EXaxC7M3SthVCf6GzjZt') {
                        setClicked(true);
                        const gatewayToken = await findGatewayToken(connection.connection, wallet.publicKey, candyMachine.state.gatekeeper.gatekeeperNetwork);
                        if (gatewayToken === null || gatewayToken === void 0 ? void 0 : gatewayToken.isValid()) {
                            await onMint();
                        }
                        else {
                            window.open(`https://verify.encore.fans/?gkNetwork=${network}`, '_blank');
                            const gatewayTokenAddress = await getGatewayTokenAddressForOwnerAndGatekeeperNetwork(wallet.publicKey, candyMachine.state.gatekeeper.gatekeeperNetwork);
                            setWebSocketSubscriptionId(onGatewayTokenChange(connection.connection, gatewayTokenAddress, () => setVerified(true), 'confirmed'));
                        }
                    }
                    else {
                        setClicked(false);
                        throw new Error(`Unknown Gatekeeper Network: ${network}`);
                    }
                }
                else {
                    await onMint();
                    setClicked(false);
                }
            }, variant: "contained"
        }, getMintButtonContent()));
};
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}
