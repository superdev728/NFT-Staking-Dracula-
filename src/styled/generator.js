import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

import {
    // background,
    // backgroundColor,
    borderStyle,
    borderWidth,
    borderImage,
} from 'utils/styles'

export const GeneratorMain = styled(Grid)(({ theme }) => ({
    marginTop: '90px',
    position: 'relative',
    display:'flex',
    flexWrap:'inherit',
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
        height: '100%',
        padding:'0px 30px',
    },
    '& .gen-selector': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        fontWeight: '700',
        fontSize: '20px',
        letterSpacing: '0.05em',
        '& button': {
            background: 'linear-gradient(69.77deg, rgba(223, 20, 154, 0.1) -5.25%, rgba(23, 193, 246, 0.1) 67.69%)',
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
        alignItems: 'end',
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

export const NFTsection = styled(Grid)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

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

export const Breeding = styled(Grid)(({ theme }) => ({
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection: 'column',
    flex:'1',
    '& .gen-staking-gif': {
        height: '167px',
        background: 'linear-gradient(143.3deg, rgba(223, 20, 154, 0.21) 0%, rgba(223, 20, 154, 0) 33.55%), linear-gradient(232.25deg, rgba(127, 66, 186, 0.52) 0%, rgba(127, 66, 186, 0) 24.42%), linear-gradient(315deg, rgba(32, 179, 240, 0.37) -1.53%, rgba(32, 179, 240, 0) 22.36%)',
        borderRadius: '10px',
    },
}));

export const MixSection = styled(Grid)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginTop: '75px',
    position:"relative",

    '& .main-section': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        zIndex: '1',
        gap:'20px',
        maxWidth:'500px',

        '& .nft-shadow-small': {
            position: 'absolute',
            left: '10px',
            top: '10px',
        },
    },
    '& .nft-bottom': {
        maxWidth:'650px',
        position: 'absolute',
        top: '30%',
        width: '100%',
    },
}));
