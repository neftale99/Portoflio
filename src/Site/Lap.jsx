import * as THREE from 'three'
import { useTexture, useGLTF, Html } from '@react-three/drei'
import { useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'

export default function Lap({ controlsRef, isNight }) 
{
    const { camera } = useThree()

    const lap = useGLTF('./Model/Lap.glb')

    const [highlight, setHighlight] = useState(false)
    const [lineOpacity, setLineOpacity] = useState(0.5)
    const [animatingCamera, setAnimatingCamera] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const zoomCameraPosition = new THREE.Vector3( - 3.5, 2, - 1 )
    const lookAtTarget = new THREE.Vector3( - 4.2, 1.2, 1.5 )

    const lapTexture = useTexture('./Model/Lap-day.jpg')
    lapTexture.colorSpace = THREE.SRGBColorSpace
    lapTexture.flipY = false

    const lapTextureNight = useTexture('./Model/Lap-night.jpg')
    lapTextureNight.colorSpace = THREE.SRGBColorSpace
    lapTextureNight.flipY = false

    const lapClick = () => 
    {
        setAnimatingCamera(true)

        gsap.to(camera.position, 
        {
            duration: 1.5,
            x: zoomCameraPosition.x,
            y: zoomCameraPosition.y,
            z: zoomCameraPosition.z,
            ease: 'power2.out',
            onUpdate: () => 
            {
                if (controlsRef.current) 
                {
                    controlsRef.current.update()
                }
            },
            onComplete: () => 
            {
                setAnimatingCamera(false)
                camera.lookAt(lookAtTarget)
                if (controlsRef.current) controlsRef.current.update()
            }
        })

        gsap.to(controlsRef.current.target, 
        {
            duration: 1.5,
            x: lookAtTarget.x,
            y: lookAtTarget.y,
            z: lookAtTarget.z,
            ease: 'power2.out',
        })
    }

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

    useEffect(() => 
    {
        if (lap && lap.nodes.Lap) 
        {
            setIsLoading(false)
        }
    }, [ lap ])

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
                    map={ isNight ? lapTextureNight : lapTexture }
                />
                
                {!isLoading && (
                    <Html
                        transform
                        wrapperClass='lapScreen'
                        distanceFactor={ 0.7 }
                        position={[ - 0.58, 0.63, 0 ]}
                        rotation={[ 0, Math.PI / 2, 0 ]}
                        occlude='blending'    
                    >
                        <iframe
                            src='https://gallery-ncode.neftali-alejandro.com/'
                        />
                    </Html>
                )}
            </mesh>

            {highlight && (
                <mesh
                    geometry={ lap.nodes.Lap.geometry }
                    scale={ 1 }
                    position={[ - 3.36, 0.85, 1.7 ]}
                    material={ lineMaterial }
                />
            )}
        </>
    )
}
