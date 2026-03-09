"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ────────────────────────────────────────────────────────
// Developer Production Grade "Plexus" Interactive Constellation
// ────────────────────────────────────────────────────────
export function ParticleConstellation() {
    const pointsRef = useRef<THREE.Points>(null!);
    const linesRef = useRef<THREE.LineSegments>(null!);
    const { viewport } = useThree();

    const PARTICLE_COUNT = 300;
    const MAX_DISTANCE = 2.5; // Max distance to draw a line between nodes
    const MOUSE_RADIUS = 3.5; // distance mouse affects particles

    const mouse = useRef(new THREE.Vector2(-1000, -1000));
    const targetMouse = useRef(new THREE.Vector2(-1000, -1000));

    // Listen for mouse movement
    useEffect(() => {
        const onMouseMove = (event: MouseEvent) => {
            targetMouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            targetMouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        const onMouseLeave = () => {
            targetMouse.current.set(-1000, -1000); // Send mouse away
        };
        window.addEventListener("mousemove", onMouseMove);
        document.body.addEventListener("mouseleave", onMouseLeave);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            document.body.removeEventListener("mouseleave", onMouseLeave);
        };
    }, []);

    // Generate initial particle properties
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            // Distribute in a wide 3D space
            const x = (Math.random() - 0.5) * 25;
            const y = (Math.random() - 0.5) * 15;
            const z = (Math.random() - 0.5) * 10 - 2;

            temp.push({
                x, y, z,
                baseX: x, baseY: y, baseZ: z,
                vx: (Math.random() - 0.5) * 0.01,
                vy: (Math.random() - 0.5) * 0.01,
                vz: (Math.random() - 0.5) * 0.01,
            });
        }
        return temp;
    }, []);

    // Pre-allocate geometry arrays for lines and points
    // Max lines = PARTICLE_COUNT * (PARTICLE_COUNT - 1) / 2
    // We'll allocate a safe upper bound
    const maxLineCount = 3000;
    const linePositions = useMemo(() => new Float32Array(maxLineCount * 6), []);
    const lineColors = useMemo(() => new Float32Array(maxLineCount * 6), []);

    const pointPositions = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), []);
    const pointColors = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), []);

    const cyanColor = new THREE.Color("#22d3ee");
    const indigoColor = new THREE.Color("#4f46e5");
    const mouseColor = new THREE.Color("#ffffff");

    // Reusable vector for calculations
    const vec3Dummy = useMemo(() => new THREE.Vector3(), []);

    useFrame(() => {
        if (!pointsRef.current || !linesRef.current) return;

        // Smoothly interpolate mouse target
        mouse.current.lerp(targetMouse.current, 0.1);

        // Convert normalized mouse to world coords
        const mouseWorldX = (mouse.current.x * viewport.width) / 2;
        const mouseWorldY = (mouse.current.y * viewport.height) / 2;

        let lineIndex = 0;

        // 1. Update Particle Positions and Point Array
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const p = particles[i];

            // Slowly move points
            p.x += p.vx;
            p.y += p.vy;
            p.z += p.vz;

            // Bounce off invisible walls to keep them moving
            if (p.x < -15 || p.x > 15) p.vx *= -1;
            if (p.y < -10 || p.y > 10) p.vy *= -1;
            if (p.z < -10 || p.z > 5) p.vz *= -1;

            // Mouse Repulsion & Attraction
            const dxMouse = p.x - mouseWorldX;
            const dyMouse = p.y - mouseWorldY;
            // Assume mouse is at z=0 for interaction
            const dzMouse = p.z - 0;
            const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse + dzMouse * dzMouse);

            // Interpolated color based on position
            vec3Dummy.set(p.x, p.y, p.z);
            let pColor = cyanColor.clone().lerp(indigoColor, (p.x + 15) / 30);

            if (distMouse < MOUSE_RADIUS) {
                // Gently push particles away from cursor while highlighting them
                const force = (MOUSE_RADIUS - distMouse) / MOUSE_RADIUS;
                p.x += (dxMouse / distMouse) * force * 0.05;
                p.y += (dyMouse / distMouse) * force * 0.05;

                // Glow white when mouse is close
                pColor.lerp(mouseColor, force);
            } else {
                // Gently pull back to base constraint if drifting too far from 0
                p.x += (p.baseX - p.x) * 0.001;
                p.y += (p.baseY - p.y) * 0.001;
            }

            // Write point position
            pointPositions[i * 3] = p.x;
            pointPositions[i * 3 + 1] = p.y;
            pointPositions[i * 3 + 2] = p.z;

            // Write point color
            pointColors[i * 3] = pColor.r;
            pointColors[i * 3 + 1] = pColor.g;
            pointColors[i * 3 + 2] = pColor.b;

            // 2. Calculate Lines Between Nearby Particles
            for (let j = i + 1; j < PARTICLE_COUNT; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dz = p.z - p2.z;
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (dist < MAX_DISTANCE && lineIndex < maxLineCount) {
                    // Line exists. Calculate its opacity/color based on distance
                    const alpha = 1.0 - (dist / MAX_DISTANCE);

                    // We can bake opacity into the RGB color for LineBasicMaterial
                    // by multiplying the base color by alpha (essentially an additive blend effect)
                    // If we use transparent line material with vertex colors, ThreeJS allows this.

                    linePositions[lineIndex * 6] = p.x;
                    linePositions[lineIndex * 6 + 1] = p.y;
                    linePositions[lineIndex * 6 + 2] = p.z;
                    linePositions[lineIndex * 6 + 3] = p2.x;
                    linePositions[lineIndex * 6 + 4] = p2.y;
                    linePositions[lineIndex * 6 + 5] = p2.z;

                    // Color node 1
                    lineColors[lineIndex * 6] = pColor.r * alpha;
                    lineColors[lineIndex * 6 + 1] = pColor.g * alpha;
                    lineColors[lineIndex * 6 + 2] = pColor.b * alpha;

                    // Color node 2
                    let p2Color = cyanColor.clone().lerp(indigoColor, (p2.x + 15) / 30);
                    // Also check if node 2 is near mouse purely for the line gradient
                    const d2Mouse = Math.sqrt(Math.pow(p2.x - mouseWorldX, 2) + Math.pow(p2.y - mouseWorldY, 2) + Math.pow(p2.z, 2));
                    if (d2Mouse < MOUSE_RADIUS) {
                        p2Color.lerp(mouseColor, (MOUSE_RADIUS - d2Mouse) / MOUSE_RADIUS);
                    }

                    lineColors[lineIndex * 6 + 3] = p2Color.r * alpha;
                    lineColors[lineIndex * 6 + 4] = p2Color.g * alpha;
                    lineColors[lineIndex * 6 + 5] = p2Color.b * alpha;

                    lineIndex++;
                }
            }
        }

        // 3. Update Buffers
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
        pointsRef.current.geometry.attributes.color.needsUpdate = true;

        linesRef.current.geometry.setDrawRange(0, lineIndex * 2);
        linesRef.current.geometry.attributes.position.needsUpdate = true;
        linesRef.current.geometry.attributes.color.needsUpdate = true;

        // Very slow global rotation applied to the groups
        pointsRef.current.rotation.y += 0.001;
        linesRef.current.rotation.y += 0.001;
        pointsRef.current.rotation.x = Math.sin(Date.now() * 0.0001) * 0.05;
        linesRef.current.rotation.x = Math.sin(Date.now() * 0.0001) * 0.05;
    });

    return (
        <group position={[0, 0, -5]}>
            {/* Draw the connecting lines */}
            <lineSegments ref={linesRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={maxLineCount * 2} args={[linePositions, 3]} />
                    <bufferAttribute attach="attributes-color" count={maxLineCount * 2} args={[lineColors, 3]} />
                </bufferGeometry>
                <lineBasicMaterial vertexColors transparent depthWrite={false} blending={THREE.AdditiveBlending} />
            </lineSegments>

            {/* Draw the node points */}
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} args={[pointPositions, 3]} />
                    <bufferAttribute attach="attributes-color" count={PARTICLE_COUNT} args={[pointColors, 3]} />
                </bufferGeometry>
                <pointsMaterial size={0.08} vertexColors transparent depthWrite={false} blending={THREE.AdditiveBlending} sizeAttenuation={true} />
            </points>
        </group>
    );
}
