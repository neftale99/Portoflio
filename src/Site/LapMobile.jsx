import * as THREE from 'three'
import { useTexture, useGLTF, Html, useVideoTexture } from '@react-three/drei'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

export default function LapMobile({ isNight }) 
{

    const lap = useGLTF('./Model/Lap.glb')

    const [highlight, setHighlight] = useState(false)
    const [lineOpacity, setLineOpacity] = useState(0.5)

    const lapTexture = useTexture('./Model/Lap-day.jpg')
    lapTexture.colorSpace = THREE.SRGBColorSpace
    lapTexture.flipY = false

    const lapTextureNight = useTexture('./Model/Lap-night.jpg')
    lapTextureNight.colorSpace = THREE.SRGBColorSpace
    lapTextureNight.flipY = false

    const screen = useTexture('./Images/ss-ncode.jpg')
    screen.colorSpace = THREE.SRGBColorSpace

    useFrame(() => 
    {
        setLineOpacity(0.1 + 0.4 * (0.5 * (1 + Math.sin(Date.now() * 0.004))))
    })

    const lineMaterial = new THREE.MeshBasicMaterial(
    {
        color: '#2c9081',
        side: THREE.FrontSide,
        wireframe: false,
        opacity: lineOpacity,
        transparent: true,
    })

    const lapClick = () => window.open('https://gallery-ncode.neftali-alejandro.com/#welcome', '_blank')

    return (
        <>
            <mesh
                geometry={ lap.nodes.Lap.geometry }
                scale={ 1 }
                position={[ - 3.36, 0.85, 1.7 ]}
                onClick={ lapClick }
                onPointerEnter={() => 
                {
                    document.body.style.cursor = 'pointer'
                    setHighlight(true)
                }}
                onPointerLeave={() => 
                {
                    document.body.style.cursor = 'default'
                    setHighlight(false)
                }}
            >
                <meshBasicMaterial
                    map={isNight ? lapTextureNight : lapTexture} 
                />

                <mesh
                    position={[ - 0.58, 0.64, 0 ]}
                    rotation-y={ Math.PI / 2 }
                >
                    <planeGeometry args={[ 1.55, 1]}  />
                    <meshBasicMaterial map={ screen } />
                </mesh>

            </mesh>

            {highlight && (
                <mesh
                    geometry={ lap.nodes.Lap.geometry }
                    scale={ 1.03 }
                    position={[ -3.36, 0.85, 1.7 ]}
                    material={ lineMaterial }
                />
            )}
        </>
    )
}