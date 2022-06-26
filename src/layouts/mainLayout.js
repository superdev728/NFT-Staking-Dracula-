import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from 'components/Header'

// Import Components
import Container from 'components/Container'

export const MainLayout = () => {
    return (
        <>
            <Header />
            <Container>
                <Outlet /> 
            </Container>
        </>
    )
}
