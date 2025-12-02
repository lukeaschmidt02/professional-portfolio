import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, RoundedBox, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface ImageCubeProps {
    position: [number, number, number];
    imagePath: string;
    speed?: number;
    rotationIntensity?: number;
    floatIntensity?: number;
}

export const ImageCube = ({
    position,
    imagePath,
    speed = 1,
    rotationIntensity = 1,
    floatIntensity = 1
}: ImageCubeProps) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const texture = useTexture(imagePath);
    const [hovered, setHover] = useState(false);

    // Clone texture to avoid affecting other instances and apply "cover" scaling
    const coverTexture = useMemo(() => {
        const cloned = texture.clone();
        const { width, height } = cloned.image as HTMLImageElement;
        const aspect = width / height;

        cloned.wrapS = cloned.wrapT = THREE.RepeatWrapping;

        if (aspect > 1) {
            // Landscape: scale width to crop sides
            cloned.repeat.set(1 / aspect, 1);
            cloned.offset.set((1 - 1 / aspect) / 2, 0);
        } else {
            // Portrait: scale height to crop top/bottom
            cloned.repeat.set(1, aspect);
            cloned.offset.set(0, (1 - aspect) / 2);
        }

        cloned.needsUpdate = true;
        return cloned;
    }, [texture]);

    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <Float
            speed={speed}
            rotationIntensity={rotationIntensity}
            floatIntensity={floatIntensity}
        >
            <RoundedBox
                ref={meshRef}
                args={[2, 2, 2]} // Size
                radius={0.1} // Radius of the rounded corners
                smoothness={4} // Smoothness of the rounded corners
                position={position}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
                scale={hovered ? 1.1 : 1}
            >
                <meshStandardMaterial map={coverTexture} />
            </RoundedBox>
        </Float>
    );
};
