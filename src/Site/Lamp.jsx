import * as THREE from 'three'
import { useTexture, useGLTF } from '@react-three/drei'
import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Lamp({ onClick }) 
{
    const lamp = useGLTF('./Model/Lamp.glb')

    const [highlight, setHighlight] = useState(false)
    const [lineOpacity, setLineOpacity] = useState(0.5)
    const [isNight, setIsNight] = useState(false)

    const lampTexture = useTexture('./Model/Lamp-day.jpg')
    lampTexture.colorSpace = THREE.SRGBColorSpace
    lampTexture.flipY = false

    const lampTextureNight = useTexture('./Model/Lamp-night.jpg')
    lampTextureNight.colorSpace = THREE.SRGBColorSpace
    lampTextureNight.flipY = false

    const lampClick = () => 
    {
        setIsNight((prev) => !prev)
        onClick()
    }

    useFrame((state, delta) => 
    {
        setLineOpacity(0.1 + 0.4 * (0.5 * (1 + Math.sin(state.clock.elapsedTime * 4))))
    })

    const lineMaterial = new THREE.MeshBasicMaterial(
    {
        color: '#ffffff',
        side: THREE.FrontSide,
        wireframe: false,
        opacity: lineOpacity,
        transparent: true,
    })

    return (
        <>
            <mesh
                geometry={ lamp.nodes.Lamp.geometry }
                scale={ 1 }
                position={[ - 3.94, 0.93, - 2.51 ]}
                onClick={ lampClick }
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
                    map={ isNight ? lampTextureNight : lampTexture } 
                />
            </mesh>

            {highlight && (
                <mesh
                    geometry={ lamp.nodes.Lamp.geometry }
                    scale={ 1 }
                    position={[ - 3.94, 0.93, - 2.51 ]}
                    material={ lineMaterial } 
                />
            )}
        </>
    );
}
