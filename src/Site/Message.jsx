import * as THREE from 'three'
import { Html, useProgress } from '@react-three/drei'
import { useState, useEffect } from 'react'

export default function Message() 
{
  const [showMessage, setShowMessage] = useState(false)

  const { progress } = useProgress()

  useEffect(() => 
    {
        if (progress === 100) 
        {
            setTimeout(() => 
            {
                setShowMessage(true)
            }, 1500)
    }
  }, [progress])

  return (
    <>
      {showMessage && (
        <Html
          position={[ 0, 5.8, 0 ]}
          wrapperClass="messageMobile"
          center
          distanceFactor={ 13 }
        >
          For the best experience,<br />
          please visit my website from a desktop or laptop computer.<br />
          Thanks a lot 😊
        </Html>
      )}

    </>
  )
}
