import React from 'react'
import useMap from '../hooks/useMap'
import { Screen } from "react-screens"
import { Fab } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { page } from '../state'

export default function MapPage() {
    const [mapContainer] = useMap()
    
    return (
        <Screen transitionDirection="upDown">
            <div className="w-screen h-screen">
                <div className="w-full h-full" ref={mapContainer} />
                <Fab className="absolute m-10 inset-0" onClick={() => page.value = "home"}>
                    <Close />
                </Fab>
            </div>
        </Screen>
    )
}