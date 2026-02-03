/// <reference types="vite/client" />

declare module '*.stl' {
    const content: string;
    export default content;
}

declare module '*.glb' {
    const content: string;
    export default content;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            glitchTransitionMaterial: any;
        }
    }
}
