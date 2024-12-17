import { useProgress } from '@react-three/drei'

export default function LoadingScreen()
{
    const { progress, active } = useProgress()
    
    return(
        <>
        <div className={`loading-screen ${active ? '' : 'loading-screen--hidden'}`}>
            <div className='loading-screen-container'>
                <h1 className='loading-screen-title'> Neftali Alejandro </h1>
                <div className='progress-container'>
                    <div 
                        className='progress-bar'
                        style={
                        {
                            width: `${progress}%`,
                        }}
                    >
                    </div>
                </div>
            </div>
        </div>
        </>

    )
}