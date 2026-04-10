export interface Project {
    title: string;
    description: string;
    tech: string[];
    github: string;
    live?: string;
}

export const projects: Project[] = [
    {
        title: "Agri AI - Multimodal Agriculture Assistant",
        description: "An end-to-end intelligent agricultural advisor leveraging Vision Transformers, NLP, and real-time RAG to provide smallholder farmers with actionable insights on crop health and hyperlocal weather via an intuitive mobile-first web app.",
        tech: ["Python", "FastAPI", "React", "NLP", "RAG"],
        github: "https://github.com/hariprasanth5002/agri-ai",
        live: "https://agri-ai-indol.vercel.app?_vercel_share=bLfLZs92zI3bHnH9KPNZWaiikxuay5YY",
    },
    {
        title: "PlantDisease Ensemble ViT Swin",
        description: "A sophisticated deep learning system for early plant disease detection. It utilizes an ensemble architecture combining Vision Transformer (ViT) and Swin Transformer to achieve state-of-the-art accuracy in diverse environments.",
        tech: ["Python", "PyTorch", "ViT", "Swin Transformer"],
        github: "https://github.com/hariprasanth5002/PlantDisease-Ensemble-ViT-Swin",
    },
    {
        title: "AURA AI Assistant",
        description: "An AI desktop companion that monitors user well-being using real-time computer vision. It detects fatigue and eye strain, proactively suggesting breaks to maintain a healthy and productive workflow.",
        tech: ["Python", "Computer Vision", "AI", "Automation"],
        github: "https://github.com/hariprasanth5002/AURA-AI-Assistant",
    },
    {
        title: "Mitra AI Agriculture Assistant",
        description: "An intelligent agricultural advisor providing precision farming support. Mitra uses NLP to understand farmer queries and delivers data-driven insights on crop health and soil-specific fertilizer recommendations.",
        tech: ["Python", "NLP", "Machine Learning"],
        github: "https://github.com/hariprasanth5002/Mitra-AI-Agri-Assistant01",
    },
];
