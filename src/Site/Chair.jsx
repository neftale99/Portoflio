import * as THREE from 'three'
import { useTexture, useGLTF, useAnimations } from '@react-three/drei'
import { useEffect } from 'react'

export default function Chair({ isNight })
{
    const chair = useGLTF('./Model/Chair.glb')

    const chairAnimation = useAnimations(chair.animations, chair.scene)

    const chairTexture = useTexture('./Model/Chair-day.jpg')
    chairTexture.colorSpace = THREE.SRGBColorSpace
    chairTexture.flipY = false

    const chairTextureNight = useTexture('./Model/Chair-night.jpg')
    chairTextureNight.colorSpace = THREE.SRGBColorSpace
    chairTextureNight.flipY = false

    useEffect(() =>
    {
        const chairAction = chairAnimation.actions.Chair
        chairAction.timeScale = 0.3
        chairAction.play()
    }, [])

    return(
    <>
        <primitive
            object={ chair.scene }
            scale={ 1 }
            position-y={ - 1.5 }
        >
            {chair.scene.traverse((child) => 
            {
                if (child.isMesh) 
                {
                    child.material = new THREE.MeshBasicMaterial(
                    {
                        map: isNight ? chairTextureNight : chairTexture
                    })
                }
            })}
        </primitive>
    
    </>
    )
}