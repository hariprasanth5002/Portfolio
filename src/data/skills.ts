import {
    FaJava, FaPython, FaReact, FaDocker, FaGitAlt, FaJs, FaAws, FaChartBar,
} from "react-icons/fa";
import {
    SiSpringboot, SiTensorflow, SiPytorch, SiPandas, SiNumpy,
    SiPostman, SiMysql, SiCplusplus,
} from "react-icons/si";
import { BsDatabase } from "react-icons/bs";
import type { IconType } from "react-icons";

export interface SkillItem {
    name: string;
    icon: IconType;
    description: string;
}

export interface SkillCategory {
    title: string;
    glowColor: string;
    strokeColor: string;
    skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
    {
        title: "Languages",
        glowColor: "#6366F1",
        strokeColor: "#818cf8",
        skills: [
            { name: "Java", icon: FaJava, description: "Backend development, data structures, and scalable Spring Boot APIs." },
            { name: "Python", icon: FaPython, description: "AI/ML pipelines, deep learning research, and data analysis workflows." },
            { name: "C++", icon: SiCplusplus, description: "Systems programming, competitive coding, and performance-critical algorithms." },
            { name: "SQL", icon: BsDatabase, description: "Optimized relational schemas, complex queries, and database tuning." },
            { name: "JavaScript", icon: FaJs, description: "Modern web development with React, Next.js, and full-stack TypeScript." },
        ],
    },
    {
        title: "Frameworks & Libraries",
        glowColor: "#06B6D4",
        strokeColor: "#22d3ee",
        skills: [
            { name: "Spring Boot", icon: SiSpringboot, description: "Production-grade RESTful APIs and microservice architectures." },
            { name: "React", icon: FaReact, description: "Interactive UIs and SPAs with component-driven architecture." },
            { name: "TensorFlow", icon: SiTensorflow, description: "Deep learning models for computer vision and NLP tasks." },
            { name: "PyTorch", icon: SiPytorch, description: "Custom architectures including ViT and Swin Transformers." },
            { name: "Pandas", icon: SiPandas, description: "Large-scale data manipulation, cleaning, and feature engineering." },
            { name: "NumPy", icon: SiNumpy, description: "Numerical computing and matrix operations for ML preprocessing." },
        ],
    },
    {
        title: "Tools & Platforms",
        glowColor: "#22C55E",
        strokeColor: "#4ade80",
        skills: [
            { name: "Docker", icon: FaDocker, description: "Containerizing apps for consistent dev-to-prod deployment." },
            { name: "GitHub", icon: FaGitAlt, description: "Version control, branching strategies, code reviews, and CI/CD." },
            { name: "Postman", icon: SiPostman, description: "API testing, documentation, and automated test suites." },
            { name: "MySQL", icon: SiMysql, description: "Relational database management with indexing and query optimization." },
            { name: "AWS", icon: FaAws, description: "Cloud infrastructure, serverless deployments, and scalable compute services." },
            { name: "PowerBI", icon: FaChartBar, description: "Data visualization, exploratory data analysis, and business intelligence dashboards." },
        ],
    },
];
