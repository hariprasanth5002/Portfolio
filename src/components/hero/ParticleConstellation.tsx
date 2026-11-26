"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 185;
const MAX_DISTANCE = 2.35;
const MOUSE_RADIUS = 2.8;
const MAX_LINES = 2600;

type Particle = { x: number; y: number; z: number; bx: number; by: number; bz: number; vx: number; vy: number; vz: number };

export function ParticleConstellation() {
    const pointsRef = useRef<THREE.Points>(null!);
    const linesRef = useRef<THREE.LineSegments>(null!);
    const { viewport, size } = useThree();
    const mouse = useRef(new THREE.Vector2(-100, -100));
    const targetMouse = useRef(new THREE.Vector2(-100, -100));

    useEffect(() => {
        const onMove = (event: PointerEvent) => {
            targetMouse.current.set(
                (event.clientX / window.innerWidth) * 2 - 1,
                -(event.clientY / window.innerHeight) * 2 + 1
            );
        };
        const onLeave = () => targetMouse.current.set(-100, -100);
        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("blur", onLeave);
        return () => {
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("blur", onLeave);
        };
    }, []);

    const particles = useMemo<Particle[]>(() => Array.from({ length: PARTICLE_COUNT }, () => {
        const x = (Math.random() - 0.5) * 23;
        const y = (Math.random() - 0.5) * 13;
        const z = (Math.random() - 0.5) * 8 - 2;
        return { x, y, z, bx: x, by: y, bz: z, vx: (Math.random() - 0.5) * 0.12, vy: (Math.random() - 0.5) * 0.12, vz: (Math.random() - 0.5) * 0.08 };
    }), []);

    const buffers = useMemo(() => ({
        points: new Float32Array(PARTICLE_COUNT * 3),
        pointColors: new Float32Array(PARTICLE_COUNT * 3),
        lines: new Float32Array(MAX_LINES * 6),
        lineColors: new Float32Array(MAX_LINES * 6),
    }), []);

    const cyan = useMemo(() => new THREE.Color("#22d3ee"), []);
    const violet = useMemo(() => new THREE.Color("#6366f1"), []);
    const white = useMemo(() => new THREE.Color("#e0f2fe"), []);
    const colorA = useMemo(() => new THREE.Color(), []);
    const colorB = useMemo(() => new THREE.Color(), []);

    useFrame((_, delta) => {
        if (!pointsRef.current || !linesRef.current) return;
        const dt = Math.min(delta, 0.033);
        mouse.current.lerp(targetMouse.current, 1 - Math.exp(-dt * 5));
        const mx = mouse.current.x * viewport.width * 0.5;
        const my = mouse.current.y * viewport.height * 0.5;
        const radiusSq = MOUSE_RADIUS * MOUSE_RADIUS;
        let lineIndex = 0;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const p = particles[i];
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.z += p.vz * dt;

            if (p.x < -12 || p.x > 12) p.vx *= -1;
            if (p.y < -7 || p.y > 7) p.vy *= -1;
            if (p.z < -8 || p.z > 2) p.vz *= -1;

            const dx = p.x - mx;
            const dy = p.y - my;
            const d2 = dx * dx + dy * dy + p.z * p.z * 0.12;
            let influence = 0;
            if (d2 < radiusSq) {
                influence = 1 - Math.sqrt(d2) / MOUSE_RADIUS;
                const push = influence * dt * 1.9;
                p.x += dx * push;
                p.y += dy * push;
            } else {
                p.x += (p.bx - p.x) * dt * 0.035;
                p.y += (p.by - p.y) * dt * 0.035;
            }

            const mix = THREE.MathUtils.clamp((p.x + 12) / 24, 0, 1);
            colorA.copy(cyan).lerp(violet, mix).lerp(white, influence * 0.8);
            const k = i * 3;
            buffers.points[k] = p.x;
            buffers.points[k + 1] = p.y;
            buffers.points[k + 2] = p.z;
            buffers.pointColors[k] = colorA.r;
            buffers.pointColors[k + 1] = colorA.g;
            buffers.pointColors[k + 2] = colorA.b;

            for (let j = i + 1; j < PARTICLE_COUNT && lineIndex < MAX_LINES; j++) {
                const q = particles[j];
                const lx = p.x - q.x;
                const ly = p.y - q.y;
                const lz = p.z - q.z;
                const distSq = lx * lx + ly * ly + lz * lz;
                if (distSq > MAX_DISTANCE * MAX_DISTANCE) continue;

                const alpha = 1 - Math.sqrt(distSq) / MAX_DISTANCE;
                const offset = lineIndex * 6;
                buffers.lines[offset] = p.x;
                buffers.lines[offset + 1] = p.y;
                buffers.lines[offset + 2] = p.z;
                buffers.lines[offset + 3] = q.x;
                buffers.lines[offset + 4] = q.y;
                buffers.lines[offset + 5] = q.z;

                const qMix = THREE.MathUtils.clamp((q.x + 12) / 24, 0, 1);
                colorB.copy(cyan).lerp(violet, qMix);
                buffers.lineColors[offset] = colorA.r * alpha;
                buffers.lineColors[offset + 1] = colorA.g * alpha;
                buffers.lineColors[offset + 2] = colorA.b * alpha;
                buffers.lineColors[offset + 3] = colorB.r * alpha;
                buffers.lineColors[offset + 4] = colorB.g * alpha;
                buffers.lineColors[offset + 5] = colorB.b * alpha;
                lineIndex++;
            }
        }

        const pointGeometry = pointsRef.current.geometry;
        const lineGeometry = linesRef.current.geometry;
        (pointGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
        (pointGeometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;
        lineGeometry.setDrawRange(0, lineIndex * 2);
        (lineGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
        (lineGeometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;
        pointsRef.current.rotation.y += dt * 0.025;
        linesRef.current.rotation.y = pointsRef.current.rotation.y;
        pointsRef.current.rotation.x = Math.sin(performance.now() * 0.00012) * 0.025;
        linesRef.current.rotation.x = pointsRef.current.rotation.x;
    });

    return (
        <group position={[0, 0, -4]}>
            <lineSegments ref={linesRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={MAX_LINES * 2} args={[buffers.lines, 3]} />
                    <bufferAttribute attach="attributes-color" count={MAX_LINES * 2} args={[buffers.lineColors, 3]} />
                </bufferGeometry>
                <lineBasicMaterial vertexColors transparent opacity={0.72} depthWrite={false} blending={THREE.AdditiveBlending} />
            </lineSegments>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} args={[buffers.points, 3]} />
                    <bufferAttribute attach="attributes-color" count={PARTICLE_COUNT} args={[buffers.pointColors, 3]} />
                </bufferGeometry>
                <pointsMaterial size={size.width < 640 ? 0.075 : 0.09} vertexColors transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} sizeAttenuation />
            </points>
        </group>
    );
}
