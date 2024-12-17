import * as THREE from 'three'
import { useTexture, useGLTF, Html } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
export default function Monitor({ controlsRef, isNight }) 
{
    const { camera } = useThree()

    const monitor = useGLTF('./Model/Monitor.glb')

    const [highlight, setHighlight] = useState(false)
    const [lineOpacity, setLineOpacity] = useState(0.5)
    const [animatingCamera, setAnimatingCamera] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const zoomCameraPosition = new THREE.Vector3(- 1.5, 1.8, - 1.2)
    const lookAtTarget = new THREE.Vector3(- 3.9, 1.65, - 0.8)

    const monitorTexture = useTexture('./Model/Monitor-day.jpg')
    monitorTexture.colorSpace = THREE.SRGBColorSpace
    monitorTexture.flipY = false

    const monitorTextureNight = useTexture('./Model/Monitor-night.jpg')
    monitorTextureNight.colorSpace = THREE.SRGBColorSpace
    monitorTextureNight.flipY = false

    const monitorClick = () => 
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
            duration: 1,
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
        if (monitor && monitor.nodes.Monitor) 
        {
            setIsLoading(false)
        }
    }, [monitor])

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

                {!isLoading && (
                    <Html
                        transform
                        wrapperClass="monitorScreen"
                        distanceFactor={ 0.9 }
                        position={[ 0, 0.1, 0 ]}
                        rotation={[ - Math.PI / 2, 0, Math.PI / 2 ]}
                        occlude='blending'
                    >
                        <iframe 
                            src='https://web.neftali-alejandro.com/'
                        />
                    </Html>
                )}
            </mesh>

            {highlight && (
                <mesh
                    geometry={ monitor.nodes.Monitor.geometry }
                    scale={ 1 }
                    position={[ - 3.76, 1.995, - 0.74 ]}
                    rotation-z={ - Math.PI / 2 }
                    material={ lineMaterial }
                />
            )}

        </>
    )
}