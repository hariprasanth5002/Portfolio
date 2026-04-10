"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaFilePdf, FaTimes } from "react-icons/fa";

export const Contact = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        const form = e.currentTarget;

        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (res.ok) {
                setStatus("success");
                form.reset();
                setTimeout(() => {
                    setIsModalOpen(false);
                    setStatus("idle");
                }, 3000);
            } else {
                setStatus("error");
                setErrorMessage(result.error || "Something went wrong.");
            }
        } catch {
            setStatus("error");
            setErrorMessage("Failed to connect to the server.");
        }
    };

    return (
        <section id="contact" className="py-14 px-6 bg-[#020617] relative overflow-hidden">
            {/* Glow gradient background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-indigo-900/20 via-[#38bdf8]/10 to-[#22c55e]/10 blur-[150px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-[#111827]/80 backdrop-blur-sm rounded-2xl p-8 md:p-14 shadow-2xl border border-gray-800 text-center relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                    <h2 className="text-3xl md:text-5xl font-semibold font-heading text-slate-100 mb-6 tracking-tight">
                        Let's Build Something Great
                    </h2>
                    <p className="text-gray-400 mb-12 max-w-2xl mx-auto text-lg">
                        Feel free to reach out for collaborations, project discussions, or opportunities.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:bg-indigo-500 hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] hover:-translate-y-1 transition-all font-medium"
                        >
                            <FaEnvelope /> Email Me
                        </button>
                        <a
                            href="https://github.com/hariprasanth5002"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-8 py-4 bg-[#020617] text-slate-300 rounded-xl border border-gray-700 hover:border-gray-500 hover:text-white hover:-translate-y-1 transition-all font-medium"
                        >
                            <FaGithub /> GitHub
                        </a>
                        <a
                            href="https://www.linkedin.com/in/hariprasanth-u-a662b7352/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-8 py-4 bg-[#020617] text-slate-300 rounded-xl border border-gray-700 hover:border-[#38bdf8] hover:text-[#38bdf8] hover:-translate-y-1 transition-all font-medium"
                        >
                            <FaLinkedin /> LinkedIn
                        </a>
                        <a
                            href="https://drive.google.com/file/d/1Z73iIxgxFkdyyKNLa7-SGfK2AzqlLmo9/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-8 py-4 bg-[#020617] text-slate-300 rounded-xl border border-gray-700 hover:border-[#22c55e] hover:text-[#22c55e] hover:-translate-y-1 transition-all font-medium"
                        >
                            <FaFilePdf /> Resume
                        </a>
                    </div>

                    {/* Signature Line */}
                    <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.08 }
                                }
                            }}
                            className="flex items-center font-mono text-xl md:text-3xl text-cyan-400 font-medium"
                            style={{ textShadow: "0 0 12px rgba(34,211,238,0.8)" }}
                        >
                            {"code.create.connect".split("").map((char, i) => (
                                <motion.span
                                    key={i}
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.8 },
                                        visible: { opacity: 1, scale: 1 }
                                    }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                            <motion.span
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="ml-0.5"
                            >
                                _
                            </motion.span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Email Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="bg-[#0f172a] border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.15)] rounded-2xl w-full max-w-lg p-6 md:p-8 relative z-10"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                            >
                                <FaTimes className="text-xl" />
                            </button>

                            <h3 className="text-2xl font-bold text-white mb-2">Get In Touch</h3>
                            <p className="text-slate-400 mb-6 text-sm">Fill out the form below and I'll get back to you as soon as possible.</p>

                            {status === "success" ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="py-12 flex flex-col items-center text-center"
                                >
                                    <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mb-4 border border-green-500/30">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-2">Message Sent Successfully</h4>
                                    <p className="text-slate-400">Thank you for reaching out!</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            className="w-full px-4 py-3 bg-[#020617] border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-slate-500 transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            className="w-full px-4 py-3 bg-[#020617] border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-slate-500 transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={4}
                                            className="w-full px-4 py-3 bg-[#020617] border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-slate-500 transition-all resize-none"
                                            placeholder="Your message here..."
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={status === "loading"}
                                        className="w-full py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold rounded-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {status === "loading" ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending...
                                            </>
                                        ) : "Send Message"}
                                    </button>
                                    {status === "error" && (
                                        <p className="text-red-400 text-sm text-center font-medium bg-red-500/10 py-2 rounded-lg border border-red-500/20 px-3">
                                            {errorMessage}
                                        </p>
                                    )}
                                </form>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};
