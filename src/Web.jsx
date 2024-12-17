import { OrbitControls } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import Site from './Site/Site.jsx'
import Coffee from './Site/Coffee.jsx'

const limits = 
{
  minX: - 5, maxX: 5,
  minY: 0.3, maxY: 2,
  minZ: - 2, maxZ: 2
}

export default function Web() 
{
  const controlsRef = useRef()
  
  useEffect(() => 
  {
    const controls = controlsRef.current

    if (!controls) return

    const updatePanLimits = () => 
    {
      const target = controls.target
      target.x = Math.max(limits.minX, Math.min(limits.maxX, target.x))
      target.y = Math.max(limits.minY, Math.min(limits.maxY, target.y))
      target.z = Math.max(limits.minZ, Math.min(limits.maxZ, target.z))
      controls.target.set(target.x, target.y, target.z)
    }

    controls.addEventListener('change', updatePanLimits)

    return () => controls.removeEventListener('change', updatePanLimits)

  }, [])

  return (
    <>      
      <color args={['#000000']} attach="background" />
      
      <OrbitControls
        ref={ controlsRef }
        makeDefault
        enablePan={ true }
        screenSpacePanning={ true }
        minPolarAngle={ 0 }
        maxPolarAngle={ Math.PI / 2 }
        minAzimuthAngle={ 0.2 }
        maxAzimuthAngle={ Math.PI / 2 }
        minDistance={ 3 }
        maxDistance={ 20 }
        dampingFactor={ 0.8 }
        rotateSpeed={ 0.7 }
        zoomSpeed={ 0.5 }
    />

    <Site controlsRef={ controlsRef } />

    <Coffee />

    </>
  )
}
