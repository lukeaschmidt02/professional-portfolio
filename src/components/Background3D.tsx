import { Stars, Image } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';
import { Pterodactyl } from './Pterodactyl';
import { EffectComposer, Glitch, Noise, Scanline, Vignette } from '@react-three/postprocessing';
import { GlitchMode, BlendFunction } from 'postprocessing';

// Import images
import glitchBg1 from '../assets/glitch_bg_1.png';
import glitchBg2 from '../assets/glitch_bg_2.png';
import glitchBg3 from '../assets/glitch_bg_3.png';

const GlitchPlane = ({ image, position, rotation, scale, speed }: any) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y += Math.sin(state.clock.elapsedTime * speed) * 0.002;
        }
    });

    return (
        <Image
            ref={meshRef}
            url={image}
            position={position}
            rotation={rotation}
            scale={scale}
            transparent
            opacity={0.8}
            toneMapped={false}
        />
    );
};

export const Background3D = () => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Very slow rotation
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <>
            <group ref={groupRef}>
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />

                {/* Film strip style arrangement */}
                <GlitchPlane image={glitchBg1} position={[-6, 2, -8]} rotation={[0, 0.2, 0]} scale={[8, 5, 1]} speed={0.5} />
                <GlitchPlane image={glitchBg2} position={[0, -1, -10]} rotation={[0, 0, 0]} scale={[10, 6, 1]} speed={0.3} />
                <GlitchPlane image={glitchBg3} position={[6, 3, -8]} rotation={[0, -0.2, 0]} scale={[8, 5, 1]} speed={0.7} />

                {/* Additional scattered planes for depth */}
                <GlitchPlane image={glitchBg1} position={[8, -4, -12]} rotation={[0, -0.4, 0]} scale={[6, 4, 1]} speed={0.4} />
                <GlitchPlane image={glitchBg3} position={[-8, -3, -12]} rotation={[0, 0.4, 0]} scale={[6, 4, 1]} speed={0.6} />

                <Suspense fallback={null}>
                    <Pterodactyl />
                </Suspense>
            </group>

            <EffectComposer>
                <Noise opacity={0.2} blendFunction={BlendFunction.OVERLAY} />
                <Glitch
                    delay={new THREE.Vector2(1.5, 3.5)}
                    duration={new THREE.Vector2(0.6, 1.0)}
                    strength={new THREE.Vector2(0.3, 1.0)}
                    mode={GlitchMode.SPORADIC}
                    active
                    ratio={0.85}
                />
                <Scanline density={1.5} opacity={0.3} />
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
        </>
    );
};
