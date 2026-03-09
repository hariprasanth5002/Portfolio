"use client";

import { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { ParticleConstellation } from "./ParticleConstellation";

/* ─────────────────────────────────────────────
   SET SCENE BACKGROUND
   ───────────────────────────────────────────── */
function SceneSetup() {
    const { scene } = useThree();
    useEffect(() => {
        scene.background = new THREE.Color("#020617"); // Match page background bg-slate-950
        scene.fog = new THREE.FogExp2("#020617", 0.05);
    }, [scene]);
    return null;
}

/* ═══════════════════════════════════════════════
   MAIN EXPORTED SCENE
   ═══════════════════════════════════════════════ */
export default function HeroScene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 10], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
            style={{ position: "absolute", inset: 0, zIndex: 0 }}
        >
            <SceneSetup />

            {/* Clean Lighting */}
            <ambientLight intensity={0.5} color="#e0e7ff" />

            {/* Developer Production Grade Plexus Network */}
            <ParticleConstellation />

            {/* Crisp bloom for the glowing cyan/indigo connections */}
            <EffectComposer>
                <Bloom
                    luminanceThreshold={0.1}
                    luminanceSmoothing={0.9}
                    intensity={2.0}
                    mipmapBlur
                />
            </EffectComposer>
        </Canvas>
    );
}
