"use client";

import { Environment, Float, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { memo, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type RingSceneProps = {
  className?: string;
};

useGLTF.preload("/diamond_engagement_ring.glb");

function RingMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const zoomRef = useRef(0);
  const scaleTarget = useMemo(() => new THREE.Vector3(1, 1, 1), []);
  const { camera, size } = useThree();
  const isMobile = size.width < 768;
  const { scene } = useGLTF("/diamond_engagement_ring.glb");

  useEffect(() => {
    const onZoom = (event: Event) => {
      zoomRef.current = (event as CustomEvent<number>).detail ?? 0;
    };

    window.addEventListener("ring-zoom", onZoom);
    return () => {
      window.removeEventListener("ring-zoom", onZoom);
    };
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const zoom = zoomRef.current;
    const targetScale = isMobile ? 0.82 : 1.05 + zoom * 0.28;
    scaleTarget.set(targetScale, targetScale, targetScale);
    groupRef.current.scale.lerp(scaleTarget, 0.05);
    groupRef.current.rotation.y += delta * 0.16;
    groupRef.current.rotation.x = 0.1;
    groupRef.current.rotation.z = 0.3;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, isMobile ? 6.15 - zoom * 0.34 : 5.15 - zoom * 0.58, 0.04);
    camera.lookAt(0, 0, 0);
  });

  return (
    <Float speed={0.35} rotationIntensity={0} floatIntensity={0.82}>
      <group ref={groupRef} position={[isMobile ? 0 : 3.2, 0.5, -0.1]} rotation={[1.1, -1.3, 0.8]}>
        <primitive object={scene} />
      </group>
    </Float>
  );
}

function RingScene({ className = "" }: RingSceneProps) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 38 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 1.25]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.55} />
        <spotLight position={[-3, 4, 5]} angle={0.42} penumbra={1} intensity={4.2} color="#f4e2bf" />
        <spotLight position={[4, -2, 3]} angle={0.34} penumbra={1} intensity={1.2} color="#c7a06a" />
        <RingMesh />
        <Environment preset="studio" background={false} />
      </Canvas>
    </div>
  );
}

export default memo(RingScene);
