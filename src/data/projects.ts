export interface Project {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    imageUrl?: string;
    demoUrl?: string;
    repoUrl?: string;
    featured?: boolean;
}

export const projects: Project[] = [
    {
        id: "huntago",
        title: "Huntago",
        description: "A Social Geocaching mobile application that gamifies exploration. Built with React Native and integrated with Google Maps API for location services. Uses Firebase for secure user authentication and real-time database management.",
        techStack: ["React Native", "Google Maps API", "Firebase", "TypeScript"],
        featured: true,
    },
    {
        id: "dino-glide",
        title: "Dino Glide",
        description: "A mobile game with over 300 downloads. Players control a dino gliding through obstacles. Utilizes Unity (C#) for game logic and integrates Apple StoreKit & Google Play Billing for monetization.",
        techStack: ["Unity", "C#", "Mobile Game", "Monetization"],
        featured: true,
    },
    {
        id: "lps-insights",
        title: "LPS Insights Agent",
        description: "Architected high-performance backend systems for enterprise-grade generative AI tools at Lowe's. Provides critical data synthesis for sales teams.",
        techStack: ["Python", "FastAPI", "LangChain", "Generative AI"],
        featured: false,
    },
    {
        id: "gan4seg",
        title: "GAN4Seg",
        description: "Developed a Generative Adversarial Network for brain CT segmentation using TensorFlow during Deep Learning Research.",
        techStack: ["Python", "TensorFlow", "Deep Learning", "Computer Vision"],
        featured: false,
    },
    {
        id: "learn-to-fly",
        title: "Learn to Fly",
        description: "Best Game Hack at HackNC 2022. A fun, interactive game project.",
        techStack: ["Game Dev", "Hackathon"],
        featured: false,
    }
];
