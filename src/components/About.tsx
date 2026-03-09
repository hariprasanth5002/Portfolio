"use client";

import { motion } from "framer-motion";

export const About = () => {
    return (
        <section id="about" className="py-24 px-6 bg-[#0F172A] relative overflow-hidden">
            {/* Background ambient light */}
            <div className="absolute top-[30%] -right-[10%] w-[30vw] h-[30vw] rounded-full bg-indigo-900/10 blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                >
                    {/* Left Column — Developer Workspace Animation */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="relative flex justify-center"
                    >
                        <div className="relative w-full max-w-md">
                            {/* Desk */}
                            <div className="bg-[#111827] rounded-2xl border border-gray-800 p-6 shadow-2xl shadow-cyan-900/10 relative">
                                {/* Laptop */}
                                <div className="relative">
                                    {/* Screen */}
                                    <motion.div
                                        className="bg-[#020617] rounded-lg border border-gray-700 overflow-hidden"
                                        animate={{ boxShadow: ["0 0 30px rgba(6,182,212,0.1)", "0 0 60px rgba(6,182,212,0.25)", "0 0 30px rgba(6,182,212,0.1)"] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        {/* Terminal content */}
                                        <div className="flex items-center px-3 py-2 bg-[#0F172A] border-b border-gray-800">
                                            <div className="flex gap-1.5">
                                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70"></div>
                                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></div>
                                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70"></div>
                                            </div>
                                            <span className="ml-auto text-[10px] text-gray-600 font-mono">hariprasanth.dev</span>
                                        </div>
                                        <div className="p-4 font-mono text-xs space-y-1.5 h-40">
                                            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
                                                <span className="text-cyan-400">const</span> <span className="text-slate-200">developer</span> <span className="text-gray-500">=</span> <span className="text-green-400">{`{`}</span>
                                            </motion.div>
                                            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }}>
                                                <span className="text-gray-500 ml-4">name:</span> <span className="text-amber-300">"Hariprasanth"</span><span className="text-gray-500">,</span>
                                            </motion.div>
                                            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.1 }}>
                                                <span className="text-gray-500 ml-4">focus:</span> <span className="text-amber-300">"AI & Full Stack"</span><span className="text-gray-500">,</span>
                                            </motion.div>
                                            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.4 }}>
                                                <span className="text-gray-500 ml-4">passion:</span> <span className="text-amber-300">"Building intelligent systems"</span>
                                            </motion.div>
                                            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.7 }}>
                                                <span className="text-green-400">{`}`}</span><span className="text-gray-500">;</span>
                                            </motion.div>
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 2.2 }}
                                                className="pt-2"
                                            >
                                                <span className="text-cyan-400">console</span><span className="text-gray-500">.</span><span className="text-indigo-400">log</span><span className="text-gray-500">(</span><span className="text-amber-300">"Ready to build 🚀"</span><span className="text-gray-500">);</span>
                                            </motion.div>
                                            {/* Blinking cursor */}
                                            <motion.span
                                                animate={{ opacity: [1, 0, 1] }}
                                                transition={{ duration: 1, repeat: Infinity }}
                                                className="inline-block w-1.5 h-3.5 bg-cyan-400 ml-0.5 mt-1"
                                            />
                                        </div>
                                    </motion.div>

                                    {/* Laptop base */}
                                    <div className="h-2 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-lg mx-4" />
                                    <div className="h-1 bg-gray-800 rounded-b-lg mx-8" />
                                </div>

                                {/* Decorative items on desk */}
                                <div className="flex items-center justify-between mt-4 px-2">
                                    <div className="flex gap-1">
                                        <div className="w-3 h-3 rounded-sm bg-indigo-600/40 border border-indigo-500/30"></div>
                                        <div className="w-3 h-3 rounded-sm bg-cyan-600/40 border border-cyan-500/30"></div>
                                    </div>
                                    <div className="text-[9px] text-gray-600 font-mono">v2.0.0</div>
                                </div>
                            </div>

                            {/* Speech bubble */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 2.8, duration: 0.5, type: "spring" }}
                                className="absolute -top-8 -right-4 bg-gradient-to-r from-indigo-600/90 to-cyan-600/90 text-white text-lg font-medium rounded-2xl rounded-bl-sm px-5 py-2.5 shadow-lg shadow-cyan-500/20"
                            >
                                Hi there 👋
                                <div className="absolute -bottom-1.5 left-6 w-3 h-3 bg-indigo-600/90 rotate-45" />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Column — Text Content */}
                    <div>
                        <div className="inline-block px-3 py-1 mb-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-mono tracking-wider">
                            ABOUT.ME
                        </div>
                        <h2 className="text-3xl md:text-4xl font-semibold font-heading text-slate-100 mb-6">
                            Engineering Intelligence
                        </h2>
                        <div className="space-y-5 text-base text-gray-400 leading-relaxed">
                            <p>
                                I am an Information Technology student passionate about building intelligent systems, AI-driven applications, and scalable backend architectures.
                            </p>
                            <p>
                                My work combines artificial intelligence with practical systems that create meaningful impact. I thrive at the intersection of complex data problems and clean, performant user interfaces.
                            </p>
                            <p>
                                Whether it's training an ensemble model, architecting a microservice, or crafting a responsive UI — I enjoy solving complex problems and transforming ideas into real-world software solutions.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
