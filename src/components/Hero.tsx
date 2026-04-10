"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";

/* Lazy-load the heavy 3D scene — SSR disabled */
const HeroScene = dynamic(() => import("./hero/HeroScene"), { ssr: false });

/* ─── Main Hero Component ─── */
export const Hero = () => {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        setShowContent(true);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.3 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
    };

    return (
        <section
            id="home"
            className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-black selection:bg-cyan-500/30"
        >
            {/* ── 3D Canvas Background ── */}
            <Suspense
                fallback={
                    <div className="absolute inset-0 bg-black flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                }
            >
                <HeroScene />
            </Suspense>

            {/* ── Vignette overlays ── */}
            <div className="absolute top-0 w-full h-40 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />

            {/* ── Hero Text Overlay ── */}
            <div className="absolute inset-0 z-20 w-full max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center pointer-events-none">
                <AnimatePresence>
                    {showContent && (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-col items-center w-full pointer-events-none"
                        >
                            {/* Heading */}
                            <motion.h1
                                variants={itemVariants}
                                className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading text-white tracking-tighter mb-4 md:mb-6 leading-[1.1] drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                            >
                                Hi, I&apos;m{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                                    Hariprasanth
                                </span>
                            </motion.h1>

                            {/* Subtitle */}
                            <motion.p
                                variants={itemVariants}
                                className="text-cyan-400 mt-4 text-xl md:text-3xl font-medium tracking-tight drop-shadow-md"
                            >
                                Full Stack &amp; AI Developer
                            </motion.p>

                            {/* Description */}
                            <motion.p
                                variants={itemVariants}
                                className="text-slate-400 mt-4 mb-10 text-base md:text-lg max-w-2xl leading-relaxed"
                            >
                                I build intelligent systems, scalable backend services, and AI-powered applications.
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                variants={itemVariants}
                                className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full sm:w-auto pointer-events-auto mt-4"
                            >
                                {/* View Projects */}
                                <a
                                    href="#projects"
                                    className="group w-full sm:w-auto px-8 py-4 bg-cyan-500/10 border border-cyan-500/50 text-cyan-300 font-bold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 text-center flex items-center justify-center gap-2 hover:bg-cyan-500/25 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5),0_0_60px_rgba(6,182,212,0.2)] backdrop-blur-sm"
                                >
                                    View Projects
                                    <svg
                                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </a>

                                {/* GitHub */}
                                <a
                                    href="https://github.com/hariprasanth5002"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white/[0.06] backdrop-blur-md border border-white/10 text-slate-200 font-bold rounded-xl transition-all duration-300 hover:bg-white/[0.12] hover:border-slate-300/40 hover:-translate-y-1"
                                >
                                    <FaGithub className="text-xl" /> GitHub
                                </a>

                                {/* Resume */}
                                <a
                                    href="https://drive.google.com/file/d/1U0nQTr9wtdNMmuYT7eQc0_FC3UiL3dT7/view?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-slate-700/50 text-slate-200 font-bold rounded-xl transition-all duration-300 hover:border-indigo-500/60 text-center backdrop-blur-sm shadow-[0_0_0px_rgba(99,102,241,0)] hover:shadow-[0_0_30px_rgba(99,102,241,0.35),0_0_60px_rgba(99,102,241,0.15)]"
                                >
                                    Resume
                                </a>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};
