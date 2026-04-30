"use client";

import { Environment, Float } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { memo, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type RingSceneProps = {
  className?: string;
};

function RingMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const zoomRef = useRef(0);
  const scaleTarget = useMemo(() => new THREE.Vector3(1, 1, 1), []);
  const { camera, size } = useThree();
  const isMobile = size.width < 768;

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#d8b77c"),
        metalness: 1,
        roughness: 0.2,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        envMapIntensity: 1.35
      }),
    []
  );

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    const onZoom = (event: Event) => {
      zoomRef.current = (event as CustomEvent<number>).detail ?? 0;
    };

    window.addEventListener("ring-zoom", onZoom);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
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
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, pointer.current.y * 0.1, 0.035);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -0.42 + pointer.current.x * 0.06, 0.035);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, isMobile ? 6.15 - zoom * 0.34 : 5.15 - zoom * 0.58, 0.04);
    camera.lookAt(0, 0, 0);
  });

  return (
    <Float speed={0.85} rotationIntensity={0.08} floatIntensity={0.12}>
      <group ref={groupRef} position={[isMobile ? 0 : -0.62, 0, 0]} rotation={[0.28, 0.36, -0.42]}>
        <mesh material={material}>
          <torusGeometry args={[1.25, 0.12, isMobile ? 32 : 48, isMobile ? 80 : 128]} />
        </mesh>
        <mesh position={[0.95, 0.88, 0.02]} rotation={[0.28, 0, 0]} material={material}>
          <octahedronGeometry args={[0.34, 1]} />
        </mesh>
        <mesh position={[0.63, 0.62, 0]} material={material}>
          <boxGeometry args={[0.38, 0.08, 0.08]} />
        </mesh>
        <mesh position={[1.24, 0.62, 0]} material={material}>
          <boxGeometry args={[0.38, 0.08, 0.08]} />
        </mesh>
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
