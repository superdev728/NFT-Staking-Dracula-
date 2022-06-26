import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

import {
    background,
    backgroundColor,
    borderStyle,
    borderWidth,
    borderImage,
} from 'utils/styles'

export const LandGeneratorMain = styled(Grid)(({ theme }) => ({
    marginTop: '90px',
    position: 'relative',
    '& .gen-header': {
        fontWeight: '700',
        fontSize: '22px',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        marginBottom: '24px',
        textAlign: 'center',
    },
    '& .gen-main-section': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        flexDirection: 'column',
        height: '75%',
    },
    '& .gen-selector': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        fontWeight: '700',
        fontSize: '20px',
        letterSpacing: '0.05em',
        '& button': {
            background,
            border: '1px solid #FFFFFF',
            borderRadius: '100px',
            color: '#FFFFFF',
            fontFamily: 'EB Garamond',
            fontSize: '16px !important',
            padding: '8px 16px'
        },
    },
    '& .gen-bottom': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& button': {
            width: '394px',
            height: '58px',
            background: 'linear-gradient(94.49deg, #DF149A -57.23%, #4F58C9 34.64%, #17C1F6 95.14%)',
            borderRadius: '100px',
            letterSpacing: '0.04em',
            fontFamily: 'EB Garamond',
            fontWeight: '700',
            color: '#FFFFFF',
        },
    },
}));

export const LandNFTsection = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',

    '&.wolf-section-wolf': {
        justifyContent: 'flex-start',
        alignItems: 'start',
    },

    '&.wolf-section-lab': {
        justifyContent: 'flex-end',
        alignItems: 'end',
    },

    '& .gen-header-wolf': {
        width: '100%',
        fontSize: '22px',
        fontWeight: '700',
        marginBottom: '28px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        textTransform: 'uppercase',
    },
    '& .gen-header-lab': {
        width: '100%',
        fontSize: '22px',
        fontWeight: '700',
        marginBottom: '28px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase',
    },
    '& .gen-form': {
        width: '384px',
        height: '596px',
        background: 'linear-gradient(143.3deg, rgba(223, 20, 154, 0.21) 0%, rgba(223, 20, 154, 0) 33.55%), linear-gradient(232.25deg, rgba(127, 66, 186, 0.56) 0%, rgba(127, 66, 186, 0) 24.42%), linear-gradient(315deg, rgba(32, 179, 240, 0.37) -1.53%, rgba(32, 179, 240, 0) 22.36%)',
        backgroundColor: '#12101d',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '50px',
        borderStyle,
        borderWidth,
        borderImage,
        '& .gen-section': {
            '& .gen-items': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '288px',
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

export const LandBreeding = styled(Grid)(({ theme }) => ({
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection: 'column',
    '& .gen-staking-gif': {
        height: '167px',
        background: 'linear-gradient(143.3deg, rgba(223, 20, 154, 0.21) 0%, rgba(223, 20, 154, 0) 33.55%), linear-gradient(232.25deg, rgba(127, 66, 186, 0.52) 0%, rgba(127, 66, 186, 0) 24.42%), linear-gradient(315deg, rgba(32, 179, 240, 0.37) -1.53%, rgba(32, 179, 240, 0) 22.36%)',
        backgroundColor,
        borderStyle,
        borderWidth,
        borderImage,
        borderRadius: '10px',
    },
}));

export const LandMixSection = styled(Grid)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginTop: '75px',

    '& .main-section': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        zIndex: '1',

        '& .nft-shadow-small': {
            position: 'absolute',
            left: '10px',
            top: '10px',
        },
    },
    '& .nft-bottom': {
        position: 'absolute',
        bottom: '10%',
        width: '600px',
    },
}));

export const LandBottom = styled(Grid)(({ theme }) => ({
    marginTop: '100px',
    background: 'linear-gradient(143.3deg, rgba(223, 20, 154, 0.21) 0%, rgba(223, 20, 154, 0) 33.55%), linear-gradient(232.25deg, rgba(127, 66, 186, 0.52) 0%, rgba(127, 66, 186, 0) 24.42%), linear-gradient(315deg, rgba(32, 179, 240, 0.37) -1.53%, rgba(32, 179, 240, 0) 22.36%)',
    backgroundColor,
    padding: '40px',
    height: '294px',
    display: 'flex',
    borderRadius: '10px',
    alignItems: 'center',
    borderStyle,
    borderWidth,
    borderImage,
    '& .land-bottom': {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
}));

export const StakingTypes = styled(Grid)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    '& .land-stake': {
        display: 'flex',
        justifyContent: 'space-around',
        width: '1527px',
        padding: '16px',
    },

    '& .land-stake-item': {
        width: '250px',
        height: '126px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        background,
        backgroundColor: '#12101D',
        borderStyle,
        borderWidth,
        borderImage,
        borderRadius: '4px',
        position: 'relative',

        '& svg': {
            background: 'linear-gradient(103deg, #17C2F6 -13.45%, #DF1499 111.68%)',
            borderRadius: '0px 0px 5.22917px 5.22917px',
            position: 'absolute',
            width: '60px',
            transform: 'translate(-50%, -50%)',
            top: '15px',
            left: '50%',
        },
        '& img': {
            width: '100px',
            height: '100px',
        },
    },
}));

export const StakeBottom = styled(Grid)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',

    '& button': {
        background: 'linear-gradient(94.49deg, #DF149A -57.23%, #4F58C9 34.64%, #17C1F6 95.14%)',
        borderRadius: '100px',
        width: '260px',
        height: '58px',
        color: '#FFFFFF',
        fontSize: '24px',
        letterSpacing: '0.02em',
        fontWeight: '700',
        fontFamily: 'EB Garamond',
        textTransform: 'capitalize',
    },
}));