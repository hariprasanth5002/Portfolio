import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 8000;

export function DataCore() {
    const meshRef = useRef<THREE.InstancedMesh>(null!);
    const { viewport } = useThree();
    const mouse = useRef(new THREE.Vector2(0, 0));
    const targetMouse = useRef(new THREE.Vector2(0, 0));

    // Listen for mouse movement
    useEffect(() => {
        const onMouseMove = (event: MouseEvent) => {
            // Normalize mouse coordinates to [-1, 1]
            targetMouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            targetMouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, []);

    // Generate particle starting positions based on a Torus Knot math
    const particles = useMemo(() => {
        const temp = [];
        const color = new THREE.Color();

        // Use an invisible TorusKnot to sample points
        const geometry = new THREE.TorusKnotGeometry(1.8, 0.6, 250, 25);
        geometry.computeBoundingBox();
        const positions = geometry.attributes.position.array;

        // We will distribute particles along the vertices of the TorusKnot
        // and add some random noise
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            // Pick a random vertex from the geometry
            const vertexIndex = Math.floor(Math.random() * (positions.length / 3)) * 3;

            const baseX = positions[vertexIndex];
            const baseY = positions[vertexIndex + 1];
            const baseZ = positions[vertexIndex + 2];

            // Add noise/spread
            const spread = 0.2;
            const x = baseX + (Math.random() - 0.5) * spread;
            const y = baseY + (Math.random() - 0.5) * spread;
            const z = baseZ + (Math.random() - 0.5) * spread;

            // Gradient coloring from blue to deep indigo based on position
            const mixRatio = (x + 3) / 6; // Rough mapping
            color.lerpColors(new THREE.Color("#0ea5e9"), new THREE.Color("#312e81"), mixRatio);

            temp.push({
                baseX, baseY, baseZ,
                x, y, z,
                colorR: color.r,
                colorG: color.g,
                colorB: color.b,
                speed: Math.random() * 0.15 + 0.05,
                offset: Math.random() * Math.PI * 2,
                size: Math.random() * 0.02 + 0.005
            });
        }
        return temp;
    }, []);

    const dummy = useMemo(() => new THREE.Object3D(), []);
    const colorDummy = useMemo(() => new THREE.Color(), []);
    const vec3Dummy = useMemo(() => new THREE.Vector3(), []);

    // Use frame for high-performance animation
    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.elapsedTime;

        // Smooth mouse following
        mouse.current.lerp(targetMouse.current, 0.1);

        // Convert normalized mouse to world coordinates at Z=0 plane
        const mouseWorldX = (mouse.current.x * viewport.width) / 2;
        const mouseWorldY = (mouse.current.y * viewport.height) / 2;
        const mouseWorldDir = new THREE.Vector3(mouseWorldX, mouseWorldY, 0);

        // Rotate the entire core slowly
        meshRef.current.rotation.y = time * 0.15;
        meshRef.current.rotation.x = time * 0.05;

        // Animate each particle
        particles.forEach((p, i) => {
            // Base floating animation
            const floatOffset = Math.sin(time * p.speed + p.offset) * 0.1;

            // Calculate distance to mouse for repulsion effect
            // We need to account for the object's rotation to get correct world position
            vec3Dummy.set(p.baseX, p.baseY, p.baseZ);
            vec3Dummy.applyEuler(meshRef.current.rotation);

            const dx = vec3Dummy.x - mouseWorldX;
            const dy = vec3Dummy.y - mouseWorldY;
            const dz = vec3Dummy.z - 2; // Assume mouse is slightly forward

            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            const maxDist = 3.5;

            let repulsionX = 0;
            let repulsionY = 0;
            let repulsionZ = 0;

            if (dist < maxDist) {
                // The closer the mouse, the stronger the push
                const force = Math.pow(1 - dist / maxDist, 2) * 1.5;
                repulsionX = (dx / dist) * force;
                repulsionY = (dy / dist) * force;
                repulsionZ = (dz / dist) * force;

                // Increase size when repelled
                dummy.scale.setScalar(p.size * (1 + force * 2));
            } else {
                dummy.scale.setScalar(p.size);
            }

            // Restore position slowly using lerp
            p.x = THREE.MathUtils.lerp(p.x, p.baseX + repulsionX, 0.1);
            p.y = THREE.MathUtils.lerp(p.y, p.baseY + floatOffset + repulsionY, 0.1);
            p.z = THREE.MathUtils.lerp(p.z, p.baseZ + repulsionZ, 0.1);

            dummy.position.set(p.x, p.y, p.z);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);

            // Optional: highlight color when perfectly close
            colorDummy.setRGB(p.colorR, p.colorG, p.colorB);
            if (dist < maxDist) {
                colorDummy.lerp(new THREE.Color("#38bdf8"), (1 - dist / maxDist) * 0.6);
            }
            meshRef.current.setColorAt(i, colorDummy);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor) {
            meshRef.current.instanceColor.needsUpdate = true;
        }
    });

    return (
        <instancedMesh
            ref={meshRef}
            args={[undefined, undefined, PARTICLE_COUNT]}
            frustumCulled={false}
            position={[0, 0, -4]}
        >
            <sphereGeometry args={[1, 6, 6]} />
            <meshBasicMaterial
                transparent
                opacity={0.6}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                toneMapped={false}
            />
        </instancedMesh>
    );
}
