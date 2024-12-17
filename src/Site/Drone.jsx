import * as THREE from 'three'
import { useTexture, useGLTF, useAnimations } from '@react-three/drei'
import { useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Drone({ isNight }) 
{
    const drone = useGLTF('./Model/Drone.glb')
    const droneAnimation = useAnimations(drone.animations, drone.scene)

    const [isAnimating, setIsAnimating] = useState(false)
    const [highlight, setHighlight] = useState(false)
    const [lineOpacity, setLineOpacity] = useState(0.5)

    const droneTexture = useTexture('./Model/Drone-day.jpg')
    droneTexture.colorSpace = THREE.SRGBColorSpace;
    droneTexture.flipY = false

    const droneTextureNight = useTexture('./Model/Drone-night.jpg')
    droneTextureNight.colorSpace = THREE.SRGBColorSpace;
    droneTextureNight.flipY = false

    const droneMaterial = new THREE.MeshBasicMaterial(
    {
        map: isNight ? droneTextureNight : droneTexture
    })

    useEffect(() => 
    {
        drone.scene.traverse((child) => 
        {
            if (child.isMesh) 
            {
                child.material = droneMaterial
            }
        })
    }, [drone, droneMaterial])

    const droneClick = () => 
    {
        if (isAnimating) return

        if (droneAnimation.actions) 
        {
            let maxDuration = 0

            Object.values(droneAnimation.actions).forEach((action) => 
            {
                if (action) 
                {
                    action.stop()
                    action.reset()
                    action.play()
                    action.setLoop(THREE.LoopOnce)
                    action.clampWhenFinished = true

                    const duration = action.getClip().duration
                    maxDuration = Math.max(maxDuration, duration)
                }
            })

            setIsAnimating(true)

            if (maxDuration > 0) 
            {
                setTimeout(() => setIsAnimating(false), maxDuration * 1000)
            }
        }
    }

    useFrame(() => 
    {
        setLineOpacity(0.1 + 0.4 * (0.5 * (1 + Math.sin(Date.now() * 0.004))))
    })
    
    const lineMaterial = new THREE.MeshBasicMaterial(
    {
        color: '#32ec6a',
        side: THREE.FrontSide,
        wireframe: false,
        opacity: lineOpacity,
        transparent: true,
    })

    return (
        <>
            <primitive
                object={ drone.scene }
                scale={ 1 }
                position-y={ - 1.5 }
                onClick={ droneClick }
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
            />
            
            {highlight && !isAnimating && (
                drone.scene.children.map((child, index) => 
                    child.isMesh && (
                        <mesh
                            key={ index }
                            geometry={ child.geometry }
                            position={[ 3.766,  - 1.59, - 0.705 ]}
                            scale={ 1.01 } 
                            material={ lineMaterial }
                        />
                    )
                )
            )}
        </>
    )
}
