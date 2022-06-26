import React from 'react'
import {
    Button,
    Grid,
    Pagination,
} from '@mui/material'
import {
    NFTsection,
    Breeding,
    GeneratorMain,
    MixSection,
} from 'styled/generator'
import { GenSection } from 'styled/mint'
import { NFTitem } from 'components/NFTitem'
import MintHeadSection from 'components/MintHeadSection'
import { isMobile } from "react-device-detect"

const humans = [
    { name: "Gen1", img: "/emptygen.png", empty: true },
    { name: "Gen2", img: "/emptygen.png", empty: true },
    { name: "Gen3", img: "/emptygen.png", empty: true },
    { name: "Gen4", img: "/emptygen.png", empty: true },
    { name: "Gen5", img: "/emptygen.png", empty: true },
    { name: "Gen6", img: "/emptygen.png", empty: true },
]

export default function RiskyGame() {
    if (!isMobile) {
        return (
            <Grid>
                <MintHeadSection mintHeadType={2} />
                <GeneratorMain container>
                    <NFTsection item>
                        <Grid className='gen-header'>Humans</Grid>
                        <Grid className='gen-form'>
                            <Grid className='gen-section'>
                                <Grid container className='gen-items'>
                                    {humans.map((item, index) => {
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
                    </NFTsection>
                    <Breeding item>
                        <Grid className='gen-header'>DRACULA BREEDING</Grid>
                        <Grid className='gen-main-section'>
                            <MixSection>
                                <Grid className='main-section'>
                                    <NFTitem
                                        width="100%"
                                        height="100%"
                                    />
                                    <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.632 25.528C12.504 25.528 12.36 25.448 12.2 25.288C12.072 25.128 12.008 24.952 12.008 24.76V15.016C12.008 14.632 11.816 14.44 11.432 14.44H1.4C1.176 14.44 0.984 14.376 0.824 14.248C0.696 14.12 0.632 13.992 0.632 13.864C0.632 13.608 0.664 13.304 0.728 12.952C0.824 12.6 0.968 12.28 1.16 11.992C1.384 11.704 1.656 11.56 1.976 11.56H11.384C11.672 11.56 11.848 11.512 11.912 11.416C11.976 11.288 12.008 11.128 12.008 10.936V2.296C12.008 1.976 12.136 1.704 12.392 1.48C12.68 1.224 13 1.032 13.352 0.903998C13.736 0.743999 14.04 0.663999 14.264 0.663999C14.488 0.663999 14.664 0.775999 14.792 1C14.92 1.192 14.984 1.432 14.984 1.72V10.936C14.984 11.352 15.16 11.56 15.512 11.56H25.304C25.592 11.56 25.832 11.624 26.024 11.752C26.248 11.848 26.36 12.024 26.36 12.28C26.36 12.696 26.2 13.16 25.88 13.672C25.56 14.184 25.176 14.44 24.728 14.44H15.56C15.176 14.44 14.984 14.632 14.984 15.016V24.184C14.984 24.504 14.824 24.776 14.504 25C14.216 25.192 13.88 25.32 13.496 25.384C13.144 25.48 12.856 25.528 12.632 25.528Z" fill="white" />
                                    </svg>
                                    <NFTitem
                                        width="100%"
                                        height="100%"
                                    />
                                </Grid>
                                <img alt='nft' className='nft-bottom' src='/bottom.png' />
                            </MixSection>
                            <Grid className='gen-selector'>
                                1 Human + 1 Vampire
                                <Button>Selector</Button>
                            </Grid>
                            <Grid className='gen-bottom'>
                                <Button>Generate Werewolf or Hunter</Button>
                            </Grid>
                        </Grid>
                    </Breeding>
                    <NFTsection item>
                        <Grid className='gen-header'>Vampire</Grid>
                        <Grid className='gen-form'>
                            <Grid className='gen-section'>
                                <Grid container className='gen-items'>
                                    {humans.map((item, index) => {
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
                    </NFTsection>
                </GeneratorMain>
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
                    <NFTsection item>
                        <Grid className='gen-header'>Vampire</Grid>
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
                        <Grid className='gen-header'>DRACULA BREEDING</Grid>
                        <Grid className='gen-main-section gap40 mobile-p0'>
                            <MixSection className='mobile-m0'>
                                <Grid className='main-section mobile-width-100res'>
                                    <NFTitem
                                        width="100%"
                                        height="100%"
                                    />
                                    <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.632 25.528C12.504 25.528 12.36 25.448 12.2 25.288C12.072 25.128 12.008 24.952 12.008 24.76V15.016C12.008 14.632 11.816 14.44 11.432 14.44H1.4C1.176 14.44 0.984 14.376 0.824 14.248C0.696 14.12 0.632 13.992 0.632 13.864C0.632 13.608 0.664 13.304 0.728 12.952C0.824 12.6 0.968 12.28 1.16 11.992C1.384 11.704 1.656 11.56 1.976 11.56H11.384C11.672 11.56 11.848 11.512 11.912 11.416C11.976 11.288 12.008 11.128 12.008 10.936V2.296C12.008 1.976 12.136 1.704 12.392 1.48C12.68 1.224 13 1.032 13.352 0.903998C13.736 0.743999 14.04 0.663999 14.264 0.663999C14.488 0.663999 14.664 0.775999 14.792 1C14.92 1.192 14.984 1.432 14.984 1.72V10.936C14.984 11.352 15.16 11.56 15.512 11.56H25.304C25.592 11.56 25.832 11.624 26.024 11.752C26.248 11.848 26.36 12.024 26.36 12.28C26.36 12.696 26.2 13.16 25.88 13.672C25.56 14.184 25.176 14.44 24.728 14.44H15.56C15.176 14.44 14.984 14.632 14.984 15.016V24.184C14.984 24.504 14.824 24.776 14.504 25C14.216 25.192 13.88 25.32 13.496 25.384C13.144 25.48 12.856 25.528 12.632 25.528Z" fill="white" />
                                    </svg>
                                    <NFTitem
                                        width="100%"
                                        height="100%"
                                    />
                                </Grid>
                                <img alt='nft' className='nft-bottom mobile-width-120vw' src='/bottom.png' />
                            </MixSection>
                            <Grid className='gen-selector mobile-mt-20vw'>
                                1 Human + 1 Vampire
                                <Button>Selector</Button>
                            </Grid>
                            <Grid className='gen-bottom'>
                                <Button>Generate Werewolf or Hunter</Button>
                            </Grid>
                        </Grid>
                    </Breeding>
                </GeneratorMain>
            </Grid>
        )
    }
}
