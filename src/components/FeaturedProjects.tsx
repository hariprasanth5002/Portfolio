"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaChevronLeft, FaChevronRight, FaExternalLinkAlt } from "react-icons/fa";
import { projects } from "@/data/projects";

export const FeaturedProjects = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;
        const amount = 460; // Card width (420) + gap (40)
        scrollRef.current.scrollBy({
            left: direction === "left" ? -amount : amount,
            behavior: "smooth",
        });
    };

    return (
        <section id="projects" className="py-6 px-2 bg-[#0F172A] relative overflow-hidden">
            <div className="max-w-6xl mx-auto z-10 relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex flex-col items-center mb-5 text-center">
                        <div className="inline-block px-3 py-1 mb-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono tracking-wider">
                            PROJECTS.CORE
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-100 uppercase tracking-tight">Featured Projects</h2>
                        <div className="h-1 w-16 bg-cyan-500 rounded-full mt-4 mb-2 opacity-40 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                    </div>

                    {/* Scroll controls */}
                    <div className="flex justify-end gap-2 mb-4">
                        <button
                            onClick={() => scroll("left")}
                            className="p-2 rounded-lg bg-[#111827] border border-gray-800 text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
                            aria-label="Scroll left"
                        >
                            <FaChevronLeft />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="p-2 rounded-lg bg-[#111827] border border-gray-800 text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
                            aria-label="Scroll right"
                        >
                            <FaChevronRight />
                        </button>
                    </div>

                    {/* Horizontal scroll container */}
                    <div
                        ref={scrollRef}
                        className="flex gap-10 overflow-x-auto pt-2 pb-4 snap-x snap-mandatory scrollbar-hide no-scrollbar px-6 lg:px-12"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex-shrink-0 w-[340px] md:w-[420px] h-[280px] snap-center rounded-xl p-4 bg-[#111827] border border-gray-800 hover:border-cyan-500/50 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] hover:-translate-y-2 transition-all duration-300 flex flex-col relative overflow-hidden group"
                            >
                                {/* Top 4px Gradient Glow Accent */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-cyan-500 to-green-500 opacity-50 group-hover:opacity-100 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.8)] transition-all duration-500" />

                                <div className="flex-1 relative z-10 overflow-y-auto pr-2 custom-scrollbar">
                                    <h3 className="font-bold text-lg text-slate-100 mb-2 tracking-tight group-hover:text-cyan-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-400 mb-2 text-xs leading-relaxed line-clamp-4">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5 mb-2">
                                        {project.tech.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-0.5 bg-[#020617] border border-gray-800 text-gray-500 rounded text-[10px] font-mono group-hover:border-cyan-500/20 group-hover:text-cyan-400 transition-colors"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-auto flex flex-wrap gap-3">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 min-w-[120px] inline-flex justify-center items-center gap-2 rounded-lg px-4 py-2 bg-gradient-to-r from-slate-700 to-slate-800 border border-slate-600 text-white text-xs font-bold hover:bg-slate-700 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all"
                                    >
                                        <FaGithub /> Source
                                    </a>
                                    {project.live && (
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 min-w-[120px] inline-flex justify-center items-center gap-2 rounded-lg px-4 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 border border-cyan-500/50 text-white text-xs font-bold hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all"
                                        >
                                            <FaExternalLinkAlt /> Live
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
