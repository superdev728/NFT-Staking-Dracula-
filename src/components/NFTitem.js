import React from 'react'

import { SimpleNFTitem } from 'styled/components'

import EmptyImg from 'assets/images/emptygen.png'
import QuestionMark from 'assets/images/questionMark.png'
import Shadow from 'assets/images/shadow.png'

export const NFTitem = ({
    width,
    height,
    imgUrl
}) => {
    return (
        <SimpleNFTitem
            className={'items'}
            style={{
                width,
                height,
            }}
        >
            {imgUrl ?
                <img
                    style={{
                        width,
                        height,
                    }}
                    className={'main-img'}
                    alt='nft item'
                    src={imgUrl}
                /> :
                <img
                    style={{
                        width,
                        height,
                    }}
                    className={'main-img'}
                    alt='nft item'
                    src={EmptyImg}
                />
            }
            <img
                style={{
                    width: width / 3,
                    height: height / 3,
                }}
                className='question-mark'
                alt='question mark'
                src={QuestionMark}
            />
            <img
                style={{
                    width: width / 2,
                    height: height / 3,
                    bottom: '14px',
                    right: - (width / 2) / 3
                }}
                className='shadow'
                alt='question mark'
                src={Shadow}
            />
        </SimpleNFTitem>
    )
}
