import { Canvas } from '@react-three/fiber'
import { StrictMode, Suspense, useState } from 'react'
import { useProgress } from '@react-three/drei'
import Web from './Web.jsx'
import LoadingScreen from './LoadingScreen.jsx'

function Experience()
{
  return (
    <>
      <LoadingScreen />
      <Canvas
        camera={ 
        {
          fov: 45,
          near: 0.1,
          far: 2000,
          position: [ 13, 5, 12 ]
        }}
      >
        <Suspense>
          <Web />
        </Suspense>
        </Canvas>
    </>
  )
}

export default Experience

