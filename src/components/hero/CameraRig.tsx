import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function CameraRig() {
    useFrame((state, delta) => {
        // Calculate target position based on mouse pointer
        // state.pointer consists of normalized device coordinates (-1 to +1)
        const targetX = state.pointer.x * 3.5;
        const targetY = state.pointer.y * 3.5 + 1.5; // slight elevation
        const targetZ = 8.5 + Math.abs(state.pointer.x) * 1.5; // move back slightly on edges

        // Smoothly interpolate camera position
        state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetX, 4, delta);
        state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetY, 4, delta);
        state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetZ, 4, delta);

        // Keep looking at the center
        state.camera.lookAt(0, 0, 0);
    });

    return null;
}
