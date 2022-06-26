import { Button, Grid } from '@mui/material'
import React from 'react'
import Pagination from '@mui/material/Pagination';
import {
    WoolContainer,
    WoolGenSection,
    WoolSection,
    NFTItems,
} from 'styled/woolpouche'
import {
    NFTsection,
    Breeding,
    GeneratorMain,
    MixSection,
} from 'styled/generator'
import { NFTitem } from 'components/NFTitem';
import MintHeadSection from 'components/MintHeadSection';
import { isMobile } from "react-device-detect";
import { GenSection } from 'styled/mint'
import CustomSelect from '../../components/Customselect.js'

const humans = [
    { name: "Gen0", img: "/emptygen.png", empty: false },
    { name: "Gen1", img: "/emptygen.png", empty: true },
    { name: "Gen2", img: "/emptygen.png", empty: true },
    { name: "Gen3", img: "/emptygen.png", empty: true },
    { name: "Gen4", img: "/emptygen.png", empty: true },
    { name: "Gen5", img: "/emptygen.png", empty: true },
    { name: "Gen6", img: "/emptygen.png", empty: true },
    { name: "Gen7", img: "/emptygen.png", empty: true },
    { name: "Gen8", img: "/emptygen.png", empty: true },
]

const defaultSelectText = "Please select an option";

const countryList = [
    { id: 1, name: "250,000 $Blood" },
    { id: 2, name: "5 humans" },
    { id: 3, name: "1human and 1vampire" },
]

export default function WoolPouches() {
    if (!isMobile) {
        return (
            <Grid>
                <MintHeadSection mintHeadType={2} />
                <WoolContainer container className='desktop-flex-start'>
                    <WoolGenSection item lg={6} md={12} className="desktop-mb-0">
                        <Grid className='gen-header'>Humans</Grid>
                        <Grid className='gen-form'>
                            <Grid className='gen-section'>
                                <Grid container className='gen-items'>
                                    {humans.map((item, index) => {
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
                    </WoolGenSection>
                    <WoolSection item lg={6} md={12} className='desktop-justify-start desktop-mb-0'>
                        <Grid className='gen-header'>HUMANS Breeding</Grid>
                        <NFTItems className='desktop-mt-10vh'>
                            <NFTitem
                                width={200}
                                height={200}
                            />
                            {[0, 1, 2, 3].map((item) => {
                                return (
                                    <NFTitem
                                        key={item}
                                        width={120}
                                        height={120}
                                    />
                                )
                            })}
                            <Grid className='arrow-btn'>
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="32" y="32" width="32" height="32" rx="16" transform="rotate(-180 32 32)" fill="#17C1F6" fillOpacity="0.1" />
                                    <path d="M19.25 22.5L12.75 16L19.25 9.5" stroke="white" strokeLinecap="round" />
                                    <rect x="31.5" y="31.5" width="31" height="31" rx="15.5" transform="rotate(-180 31.5 31.5)" stroke="white" strokeOpacity="0.2" />
                                </svg>

                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="32" height="32" rx="16" fill="#17C1F6" fillOpacity="0.1" />
                                    <path d="M12.75 9.5L19.25 16L12.75 22.5" stroke="white" strokeLinecap="round" />
                                    <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="white" strokeOpacity="0.2" />
                                </svg>
                            </Grid>
                            <img className='bottom' alt='bottom img' src='/nft-bottom.png' />
                        </NFTItems>
                        <Grid className='middle-section desktop-mt-5vh'>
                            <div>5 Humans</div>
                            <div>
                                <span>Kind of breeding</span>
                                <CustomSelect
                                    defaultText={defaultSelectText}
                                    optionsList={countryList}
                                />
                            </div>
                        </Grid>
                        <Button className='desktop-mt-10vh generate-btn'>
                            Generate Werewolf or Hunter
                        </Button>
                    </WoolSection>
                </WoolContainer>
            </Grid>
        )
    } else {
        return (
            <Grid>
                <MintHeadSection mintHeadType={2} />
                <GeneratorMain container className='mobile-flex-direction monile-align gap40 mobile-padding-60-5vw mobile-m0'>
                    <NFTsection item>
                        <Grid className='gen-header'>Humans</Grid>
                        <GenSection item lg={6} md={12}>
                            <Grid className='gen-form mobile-width-100res mobile-padding-30-20 mobile-height-auto'>
                                <Grid className='gen-section'>
                                    <Grid container className='gen-items mobile-width-100res mobile-height-auto mobile-space-gap'>
                                        {humans.map((item, index) => {
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
                    </NFTsection>
                    <Breeding item>
                        <Grid className='gen-header'>HUMANS BREEDING</Grid>
                        <Grid className='gen-main-section mobile-p0 mobile-po-re'>
                            <MixSection className='mobile-m0'>
                                <Grid className='main-section mobile-width-100res'>
                                    <NFTitem
                                        width="100%"
                                        height="100%"
                                    />
                                </Grid>
                                <Grid className='arrow-btn mobile-30-30-flex'>
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="32" y="32" width="32" height="32" rx="16" transform="rotate(-180 32 32)" fill="#17C1F6" fillOpacity="0.1" />
                                        <path d="M19.25 22.5L12.75 16L19.25 9.5" stroke="white" strokeLinecap="round" />
                                        <rect x="31.5" y="31.5" width="31" height="31" rx="15.5" transform="rotate(-180 31.5 31.5)" stroke="white" strokeOpacity="0.2" />
                                    </svg>

                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="32" height="32" rx="16" fill="#17C1F6" fillOpacity="0.1" />
                                        <path d="M12.75 9.5L19.25 16L12.75 22.5" stroke="white" strokeLinecap="round" />
                                        <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="white" strokeOpacity="0.2" />
                                    </svg>
                                </Grid>
                                <img className='bottom mobile-po-ab-top35vh' alt='bottom img' src='/nft-bottom.png' />
                            </MixSection>
                            <Grid className='middle-section mobile-mt-10vh mobile-flex mobile-font-20'>
                                <div className='mobile-flex1'>5 Humans</div>
                                <div className='mobile-flex-direction-gap10-align-justify'>
                                    <span>Kind of breeding</span>
                                    <CustomSelect
                                        defaultText={defaultSelectText}
                                        optionsList={countryList}
                                    />
                                </div>
                            </Grid>
                            <Grid className='gen-bottom mobile-mt-5vh'>
                                <Button>Generate Werewolf or Hunter</Button>
                            </Grid>
                        </Grid>
                    </Breeding>
                </GeneratorMain>
            </Grid>
        )
    }
}
