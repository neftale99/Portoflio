import * as THREE from 'three'
import { useTexture, useGLTF } from '@react-three/drei'
import { useState } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Links({ isNight }) 
{
    const polaroid = useGLTF('./Model/Polaroid.glb')
    const github = useGLTF('./Model/Github.glb')
    const linkedin = useGLTF('./Model/Linkedin.glb')

    const [highlightPolaroid, setHighlightPolaroid] = useState(false)
    const [highlightGithub, setHighlightGithub] = useState(false)
    const [highlightLinkedin, setHighlightLinkedin] = useState(false)
    const [lineOpacity, setLineOpacity] = useState(0.5)

    const polaroidTexture = useTexture('./Model/Polaroid-day.jpg')
    polaroidTexture.colorSpace = THREE.SRGBColorSpace
    polaroidTexture.flipY = false

    const polaroidTextureNight = useTexture('./Model/Polaroid-night.jpg')
    polaroidTextureNight.colorSpace = THREE.SRGBColorSpace
    polaroidTextureNight.flipY = false

    const githubTexture = useTexture('./Model/Github-day.jpg')
    githubTexture.colorSpace = THREE.SRGBColorSpace
    githubTexture.flipY = false

    const githubTextureNight = useTexture('./Model/Github-night.jpg')
    githubTextureNight.colorSpace = THREE.SRGBColorSpace
    githubTextureNight.flipY = false

    const linkedinTexture = useTexture('./Model/Linkedin-day.jpg')
    linkedinTexture.colorSpace = THREE.SRGBColorSpace
    linkedinTexture.flipY = false

    const linkedinTextureNight = useTexture('./Model/Linkedin-night.jpg')
    linkedinTextureNight.colorSpace = THREE.SRGBColorSpace
    linkedinTextureNight.flipY = false

    const polaroidClick = () => window.open(' https://www.instagram.com/n_code99', '_blank')
    const githubClick = () => window.open('https://github.com/neftale99', '_blank')
    const linkedinClick = () => window.open('https://www.linkedin.com/in/neftali-alejandro-morales-mart%C3%ADnez-4336b4292/', '_blank')

    useFrame(() => 
    {
        setLineOpacity(0.1 + 0.4 * (0.5 * (1 + Math.sin(Date.now() * 0.004))))
    })

    const lineMaterialPolaroid = new THREE.MeshBasicMaterial(
    {
        color: '#c40859',
        side: THREE.FrontSide,
        wireframe: false,
        opacity: lineOpacity,
        transparent: true,
    })

    const lineMaterialLinkedin = new THREE.MeshBasicMaterial(
    {
        color: '#00868e',
        side: THREE.FrontSide,
        wireframe: false,
        opacity: lineOpacity,
        transparent: true,
    })

    const lineMaterialGithub = new THREE.MeshBasicMaterial(
    {
        color: '#e15909',
        side: THREE.FrontSide,
        wireframe: false,
        opacity: lineOpacity,
        transparent: true,
    })

    return (
        <>
            {/* Polaroid */}
            <mesh
                geometry={ polaroid.nodes.Polaroid.geometry }
                scale={ 1 } 
                position={[ 4.62, 0.284, -3.91 ]}
                onClick={ polaroidClick }
                onPointerEnter={() => 
                {
                    document.body.style.cursor = 'pointer'
                    setHighlightPolaroid(true)
                }}
                onPointerLeave={() => 
                {
                    document.body.style.cursor = 'default'
                    setHighlightPolaroid(false)
                }}
            >
                <meshBasicMaterial 
                    map={ isNight ? polaroidTextureNight : polaroidTexture } 
                />
            </mesh>
            {highlightPolaroid && (
                <mesh
                    geometry={ polaroid.nodes.Polaroid.geometry }
                    scale={ 1 }
                    position={[ 4.62, 0.284, - 3.91 ]}
                    material={ lineMaterialPolaroid }
                />
            )}

            {/* Github */}
            <mesh
                geometry={ github.nodes.Github.geometry }
                scale={ 1 }
                position={[ 3.16, 3.87, -4.5 ]}
                rotation-x={ Math.PI / 2 }
                onClick={ githubClick }
                onPointerEnter={() => 
                {
                    document.body.style.cursor = 'pointer'
                    setHighlightGithub(true)
                }}
                onPointerLeave={() => 
                {
                    document.body.style.cursor = 'default'
                    setHighlightGithub(false)
                }}
            >
                <meshBasicMaterial 
                    map={ isNight ? githubTextureNight : githubTexture }
                />
            </mesh>
            {highlightGithub && (
                <mesh
                    geometry={ github.nodes.Github.geometry }
                    scale={ 1 }
                    position={[ 3.16, 3.87, -4.5 ]}
                    rotation-x={ Math.PI / 2 }
                    material={ lineMaterialGithub }
                />
            )}

            {/* Linkedin */}
            <mesh
                geometry={ linkedin.nodes.Linkedin.geometry }
                scale={ 1 }
                position={[ 4.305, 3.87, -4.5 ]}
                rotation-x={ Math.PI / 2 }
                onClick={ linkedinClick }
                onPointerEnter={() => 
                {
                    document.body.style.cursor = 'pointer'
                    setHighlightLinkedin(true)
                }}
                onPointerLeave={() => 
                {
                    document.body.style.cursor = 'default'
                    setHighlightLinkedin(false)
                }}
            >
                <meshBasicMaterial 
                    map={ isNight ? linkedinTextureNight : linkedinTexture } 
                />
            </mesh>
            {highlightLinkedin && (
                <mesh
                    geometry={ linkedin.nodes.Linkedin.geometry }
                    scale={ 1 }
                    position={[ 4.305, 3.87, -4.5 ]}
                    rotation-x={ Math.PI / 2 }
                    material={ lineMaterialLinkedin }
                />
            )}
        </>
    )
}
