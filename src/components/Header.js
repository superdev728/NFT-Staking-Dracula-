import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {
  ResponsiveHeader,
  HeaderPgGrp,
} from "styled/header";
import { MobileView, BrowserView } from 'react-device-detect'
import DraculaLogo from "assets/images/draculaLogo.png"
import { MenuIcon, CloseIcon } from "./icon"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@material-ui/core';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const MyButton = styled(Button)({
  fontSize: 18,
  padding: '0px 0px',
  width: '100%',
  justifyContent: 'left !important'
})

export default function Header() {

  const navigate = useNavigate()
  const pages = [
    { label: "migrate", router: "/app/migrate" },
    { label: "risky game", router: "/app/risky-game" },
    { label: "wool pouches", router: "/app/wool-pouches" },
    { label: "land", router: "/app/land" },
    { label: "alpha game", router: "/app/alpha-game" },
    { label: "whitepaper", router: "/app/whitepaper" },
  ]

  const handlePgClick = (router) => {
    document.getElementsByTagName('body')[0].className = 'scroll-overlay';
    navigate(router);
    setExpanded(!expanded);
  }


  const [expanded, setExpanded] = useState(false);

  const handleChange = () => {
    if(expanded){
      document.getElementsByTagName('body')[0].className = 'scroll-overlay';
      setExpanded(!expanded);
    }else{
      document.getElementsByTagName('body')[0].className = 'scroll-hidden';
      setExpanded(!expanded);
    }
  };

  return (
    <>
      <BrowserView>
        <ResponsiveHeader>
          <img alt="Dracula Logo" src={DraculaLogo} />
          <HeaderPgGrp>
            {pages.map((page, index) => {
              return (
                <span
                  key={index}
                  onClick={() => handlePgClick(page.router)}
                >
                  {page.label}
                </span>
              )
            })}
          </HeaderPgGrp>
        </ResponsiveHeader >
      </BrowserView>
      <MobileView>
        <Accordion className="mobile-menu-drawer" expanded={expanded}>
          <AccordionSummary className="mobile-menu-drawer-ch" aria-controls="panel1d-content" id="panel1d-header">
            <ResponsiveHeader className='mobile-header'>
              <img alt="Dracula Logo" src={DraculaLogo} className="mobile-pl" />
              {
                expanded ?
                  <Button onClick={handleChange} variant='text' style={{paddingRight:'15px'}}>
                    <CloseIcon />
                  </Button>
                  :
                  <Button onClick={handleChange} variant='text' style={{paddingRight:'15px'}}>
                    <MenuIcon />
                  </Button>
              }
            </ResponsiveHeader>
          </AccordionSummary>
          <AccordionDetails className='mobile-menu-list'>
            <Box sx={{ width: '100%' }}>
              <nav aria-label="main mailbox folders">
                <List>
                  {pages.map((page, index) => {
                    return (
                      <div style={{ display: 'grid', padding: '0px 10px' }}>
                        <ListItem disablePadding
                          key={index}
                          onClick={() => handlePgClick(page.router)}
                          style={{ padding: '10px 0px' }}
                        >
                          <MyButton variant="text">
                            {page.label}
                          </MyButton>
                        </ListItem>
                        <div style={{ background: "linear-gradient(90deg, rgba(23, 193, 246, 0.6) 0%, rgba(223, 20, 154, 0.36) 99.13%)", height: '2px', width: '100%', borderRadius: '1px' }}></div>
                      </div>
                    )
                  })}
                </List>
              </nav>
            </Box>
          </AccordionDetails>
        </Accordion>
      </MobileView>
    </>
  )
}