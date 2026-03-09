"use client";

import { motion, Variants } from "framer-motion";

export const CodeSignature = () => {
    const phrase = "code.create.connect";
    const characters = Array.from(phrase);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const charVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <section className="relative py-20 px-6 overflow-hidden">
            <div className="max-w-[900px] mx-auto flex items-center justify-center text-center">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex items-center justify-center flex-wrap"
                >
                    {characters.map((char, index) => (
                        <motion.span
                            key={index}
                            variants={charVariants}
                            className="text-[38px] md:text-[48px] font-semibold tracking-wider text-cyan-500"
                            style={{
                                textShadow: "0 0 10px rgba(34,211,238,0.8), 0 0 20px rgba(34,211,238,0.5)",
                                fontFamily: "var(--font-space-grotesk), sans-serif",
                                marginRight: char === " " ? "0.5rem" : "0",
                            }}
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}

                    {/* Blinking Underscore Cursor */}
                    <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="text-[28px] md:text-[36px] font-semibold text-cyan-400 ml-1"
                        style={{
                            textShadow: "0 0 10px rgba(34,211,238,0.8), 0 0 20px rgba(34,211,238,0.5)",
                        }}
                    >
                        _
                    </motion.span>
                </motion.div>
            </div>
        </section>
    );
};
