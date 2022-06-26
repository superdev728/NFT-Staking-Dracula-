import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';

import {
    // background,
    // backgroundColor,
    borderStyle,
    borderWidth,
    borderImage,
} from 'utils/styles'

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

export const WoolContainer = styled(Grid)(({ theme }) => ({
    '& .gen-header': {
        fontFamily: 'EB Garamond',
        fontWeight: '700',
        fontSize: '22px',
        lineHeight: '140%',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        marginBottom: '24px',
    },
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
    marginTop: '60px',
}));

export const WoolGenSection = styled(Grid)(({ theme }) => ({
    // display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',   

    [theme.breakpoints.up('md')]: {
        paddingLeft: '0%',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '100px',
    },


    '& .gen-form': {
        width: '540px',
        height: '594px',
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

export const WoolSection = styled(Grid)(({ theme }) => ({
    justifyContent: 'space-between',

    [theme.breakpoints.up('md')]: {
        marginBottom: '100px',
    },

    display: 'flex',
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
    '& .generate-btn': {
        fontSize: '18px',
    },
    '& .middle-section': {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '20px',
        lineHeight: '28px',
        letterSpacing: '0.05em',
        '& div:nth-of-type(1)': {
            marginRight: '50px'
        },
        '& div:nth-of-type(2)': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'column',
        },
        '& .select-blood': {
            background: 'linear-gradient(69.77deg, rgba(223, 20, 154, 0.1) -5.25%, rgba(23, 193, 246, 0.1) 67.69%)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            height: '42px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '8px 16px',
            borderRadius: '100px',
            cursor: 'url(/mouse.png), pointer'
        },
    },
}));

export const NFTItems = styled(Grid)(({ theme }) => ({
    position: 'relative',
    height: '250px',
    width: '100%',

    '& .items:nth-of-type(1)': {
        position: 'absolute',
        zIndex: 2,
        transform: 'translate(-50%, -50%)',
        left: '50%',
        top: '30%',
    },
    '& .items:nth-of-type(2)': {
        position: 'absolute',
        zIndex: 1,
        left: '10%',
        top: '10%',
    },
    '& .items:nth-of-type(3)': {
        position: 'absolute',
        zIndex: 1,
        right: '10%',
        top: '10%',
    },
    '& .items:nth-of-type(4)': {
        position: 'absolute',
        left: '25%',
        bottom: '78%',
    },
    '& .items:nth-of-type(5)': {
        position: 'absolute',
        right: '25%',
        bottom: '78%',
    },

    '& .bottom': {
        width: '100%'
    },

    '& .arrow-btn': {
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        left: '50%',
        top: '80%',
        '& svg': {
            cursor: 'pointer',
        },
        '& svg:first-of-type': {
            marginRight: '20px',
        },
    },
}));