import * as THREE from 'three'
import { Sky as ThreeSky } from 'three/addons/objects/Sky.js'
import { MeshPortalMaterial, Cloud, Clouds } from '@react-three/drei'
import { useRef, useEffect } from 'react'

export default function SkyComponent({ isNight }) 
{
  const skyRef = useRef()

  const skyDay = 
  {
    turbidity: 20,
    rayleigh: 5.3,
    mieCoefficient: 0.01,
    mieDirectionalG: 0.95,
    elevation: -2,
    azimuth: -125,
    cloudColor1: '#ffd700',
    cloudColor2: '#ff6a13',
    cloudPositions: 
    [
      { position: [-50.0, 8.9, -37.5], scale: 2.22 },
      { position: [1.8, 0, -2.1], scale: 1.4 },
    ]
  }

  const skyNight = 
  {
    turbidity: 20,
    rayleigh: 2,
    mieCoefficient: 0.09,
    mieDirectionalG: 0.9,
    elevation: - 5,
    azimuth: - 125,
    cloudColor1: '#1b2838',
    cloudColor2: '#2c3e50',
    cloudPositions: 
    [
      { position: [- 10, 0, - 30.0], scale: 5 },
      { position: [ 5, - 1, - 10 ], scale: 2.5 },
    ]
  }

  const settings = isNight ? skyNight : skyDay

  useEffect(() => 
  {
    if (skyRef.current) 
    {
      const sky = skyRef.current

      sky.scale.setScalar(450000)

      const phi = THREE.MathUtils.degToRad(90 - settings.elevation)
      const theta = THREE.MathUtils.degToRad(settings.azimuth)
      const sunPosition = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta)
      )

      sky.material.uniforms.sunPosition.value.copy(sunPosition)
      sky.material.uniforms.turbidity.value = settings.turbidity
      sky.material.uniforms.rayleigh.value = settings.rayleigh
      sky.material.uniforms.mieCoefficient.value = settings.mieCoefficient
      sky.material.uniforms.mieDirectionalG.value = settings.mieDirectionalG
    }
  }, [settings])

  return (
    <>
      <mesh position={[ 0.3, 2.6, -4.65 ]}>
        <planeGeometry args={[ 4, 4 ]} />
        <MeshPortalMaterial side={ THREE.DoubleSide }>
          <primitive
            ref={ skyRef }
            object={ new ThreeSky() }
          />
          <ambientLight intensity={ 4 } />
          <Clouds>
            <Cloud 
              seed={3} 
              segments={50} 
              bounds={[10, 2, 2]} 
              volume={0.10} 
              opacity={0.8}
              color={settings.cloudColor1}   
              scale={ 2.22 }
              position={settings.cloudPositions[0].position} 
            />
            <Cloud 
              seed={1}
              segments={20} 
              scale={ 1.4 } 
              volume={0.2} 
              color={settings.cloudColor2} 
              fade={100} 
              position={settings.cloudPositions[1].position} 
            />
          </Clouds>
        </MeshPortalMaterial>
      </mesh>
      
    </>
  )
}
