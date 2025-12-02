import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Background3D } from './Background3D';

export const CanvasContainer = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10 bg-primary">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                dpr={[1, 2]} // Handle high DPI screens
                gl={{ antialias: true }}
            >
                <Suspense fallback={null}>
                    <Background3D />
                </Suspense>
            </Canvas>
        </div>
    );
};
