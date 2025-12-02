import { Stars, useTexture, shaderMaterial } from '@react-three/drei';
import { useFrame, useThree, extend } from '@react-three/fiber';
import { useRef, Suspense, useState, useMemo } from 'react';
import * as THREE from 'three';
import { Pterodactyl } from './Pterodactyl';
import { EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

// Import images dynamically
const monochromeImages = import.meta.glob('../assets/monochromeBackground/*', { eager: true });
const textureUrls = Object.values(monochromeImages).map((img: any) => img.default);

// Custom Shader Material
const GlitchTransitionMaterial = shaderMaterial(
    {
        uTexture1: new THREE.Texture(),
        uTexture2: new THREE.Texture(),
        uMix: 0,
        uGlitchStrength: 0,
        uScrollSpeed: 0,
        uTime: 0,
        uResolution: new THREE.Vector2(),
        uTiling1: new THREE.Vector2(1, 1),
        uTiling2: new THREE.Vector2(1, 1)
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
    uniform vec2 uTiling1;
    uniform vec2 uTiling2;
    varying vec2 vUv;

    // Random function
    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
        // Calculate UVs for each texture with its own tiling
        vec2 uv1 = vUv * uTiling1;
        vec2 uv2 = vUv * uTiling2;
        
        // Calculate row index to mask everything but the middle row
        // We use uTiling1.y for the mask since vertical tiling is fixed/shared (3 rows)
        float row = floor(vUv.y * uTiling1.y);
        float middleRow = floor(uTiling1.y / 2.0);
        
        // Mask: 1.0 if in middle row, 0.0 otherwise
        float mask = step(middleRow, row) - step(middleRow + 1.0, row);
        
        // Scroll distortion (RGB Shift based on speed)
        float scrollOffset = uScrollSpeed * 0.05;
        
        // Glitch displacement
        float glitch = 0.0;
        if (uGlitchStrength > 0.0) {
            float noise = random(vec2(vUv.y, uTime)); // Use vUv.y for consistent noise across tilings
            if (noise < uGlitchStrength) {
                glitch = (random(vec2(vUv.y, uTime * 2.0)) - 0.5) * 0.2 * uGlitchStrength;
            }
        }
        
        vec2 distortedUv1 = uv1 + vec2(glitch, 0.0);
        vec2 distortedUv2 = uv2 + vec2(glitch, 0.0);

        // Texture 1 Sample
        float r1 = texture2D(uTexture1, distortedUv1 + vec2(scrollOffset, 0.0)).r;
        float g1 = texture2D(uTexture1, distortedUv1).g;
        float b1 = texture2D(uTexture1, distortedUv1 - vec2(scrollOffset, 0.0)).b;
        float a1 = texture2D(uTexture1, distortedUv1).a;
        vec4 tex1 = vec4(r1, g1, b1, a1);

        // Texture 2 Sample
        float r2 = texture2D(uTexture2, distortedUv2 + vec2(scrollOffset, 0.0)).r;
        float g2 = texture2D(uTexture2, distortedUv2).g;
        float b2 = texture2D(uTexture2, distortedUv2 - vec2(scrollOffset, 0.0)).b;
        float a2 = texture2D(uTexture2, distortedUv2).a;
        vec4 tex2 = vec4(r2, g2, b2, a2);
        
        // Mix textures
        // Use a noisy mix for transition
        float mixNoise = random(vec2(vUv.x, vUv.y + uTime));
        float mixVal = smoothstep(0.4, 0.6, uMix + (mixNoise - 0.5) * uGlitchStrength);
        
        vec4 color = mix(tex1, tex2, uMix); // Simple mix for now to ensure smoothness

        // Add some scanlines based on scroll
        float scanline = sin(vUv.y * 200.0 + uTime * 10.0) * 0.1 * uScrollSpeed;
        color.rgb += scanline;
        
        // Apply mask
        color.a *= mask;

        if (color.a < 0.01) discard;

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
    // Load textures dynamically
    const textures = useTexture(textureUrls.length > 0 ? textureUrls : ['/placeholder.png']); // Fallback if empty
    const materialRef = useRef<any>(null);

    // State for transition
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const transitionProgress = useRef(0);

    // Scroll tracking
    const lastScrollY = useRef(0);
    const scrollSpeed = useRef(0);

    // Setup textures for tiling
    useMemo(() => {
        textures.forEach(texture => {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping; // Also wrap vertically just in case
            texture.needsUpdate = true;
        });
    }, [textures]);

    // Calculate tiling for ALL textures
    const allTilings = useMemo(() => {
        return textures.map(texture => {
            if (!texture || !texture.image) return new THREE.Vector2(6, 3);
            const img = texture.image as HTMLImageElement;
            const imageAspect = img.width / img.height;
            const viewportAspect = viewport.width / viewport.height;
            const tilingY = 3;
            const tilingX = tilingY * (viewportAspect / imageAspect);
            return new THREE.Vector2(tilingX, tilingY);
        });
    }, [textures, viewport.width, viewport.height]);

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
                    materialRef.current.uTiling2 = allTilings[next];
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
                    materialRef.current.uTiling1 = allTilings[nextIndex];
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
            materialRef.current.uTiling1 = allTilings[0];

            materialRef.current.uTexture2 = textures[1];
            materialRef.current.uTiling2 = allTilings[1];
        }
    }, [textures, allTilings]);

    // Calculate tiling based on aspect ratio
    const tiling = useMemo(() => {
        const texture = textures[0];
        if (!texture || !texture.image) {
            console.log("Texture or image missing, using default tiling");
            return new THREE.Vector2(6, 3);
        }

        const img = texture.image as HTMLImageElement;
        const imageAspect = img.width / img.height;
        const viewportAspect = viewport.width / viewport.height;
        const tilingY = 3; // Keep vertical tiling fixed to 3 rows

        // Formula: tilingX = tilingY * (viewportAspect / imageAspect)
        const tilingX = tilingY * (viewportAspect / imageAspect);

        console.log("Aspect Ratio Debug:", {
            imageWidth: img.width,
            imageHeight: img.height,
            imageAspect,
            viewportWidth: viewport.width,
            viewportHeight: viewport.height,
            viewportAspect,
            calculatedTilingX: tilingX
        });

        return new THREE.Vector2(tilingX, tilingY);
    }, [textures, viewport.width, viewport.height]);

    return (
        <mesh position={[0, 0, -10]}>
            <planeGeometry args={[viewport.width * 4, viewport.height * 4]} />
            <glitchTransitionMaterial
                ref={materialRef}
                transparent
                depthWrite={false}
                uTexture1={textures[0]}
                uTexture2={textures[1]}
                uTiling1={allTilings[0]}
                uTiling2={allTilings[1]}
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
