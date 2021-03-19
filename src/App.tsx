import React from 'react'
import { useSnapshot } from 'valtio'
import HomePage from './page/HomePage'
import LoginPage from './page/LoginPage'
import MapPage from './page/MapPage'
import { page } from './state'

export default function App() {
    useSnapshot(page)

    return (
        <>
            <HomePage />
            {page.value === "map" && <MapPage />}
        </>
    )
}
