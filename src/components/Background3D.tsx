import { Stars, useTexture, shaderMaterial } from '@react-three/drei';
import { useFrame, useThree, extend } from '@react-three/fiber';
import { useRef, Suspense, useState, useMemo } from 'react';
import * as THREE from 'three';
import { Pterodactyl } from './Pterodactyl';
import { EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

// Import images
import glitchBg1 from '../assets/glitch_bg_1.png';
import glitchBg2 from '../assets/glitch_bg_2.png';
import glitchBg3 from '../assets/glitch_bg_3.png';

// Custom Shader Material
const GlitchTransitionMaterial = shaderMaterial(
    {
        uTexture1: new THREE.Texture(),
        uTexture2: new THREE.Texture(),
        uMix: 0,
        uGlitchStrength: 0,
        uScrollSpeed: 0,
        uTime: 0,
        uResolution: new THREE.Vector2()
    },
    // Vertex Shader
    `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    // Fragment Shader
    `
    uniform sampler2D uTexture1;
    uniform sampler2D uTexture2;
    uniform float uMix;
    uniform float uGlitchStrength;
    uniform float uScrollSpeed;
    uniform float uTime;
    varying vec2 vUv;

    // Random function
    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
        vec2 uv = vUv;
        
        // Scroll distortion (RGB Shift based on speed)
        float scrollOffset = uScrollSpeed * 0.05;
        
        // Glitch displacement
        float glitch = 0.0;
        if (uGlitchStrength > 0.0) {
            float noise = random(vec2(uv.y, uTime));
            if (noise < uGlitchStrength) {
                glitch = (random(vec2(uv.y, uTime * 2.0)) - 0.5) * 0.2 * uGlitchStrength;
            }
        }
        
        vec2 distortedUv = uv + vec2(glitch, 0.0);

        // RGB Shift
        float r1 = texture2D(uTexture1, distortedUv + vec2(scrollOffset, 0.0)).r;
        float g1 = texture2D(uTexture1, distortedUv).g;
        float b1 = texture2D(uTexture1, distortedUv - vec2(scrollOffset, 0.0)).b;
        vec4 tex1 = vec4(r1, g1, b1, 1.0);

        float r2 = texture2D(uTexture2, distortedUv + vec2(scrollOffset, 0.0)).r;
        float g2 = texture2D(uTexture2, distortedUv).g;
        float b2 = texture2D(uTexture2, distortedUv - vec2(scrollOffset, 0.0)).b;
        vec4 tex2 = vec4(r2, g2, b2, 1.0);
        
        // Mix textures
        // Use a noisy mix for transition
        float mixNoise = random(vec2(uv.x, uv.y + uTime));
        float mixVal = smoothstep(0.4, 0.6, uMix + (mixNoise - 0.5) * uGlitchStrength);
        
        vec4 color = mix(tex1, tex2, uMix); // Simple mix for now to ensure smoothness

        // Add some scanlines based on scroll
        float scanline = sin(uv.y * 200.0 + uTime * 10.0) * 0.1 * uScrollSpeed;
        color.rgb += scanline;

        gl_FragColor = color;
    }
    `
);

extend({ GlitchTransitionMaterial });

// Add type definition for the custom material
declare global {
    namespace JSX {
        interface IntrinsicElements {
            glitchTransitionMaterial: any;
        }
    }
}

const FullScreenBackground = () => {
    const { viewport } = useThree();
    const textures = useTexture([glitchBg1, glitchBg2, glitchBg3]);
    const materialRef = useRef<any>(null);

    // State for transition
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const transitionProgress = useRef(0);

    // Scroll tracking
    const lastScrollY = useRef(0);
    const scrollSpeed = useRef(0);

    useFrame((state, delta) => {
        // Update time
        if (materialRef.current) {
            materialRef.current.uTime = state.clock.elapsedTime;

            // Scroll speed calculation
            const currentScrollY = window.scrollY;
            const deltaY = currentScrollY - lastScrollY.current;
            // Smooth damping for scroll speed
            scrollSpeed.current = THREE.MathUtils.lerp(scrollSpeed.current, Math.abs(deltaY) * 0.01, 0.1);
            materialRef.current.uScrollSpeed = scrollSpeed.current;
            lastScrollY.current = currentScrollY;
        }

        // Transition Logic
        if (!isTransitioning) {
            // Trigger transition every 4 seconds
            if (state.clock.elapsedTime % 4 > 3.5 && state.clock.elapsedTime > 1) {
                setIsTransitioning(true);
                transitionProgress.current = 0;
                // Prepare next texture
                const next = (currentIndex + 1) % textures.length;
                setNextIndex(next);
                if (materialRef.current) {
                    materialRef.current.uTexture2 = textures[next];
                }
            }
        } else {
            // Execute transition
            transitionProgress.current += delta * 1.5; // Speed of transition

            if (materialRef.current) {
                // Glitch strength peaks in the middle of transition
                const peak = Math.sin(transitionProgress.current * Math.PI);
                materialRef.current.uGlitchStrength = peak * 2.0; // Max glitch strength

                // Mix value goes from 0 to 1
                materialRef.current.uMix = Math.min(transitionProgress.current, 1.0);
            }

            if (transitionProgress.current >= 1) {
                setIsTransitioning(false);
                setCurrentIndex(nextIndex);
                if (materialRef.current) {
                    materialRef.current.uTexture1 = textures[nextIndex];
                    materialRef.current.uMix = 0;
                    materialRef.current.uGlitchStrength = 0;
                }
            }
        }
    });

    // Initial texture setup
    useMemo(() => {
        if (materialRef.current) {
            materialRef.current.uTexture1 = textures[0];
            materialRef.current.uTexture2 = textures[1];
        }
    }, [textures]);

    return (
        <mesh position={[0, 0, -10]}>
            <planeGeometry args={[viewport.width * 1.5, viewport.height * 1.5]} />
            <glitchTransitionMaterial
                ref={materialRef}
                transparent
                uTexture1={textures[0]}
                uTexture2={textures[1]}
            />
        </mesh>
    );
};

export const Background3D = () => {
    return (
        <>
            <group>
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />

                <Suspense fallback={null}>
                    <FullScreenBackground />
                    <Pterodactyl />
                </Suspense>
            </group>

            <EffectComposer>
                <Noise opacity={0.1} blendFunction={BlendFunction.OVERLAY} />
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
        </>
    );
};
