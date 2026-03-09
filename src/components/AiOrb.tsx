"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const AiOrb = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoverState, setHoverState] = useState<"idle" | "button" | "project">("idle");
    const [velocity, setVelocity] = useState(0);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring-based follow
    const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

    useEffect(() => {
        let prevX = 0;
        let prevY = 0;
        let prevTime = Date.now();

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            // Calculate velocity for ripple effect
            const now = Date.now();
            const dt = now - prevTime || 1;
            const dx = e.clientX - prevX;
            const dy = e.clientY - prevY;
            const v = Math.sqrt(dx * dx + dy * dy) / dt;
            setVelocity(Math.min(v * 5, 1)); // Normalize 0–1
            prevX = e.clientX;
            prevY = e.clientY;
            prevTime = now;
        };

        // Detect hover targets
        const handleHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isButton = !!target.closest("a, button");
            const isProject = !!target.closest("[data-project]");

            if (isProject) setHoverState("project");
            else if (isButton) setHoverState("button");
            else setHoverState("idle");
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleHover);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleHover);
        };
    }, [mouseX, mouseY]);

    // Determine orb visual state
    const orbSize = hoverState === "button" ? 56 : hoverState === "project" ? 64 : 48;
    const glowOpacity = hoverState === "button" ? 0.7 : hoverState === "project" ? 0.55 : 0.4;
    const pulseScale = velocity > 0.3 ? 1.4 : 1;

    return (
        <motion.div
            ref={containerRef}
            className="pointer-events-none fixed top-0 left-0 z-[60]"
            style={{
                x: springX,
                y: springY,
                translateX: "-50%",
                translateY: "-50%",
            }}
        >
            {/* Outer glow ring */}
            <motion.div
                className="absolute rounded-full"
                animate={{
                    width: orbSize * 3,
                    height: orbSize * 3,
                    opacity: glowOpacity * 0.3,
                    scale: pulseScale,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                style={{
                    left: "50%",
                    top: "50%",
                    translateX: "-50%",
                    translateY: "-50%",
                    background: "radial-gradient(circle, rgba(6,182,212,0.25) 0%, rgba(99,102,241,0.1) 50%, transparent 70%)",
                    filter: "blur(20px)",
                }}
            />

            {/* Mid glow */}
            <motion.div
                className="absolute rounded-full"
                animate={{
                    width: orbSize * 1.8,
                    height: orbSize * 1.8,
                    opacity: glowOpacity * 0.6,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                style={{
                    left: "50%",
                    top: "50%",
                    translateX: "-50%",
                    translateY: "-50%",
                    background: "radial-gradient(circle, rgba(6,182,212,0.4) 0%, rgba(99,102,241,0.2) 60%, transparent 80%)",
                    filter: "blur(12px)",
                }}
            />

            {/* Core orb */}
            <motion.div
                className="rounded-full border border-cyan-400/30"
                animate={{
                    width: orbSize,
                    height: orbSize,
                    opacity: glowOpacity,
                    rotate: hoverState === "project" ? 360 : 0,
                }}
                transition={{
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                    default: { type: "spring", stiffness: 200, damping: 20 },
                }}
                style={{
                    left: "50%",
                    top: "50%",
                    translateX: "-50%",
                    translateY: "-50%",
                    position: "absolute",
                    background: "radial-gradient(circle at 35% 35%, rgba(6,182,212,0.8), rgba(99,102,241,0.6) 60%, rgba(34,197,94,0.2) 100%)",
                    boxShadow: `0 0 ${orbSize}px rgba(6,182,212,${glowOpacity * 0.5}), inset 0 0 ${orbSize / 2}px rgba(255,255,255,0.1)`,
                }}
            />

            {/* Idle Pulse Ring */}
            {hoverState === "idle" && (
                <motion.div
                    className="absolute rounded-full border border-cyan-400/20"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        width: orbSize,
                        height: orbSize,
                        left: "50%",
                        top: "50%",
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                />
            )}
        </motion.div>
    );
};
