"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { ParticleConstellation } from "./ParticleConstellation";

function SceneSetup() {
    const { scene } = useThree();
    useEffect(() => {
        scene.background = new THREE.Color("#020617");
        scene.fog = new THREE.FogExp2("#020617", 0.025);
    }, [scene]);
    return null;
}

function CameraParallax() {
    const { camera, pointer } = useThree();
    useFrame((_, delta) => {
        camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.65, 2.2, delta);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, pointer.y * 0.38, 2.2, delta);
        camera.lookAt(0, 0, 0);
    });
    return null;
}

function NeuralCore() {
    const group = useRef<THREE.Group>(null);
    const inner = useRef<THREE.Mesh>(null);
    const ringA = useRef<THREE.Mesh>(null);
    const ringB = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (!group.current || !inner.current || !ringA.current || !ringB.current) return;
        const t = state.clock.elapsedTime;
        group.current.rotation.y += delta * 0.12;
        group.current.rotation.x = Math.sin(t * 0.22) * 0.12;
        inner.current.scale.setScalar(1 + Math.sin(t * 1.15) * 0.035);
        ringA.current.rotation.x += delta * 0.16;
        ringA.current.rotation.y += delta * 0.11;
        ringB.current.rotation.x -= delta * 0.12;
        ringB.current.rotation.z += delta * 0.17;
    });

    return (
        <group ref={group} position={[4.8, -0.1, -2.8]} scale={1.12}>
            <mesh ref={inner}>
                <icosahedronGeometry args={[1.05, 2]} />
                <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.42} />
            </mesh>
            <mesh>
                <icosahedronGeometry args={[0.76, 1]} />
                <meshBasicMaterial color="#4f46e5" wireframe transparent opacity={0.26} />
            </mesh>
            <mesh ref={ringA}>
                <torusGeometry args={[1.48, 0.008, 8, 120]} />
                <meshBasicMaterial color="#22d3ee" transparent opacity={0.65} />
            </mesh>
            <mesh ref={ringB} rotation={[1.1, 0.4, 0.2]}>
                <torusGeometry args={[1.72, 0.006, 8, 120]} />
                <meshBasicMaterial color="#818cf8" transparent opacity={0.5} />
            </mesh>
            <pointLight color="#06b6d4" intensity={2.2} distance={5} />
        </group>
    );
}

export default function HeroScene() {
    const [reducedMotion, setReducedMotion] = [false, () => {}] as const;
    return (
        <Canvas
            camera={{ position: [0, 0, 10], fov: 45 }}
            dpr={[1, 1.35]}
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.15 }}
            style={{ position: "absolute", inset: 0, zIndex: 0 }}
            fallback={<div className="absolute inset-0 bg-[#020617]" />}
        >
            <SceneSetup />
            <CameraParallax />
            <ambientLight intensity={0.35} color="#c7d2fe" />
            <Stars radius={70} depth={35} count={850} factor={2.2} saturation={0.35} fade speed={0.25} />
            <Sparkles count={65} scale={[18, 10, 9]} size={1.7} speed={0.18} opacity={0.48} color="#38bdf8" />
            <NeuralCore />
            <ParticleConstellation />
            <EffectComposer multisampling={0}>
                <Bloom luminanceThreshold={0.22} luminanceSmoothing={0.85} intensity={1.05} mipmapBlur />
            </EffectComposer>
        </Canvas>
    );
}
