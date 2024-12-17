import * as THREE from 'three'
import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react' 
import coffeeSmokeVertexShader from '../Shaders/CoffeeSmoke/vertex.glsl'
import coffeeSmokeFragmentShader from '../Shaders/CoffeeSmoke/fragment.glsl'

export default function Coffee()
{
    const smokeRef = useRef()
    
    const smokeTexture = useTexture('./Images/perlinTexture.png')
    smokeTexture.wrapS = THREE.RepeatWrapping
    smokeTexture.wrapT = THREE.RepeatWrapping

    useFrame((state, delta) =>
    {
        if (smokeRef.current) 
        {
            smokeRef.current.material.uniforms.uTime.value += delta
        }
    })

    return (
    <>
        <mesh
            ref={ smokeRef }
            position={[ -0.968, 1.48, 1.93 ]}
            scale={[ 0.2, 0.7, 0.2]}
        >
            <planeGeometry args={[1, 1, 16, 80]} />
            <shaderMaterial 
                vertexShader={ coffeeSmokeVertexShader }
                fragmentShader={ coffeeSmokeFragmentShader }
                uniforms={
                {
                    uTime: new THREE.Uniform(0),
                    uPerlinTexture: new THREE.Uniform(smokeTexture)
                }}
                wireframe={ false }
                side={ THREE.DoubleSide }
                transparent={ true }
                depthWrite={ false }
            />
        </mesh>

    </>
    )
}