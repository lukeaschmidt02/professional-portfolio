import { Stars } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';
import { ImageCube } from './ImageCube';
import { Pterodactyl } from './Pterodactyl';

// Import images
import cliffside from '../assets/Cliffside.png';
import hiking from '../assets/Hiking.png';
import lowes from '../assets/Lowes_Tech.jpg';
import professional from '../assets/Professional_picture.png';
import speaking from '../assets/speaking_to_crowd.png';

export const Background3D = () => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Slow rotation of the entire group
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
        }
    });

    return (
        <group ref={groupRef}>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />

            <ImageCube position={[-4, 2, -5]} imagePath={cliffside} speed={1.5} />
            <ImageCube position={[4, -3, -6]} imagePath={hiking} speed={2} rotationIntensity={1.5} />
            <ImageCube position={[-3, -4, -8]} imagePath={lowes} speed={1.2} floatIntensity={2} />
            <ImageCube position={[5, 3, -10]} imagePath={professional} speed={1.8} />
            <ImageCube position={[0, 5, -12]} imagePath={speaking} speed={1} rotationIntensity={2} />

            <Suspense fallback={null}>
                <Pterodactyl />
            </Suspense>
        </group>
    );
};
