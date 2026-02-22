import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Html, PerspectiveCamera, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useSnapshot } from 'valtio';
import { state } from '../../state';
import ScreenUI from './ScreenUI';

const CameraHandler = () => {
    const snap = useSnapshot(state);
    const { camera } = useThree();
    const targetPos = new THREE.Vector3(...snap.cameraPosition);
    const targetLookAt = new THREE.Vector3(...snap.cameraTarget);

    useFrame((s, delta) => {
        // Smoothly LERP camera position
        camera.position.lerp(targetPos, 0.05);

        // Smoothly LERP camera lookAt target
        // We use a dummy object to interpolate the lookAt target
        const currentTarget = new THREE.Vector3(0, 0, 0);
        camera.getWorldDirection(currentTarget);
        // This is a bit complex for manual LERP, so we'll use a simpler approach:
        // We interpolate a "lookAt" vector and call camera.lookAt every frame
        if (!snap.isTransitioning) {
            // Subtle breathing effect when not zoomed
            if (snap.currentSection === 'desktop') {
                const t = s.clock.getElapsedTime();
                camera.position.y += Math.sin(t * 0.5) * 0.001;
            }
        }

        // For cinematic feel, we always look at the target
        // In a real Henry-style repo, we might LERP the target vector itself
        const tempTarget = new THREE.Vector3().set(...snap.cameraTarget);
        camera.lookAt(tempTarget);
    });

    return null;
};

const Monitor = () => {
    const snap = useSnapshot(state);
    const { scene } = useGLTF('/retro_desk.glb');
    const screenRef = useRef();

    useEffect(() => {
        scene.scale.set(15, 15, 15);
        scene.position.set(0, -1.5, 0);

        // Center the model
        const box = new THREE.Box3().setFromObject(scene);
        const center = box.getCenter(new THREE.Vector3());
        scene.position.x -= center.x;
        scene.position.z -= center.z;

        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    }, [scene]);

    const handleMonitorClick = (e) => {
        e.stopPropagation();
        if (state.currentSection === 'desktop') {
            state.currentSection = 'monitor';
            state.cameraPosition = [0, 0.85, 1.1];
            state.cameraTarget = [0, 0.85, -0.1];
        }
    };

    return (
        <group dispose={null}>
            <primitive object={scene} />

            {/* Raycasting target for the monitor */}
            <mesh
                position={[0, 0.85, -0.05]}
                rotation={[-0.05, 0, 0]}
                onClick={handleMonitorClick}
                onPointerOver={() => {
                    if (snap.currentSection === 'desktop') document.body.style.cursor = 'pointer';
                }}
                onPointerOut={() => {
                    document.body.style.cursor = 'auto';
                }}
            >
                <planeGeometry args={[0.75, 0.55]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>

            {/* The HTML Screen */}
            <group position={[0, 0.85, -0.1]} rotation={[-0.05, 0, 0]}>
                <Html
                    transform
                    occlude
                    distanceFactor={0.5}
                    position={[0, 0, 0.01]}
                    style={{
                        width: '1200px',
                        height: '947px',
                        backgroundColor: '#000',
                        overflow: 'hidden',
                        pointerEvents: snap.currentSection === 'monitor' ? 'auto' : 'none',
                        transition: 'opacity 0.5s ease',
                    }}
                >
                    <ScreenUI />
                </Html>
            </group>
        </group>
    );
};

const DeskScene = () => {
    const snap = useSnapshot(state);

    return (
        <div style={{ width: '100vw', height: '100vh', background: '#050505', position: 'relative' }}>
            {snap.currentSection === 'monitor' && (
                <button
                    onClick={() => {
                        state.currentSection = 'desktop';
                        state.cameraPosition = [0, 1.5, 5];
                        state.cameraTarget = [0, 0.8, 0];
                    }}
                    style={{
                        position: 'absolute',
                        bottom: '40px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1000,
                        padding: '12px 24px',
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '30px',
                        cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: '600',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
                    onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                >
                    Exit View
                </button>
            )}

            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 1.5, 5]} fov={35} />

                <CameraHandler />

                <Suspense fallback={null}>
                    <Environment preset="city" />

                    <group position={[0, 0, 0]}>
                        <Monitor />
                    </group>

                    <ambientLight intensity={0.5} />
                    <spotLight
                        position={[10, 10, 10]}
                        angle={0.15}
                        penumbra={1}
                        intensity={1}
                        castShadow
                    />

                    <ContactShadows
                        position={[0, -1.5, 0]}
                        opacity={0.4}
                        scale={20}
                        blur={2.5}
                        far={4}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default DeskScene;
