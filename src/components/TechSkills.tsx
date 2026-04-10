"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories } from "@/data/skills";

const SkillNode = ({
    skill,
    color,
    strokeColor,
    index,
}: {
    skill: any;
    color: string;
    strokeColor: string;
    index: number;
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const Icon = skill.icon;
    const radius = 28; // for 64px diameter circle
    const circumference = 2 * Math.PI * radius;

    return (
        <div className="flex flex-col items-center">
            <motion.div
                className="relative flex flex-col items-center group cursor-default"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                {/* Circular Node Container (100x100) */}
                <div className="relative w-[64px] h-[64px] flex items-center justify-center">
                    {/* SVG for Stroke Animation */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                        {/* Background track circle */}
                        <circle
                            cx="32"
                            cy="32"
                            r={radius}
                            fill="none"
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth="2"
                        />
                        {/* Animated stroke circle */}
                        <motion.circle
                            cx="32"
                            cy="32"
                            r={radius}
                            fill="none"
                            stroke={strokeColor}
                            strokeWidth="2"
                            strokeLinecap="round"
                            initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
                            whileInView={{ strokeDashoffset: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                            style={{
                                filter: isHovered ? `drop-shadow(0 0 8px ${color})` : `drop-shadow(0 0 4px ${color}33)`,
                            }}
                        />
                    </svg>

                    {/* Icon */}
                    <Icon
                        className="text-xl transition-all duration-300"
                        style={{
                            color: isHovered ? strokeColor : "#94A3B8",
                            filter: isHovered ? `drop-shadow(0 0 10px ${color}80)` : "none",
                        }}
                    />
                </div>

                {/* Skill Name */}
                <span
                    className="text-xs font-medium mt-3 transition-colors duration-300 whitespace-nowrap"
                    style={{ color: isHovered ? strokeColor : "#94A3B8" }}
                >
                    {skill.name}
                </span>

                {/* Tooltip */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.95 }}
                            className="absolute bottom-full mb-6 w-52 p-3 bg-[#0F172A] border border-slate-800 rounded-xl shadow-2xl z-50 pointer-events-none backdrop-blur-md"
                        >
                            <div className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: strokeColor }}>
                                {skill.name}
                            </div>
                            <p className="text-[11px] text-slate-400 leading-relaxed">
                                {skill.description}
                            </p>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#0F172A] border-r border-b border-slate-800 rotate-45 -translate-y-[60%]" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export const TechSkills = () => {
    return (
        <section id="skills" className="bg-[#020617] py-12 px-6 overflow-hidden">
            <div className="max-w-[1200px] mx-auto flex flex-col items-center">
                {/* Section Header */}
                <div className="flex flex-col items-center text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-100 mb-2 tracking-tight">
                        Skills & Technologies
                    </h2>
                    <div className="h-1 w-16 bg-indigo-500 rounded-full mb-4 opacity-50" />
                    <p className="text-slate-400 max-w-2xl text-sm leading-relaxed">
                        My core technologies and tools used for building AI systems, backend services, and modern web applications.
                    </p>
                </div>

                {/* 3-Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-16 w-full place-items-start">
                    {skillCategories.map((category) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="w-full flex flex-col"
                        >
                            {/* Category Heading */}
                            <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400 mb-8 border-l-2 border-slate-800 pl-4 h-5 flex items-center">
                                {category.title}
                            </h3>

                            {/* Skill Nodes Grid */}
                            <div className="grid grid-cols-3 gap-4 self-center">
                                {category.skills.map((skill, i) => (
                                    <SkillNode
                                        key={skill.name}
                                        skill={skill}
                                        color={category.glowColor}
                                        strokeColor={category.strokeColor}
                                        index={i}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
