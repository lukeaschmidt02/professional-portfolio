import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import pterodactylUrl from '../assets/pterodactyl.glb';

export const Pterodactyl = () => {
    const { scene } = useGLTF(pterodactylUrl);
    const meshRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (meshRef.current) {
            // Fly in a circle
            const time = state.clock.getElapsedTime();
            const radius = 8;
            meshRef.current.position.x = Math.sin(time * 0.5) * radius;
            meshRef.current.position.z = Math.cos(time * 0.5) * radius - 5;
            meshRef.current.position.y = Math.sin(time) * 2; // Bob up and down

            // Rotate to face direction of movement
            meshRef.current.rotation.y = time * 0.5 + Math.PI / 2;
            meshRef.current.rotation.z = Math.sin(time) * 0.1; // Bank slightly
        }
    });

    return (
        <primitive
            ref={meshRef}
            object={scene}
            scale={[0.5, 0.5, 0.5]}
            rotation={[0, Math.PI, 0]}
        />
    );
};
