"use client";

import { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

const HeroScene = dynamic(() => import("./hero/HeroScene"), { ssr: false });

export const Hero = () => {
    const [showContent, setShowContent] = useState(false);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const frame = window.requestAnimationFrame(() => setShowContent(true));
        return () => window.cancelAnimationFrame(frame);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: reduceMotion ? 0 : 0.13,
                delayChildren: reduceMotion ? 0 : 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28, filter: "blur(8px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: reduceMotion ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] as const },
        },
    };

    const buttonMotion = reduceMotion
        ? {}
        : { whileHover: { y: -5, scale: 1.025 }, whileTap: { scale: 0.97 } };

    return (
        <section
            id="home"
            className="relative isolate flex min-h-[680px] h-[100svh] items-center justify-center overflow-hidden bg-[#020617] selection:bg-cyan-500/30"
        >
            <div className="absolute inset-0 z-0" aria-hidden="true">
                <Suspense fallback={<div className="absolute inset-0 bg-[#020617]" />}>
                    <HeroScene />
                </Suspense>
            </div>

            {/* Layered atmosphere keeps the 3D scene atmospheric, not distracting. */}
            <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_50%_48%,rgba(2,6,23,0.04)_0%,rgba(2,6,23,0.22)_48%,rgba(2,6,23,0.78)_100%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-36 bg-gradient-to-b from-[#020617]/80 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-[#020617] to-transparent" />

            <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-5 pt-16 text-center sm:px-8 md:pt-10">
                <AnimatePresence>
                    {showContent && (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex w-full flex-col items-center"
                        >
                            <motion.div variants={itemVariants} className="mb-5 flex items-center gap-2 rounded-full border border-cyan-400/20 bg-slate-950/45 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-200/80 shadow-[0_0_30px_rgba(34,211,238,0.08)] backdrop-blur-md sm:text-xs">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
                                </span>
                                Building at the intersection of AI &amp; software
                            </motion.div>

                            <motion.h1
                                variants={itemVariants}
                                className="max-w-full text-[clamp(2.7rem,8.5vw,7.4rem)] font-bold leading-[0.98] tracking-[-0.065em] text-white [text-wrap:balance]"
                            >
                                Hi, I&apos;m{" "}
                                <span className="relative inline-block bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(34,211,238,0.16)]">
                                    Hariprasanth
                                    <motion.span
                                        aria-hidden="true"
                                        className="absolute -inset-x-3 -inset-y-2 -z-10 rounded-full bg-cyan-400/10 blur-2xl"
                                        animate={reduceMotion ? undefined : { opacity: [0.25, 0.65, 0.25], scale: [0.96, 1.04, 0.96] }}
                                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                </span>
                            </motion.h1>

                            <motion.p
                                variants={itemVariants}
                                className="mt-7 text-lg font-semibold tracking-tight text-cyan-300 sm:text-2xl md:text-3xl"
                            >
                                Full Stack &amp; AI Developer
                            </motion.p>

                            <motion.p
                                variants={itemVariants}
                                className="mt-4 max-w-2xl text-sm leading-7 text-slate-300/80 sm:text-base md:text-lg"
                            >
                                I build intelligent systems, scalable backend services, and AI-powered applications.
                            </motion.p>

                            <motion.div
                                variants={itemVariants}
                                className="mt-9 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4"
                            >
                                <motion.a
                                    href="#projects"
                                    {...buttonMotion}
                                    className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl border border-cyan-400/50 bg-cyan-400/[0.10] px-8 py-4 font-bold text-cyan-200 shadow-[0_0_24px_rgba(6,182,212,0.12)] backdrop-blur-xl transition-shadow duration-300 hover:border-cyan-300 hover:bg-cyan-400/[0.16] hover:shadow-[0_0_38px_rgba(6,182,212,0.28)]"
                                >
                                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.10] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                                    <span className="relative">View Projects</span>
                                    <motion.svg
                                        aria-hidden="true"
                                        className="relative h-4 w-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        animate={reduceMotion ? undefined : { x: [0, 4, 0] }}
                                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16m-7-7 7 7-7 7" />
                                    </motion.svg>
                                </motion.a>

                                <motion.a
                                    href="https://github.com/hariprasanth5002"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    {...buttonMotion}
                                    className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-slate-900/65 px-8 py-4 font-bold text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition-colors duration-300 hover:border-slate-400/40 hover:bg-slate-800/80"
                                >
                                    <FaGithub className="text-xl" /> GitHub
                                </motion.a>

                                <motion.a
                                    href="https://drive.google.com/file/d/1CZ99T0Q1OTGMPPTIZEnNUY5cdXINjAo_/view?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    {...buttonMotion}
                                    className="inline-flex items-center justify-center rounded-xl border border-indigo-300/20 bg-indigo-500/[0.06] px-8 py-4 font-bold text-slate-100 backdrop-blur-xl transition-all duration-300 hover:border-indigo-300/50 hover:bg-indigo-500/[0.12] hover:shadow-[0_0_30px_rgba(99,102,241,0.16)]"
                                >
                                    Resume
                                </motion.a>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <motion.a
                href="#about"
                aria-label="Scroll to About section"
                className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[9px] font-medium uppercase tracking-[0.3em] text-slate-400/70 sm:flex"
                animate={reduceMotion ? undefined : { y: [0, 7, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
                <span>Scroll to explore</span>
                <span className="h-8 w-px bg-gradient-to-b from-cyan-300/70 to-transparent" />
            </motion.a>
        </section>
    );
};
