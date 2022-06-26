import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

export const ResponsiveHeader = styled(Grid)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    height: "100px",
    background: "#12101D",

    [theme.breakpoints.down('md')]: {
        // backgroundColor: 'red',
    },
    [theme.breakpoints.up('md')]: {
        // backgroundColor: 'blue',
        padding: "24px 8%",
        '& div span': {
            fontSize: '14px',
        }
    },
    [theme.breakpoints.up('lg')]: {
        // backgroundColor: 'green',
        padding:"24px 8%",
    },

}));

export const HeaderPgGrp = styled(Grid)`

    display: flex;

    span:nth-of-type(1) {
        margin-left: 0px;
    }

    span {
        height: 23px;
        font-family: 'EB Garamond';
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 23px;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        margin-left: 20px;
        color: #FFFFFF;
        flex: none;
        order: 5;
        flex-grow: 0;
        cursor: pointer;
        &:hover {
            color: #17c1f6;
        }
    }
`;