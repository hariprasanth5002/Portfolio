import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function ParticleNetwork({ count = 1500 }: { count?: number }) {
    const meshRef = useRef<THREE.InstancedMesh>(null!);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const distance = Math.random() * 25 + 5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            const x = distance * Math.sin(phi) * Math.cos(theta);
            const y = distance * Math.sin(phi) * Math.sin(theta) * 0.6; // flatten vertically
            const z = distance * Math.cos(phi);

            temp.push({
                x, y, z,
                speed: Math.random() * 0.3 + 0.05,
                scale: Math.random() * 0.04 + 0.01,
                angle: Math.random() * Math.PI * 2,
                baseY: y
            });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.elapsedTime;

        // Mouse-based parallax rotation (subtle)
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
            meshRef.current.rotation.y,
            mouse.current.x * 0.3 + time * 0.02,
            0.03
        );
        meshRef.current.rotation.x = THREE.MathUtils.lerp(
            meshRef.current.rotation.x,
            -mouse.current.y * 0.2,
            0.03
        );

        particles.forEach((p, i) => {
            p.y = p.baseY + Math.sin(time * p.speed + p.angle) * 0.3;

            dummy.position.set(p.x, p.y, p.z);
            dummy.scale.setScalar(p.scale);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial
                color="#22d3ee"
                transparent
                opacity={0.5}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </instancedMesh>
    );
}
