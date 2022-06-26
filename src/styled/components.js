import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

export const SimpleNFTitem = styled(Grid)(({ theme }) => ({
    display: 'inline-block',
    position: 'relative',
    borderRadius: '8px',
    '& .main-img': {
        background: '#12101D',
        zIndex: 1,
        borderRadius: '8px',
    },

    '& .question-mark': {
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        left: '50%',
        top: '50%',
        borderRadius: '50%',
    },

    '& .shadow': {
        position: 'absolute',
    },
}));