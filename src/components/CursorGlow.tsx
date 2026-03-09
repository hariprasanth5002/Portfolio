"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const TechCursor = () => {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        const move = (e: MouseEvent) => {
            setPos({ x: e.clientX, y: e.clientY });
        };

        const down = () => setClicked(true);
        const up = () => setClicked(false);

        window.addEventListener("mousemove", move);
        window.addEventListener("mousedown", down);
        window.addEventListener("mouseup", up);

        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mousedown", down);
            window.removeEventListener("mouseup", up);
        };
    }, []);

    return (
        <>
            {/* outer ring */}
            <motion.div
                className="pointer-events-none fixed z-50 border border-cyan-400 rounded-full"
                animate={{
                    x: pos.x - 14,
                    y: pos.y - 14,
                    scale: clicked ? 0.8 : 1
                }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30
                }}
                style={{
                    width: 28,
                    height: 28,
                    boxShadow: "0 0 12px rgba(34,211,238,0.7)"
                }}
            />

            {/* center dot */}
            <motion.div
                className="pointer-events-none fixed z-50 bg-cyan-400 rounded-full"
                animate={{
                    x: pos.x - 3,
                    y: pos.y - 3,
                    scale: clicked ? 0.7 : 1
                }}
                transition={{
                    type: "spring",
                    stiffness: 600,
                    damping: 35
                }}
                style={{
                    width: 6,
                    height: 6,
                    boxShadow: "0 0 10px rgba(34,211,238,0.8)"
                }}
            />
        </>
    );
};