import * as THREE from 'three'
import { useTexture, useGLTF, Html } from '@react-three/drei'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

export default function MonitorMobile({ isNight }) 
{
    const monitor = useGLTF('./Model/Monitor.glb')

    const [highlight, setHighlight] = useState(false)
    const [lineOpacity, setLineOpacity] = useState(0.5)

    const monitorTexture = useTexture('./Model/Monitor-day.jpg')
    monitorTexture.colorSpace = THREE.SRGBColorSpace
    monitorTexture.flipY = false

    const monitorTextureNight = useTexture('./Model/Monitor-night.jpg')
    monitorTextureNight.colorSpace = THREE.SRGBColorSpace
    monitorTextureNight.flipY = false

    const screen = useTexture('./Images/ss-n.jpg')
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

    const monitorClick = () => window.open('https://web.neftali-alejandro.com/', '_blank')

    return (
        <>
            <mesh
                geometry={ monitor.nodes.Monitor.geometry }
                scale={ 1 }
                position={[ - 3.76, 1.995, - 0.74 ]}
                rotation-z={ - Math.PI / 2 }
                onClick={ monitorClick }
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
                    map={isNight ? monitorTextureNight : monitorTexture} 
                />

                <mesh
                    position={[ - 0.01, 0.101, 0 ]}
                    rotation-z={ Math.PI / 2 }
                    rotation-x={ - Math.PI / 2 }
                >
                    <planeGeometry args={[ 2.45, 1.15]}  />
                    <meshBasicMaterial map={ screen } />
                </mesh>

            </mesh>

            {highlight && (
                <mesh
                    geometry={ monitor.nodes.Monitor.geometry }
                    scale={ 1.03 }
                    position={[ - 3.76, 1.995, - 0.74 ]}
                    rotation-z={ - Math.PI / 2 }
                    material={ lineMaterial }
                />
            )}

        </>
    )
}