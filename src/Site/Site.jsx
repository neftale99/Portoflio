import * as THREE from 'three'
import { useTexture, useGLTF } from '@react-three/drei'
import { useState } from 'react'
import Lap from './Lap.jsx'
import Monitor from './Monitor.jsx'
import Links from './Links.jsx'
import Chair from './Chair.jsx'
import Drone from './Drone.jsx'
import Lamp from './Lamp.jsx'
import SkyComponent from './SkyComponent.jsx'
import useMobile from './Mobile.jsx'
import LapMobile from './LapMobile.jsx'
import MonitorMobile from './MonitorMobile.jsx'
import Message from './Message.jsx'

export default function Site({ controlsRef }) 
{
    const isMobile = useMobile()

    const room = useGLTF('./Model/Room.glb')
    const roomTexture = useTexture('./Model/Room-day.jpg')
    roomTexture.colorSpace = THREE.SRGBColorSpace
    roomTexture.flipY = false

    const roomTextureNight = useTexture('./Model/Room-night.jpg')
    roomTextureNight.colorSpace = THREE.SRGBColorSpace
    roomTextureNight.flipY = false

    const [isNight, setIsNight] = useState(false)
    const roomTextureToUse = isNight ? roomTextureNight : roomTexture

    const lampClick = () => 
    {
        setIsNight(prev => !prev)
    }

    return (
        <>
            <mesh 
                geometry={ room.nodes.Room.geometry } 
                scale={ 1 } 
                position-y={ - 1.5 }
            >
                <meshBasicMaterial 
                    map={ roomTextureToUse } 
                />
            </mesh>

            <Lamp 
                onClick={ lampClick } 
                isNight={ isNight } 
            />

            {isMobile ? (
                <>
                    <Message />
                    <LapMobile 
                        isNight={ isNight } 
                    />
                    <MonitorMobile 
                        isNight={ isNight } 
                    />
                </>
            ) : (
                <>
                    <Lap 
                        controlsRef={ controlsRef } 
                        isNight={ isNight } 
                    />
                    <Monitor 
                        controlsRef={ controlsRef } 
                        isNight={ isNight } 
                    />
                </>
            )}

            <Links 
                isNight={ isNight } 
            />

            <Chair 
                isNight={ isNight } 
            />
            
            <Drone 
                isNight={ isNight } 
            />
            
            <SkyComponent 
                isNight={ isNight } 
            />

        </>
    )
}
