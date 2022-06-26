import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import DraculaBG from 'assets/images/bg.png';

const Container = styled(Grid)(({ theme }) => ({
    padding: '5% 10%', 
    background: `url(${DraculaBG})`,
    backgroundColor: 'rgba(6, 19, 52, 0.75)',
    height: 'auto',

    [theme.breakpoints.down('md')]: {
        padding: '5% 0%',
    },
    [theme.breakpoints.up('md')]: {
        padding: '5% 5%',
    },
    [theme.breakpoints.up('lg')]: {
        padding: '5% 8%',
    },
}));

export default Container;