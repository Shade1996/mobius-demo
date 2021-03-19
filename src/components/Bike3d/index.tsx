import { mapRange } from '@lincode/math'
import React, { Suspense } from 'react'
import { Spring } from 'react-spring/renderprops-universal'
import { Canvas, useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useSnapshot } from 'valtio'
import { homeScrollTop } from '../../state'
import CameraControls from '../CameraControls'
//@ts-ignore
import bike from './bike.glb'

const Loading: React.FC = () => {
	return (
		<mesh />
	)
}

const Bike = () => {
    const glb = useLoader(GLTFLoader, bike)

    if (Array.isArray(glb))
        throw new Error("unexpected glb data")

    return <primitive object={glb.scene} />
}

const Bike3d: React.FC = () => {
    const scrollTop = useSnapshot(homeScrollTop).value

    return (
        <Spring to={{ scrollTop }} config={{ mass: 3 }}>
            {({ scrollTop }) => (
                <div className="w-full h-full">
                    {/* <div className="w-full h-full absolute inset-0 bg-gray-300" style={{
                        opacity: mapRange(scrollTop, 0, 500, 0, 1, true)
                    }} /> */}
                    <Canvas>
                        <ambientLight intensity={0.5} />
                        <spotLight intensity={0.8} position={[300, 300, 400]} />
                        <Suspense fallback={<Loading />}>
                            <Bike />
                        </Suspense>
                        <CameraControls distance={200} orbitX={-scrollTop / 10} />
                    </Canvas>
                    <div className="text-center absolute bottom-0 w-full pb-24" style={{
                        opacity: mapRange(scrollTop, 0, 100, 1, 0, true),
                        transform: `translateY(${mapRange(scrollTop, 0, 100, 0, -50)}px)`
                    }}>
                        <div className="text-3xl opacity-50">hello</div>
                        <div className="text-5xl font-bold opacity-75">
                            Ruby
                        </div>
                        <div className="text-lg opacity-50">
                            welcome to Möbius
                        </div>
                    </div>
                </div>
            )}
        </Spring>
    )
}

export default Bike3d