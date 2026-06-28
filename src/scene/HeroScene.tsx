import { Suspense, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Stars, AdaptiveDpr } from "@react-three/drei"
import * as THREE from "three"
import { CloudIsland } from "./CloudIsland"
import { FloatingClouds } from "./FloatingClouds"
import { CloudParticles } from "./CloudParticles"
import { Robot } from "./Robot"
import { FlyingDrones } from "./FlyingDrones"

function CameraRig({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree()
  const targetPos = useRef(new THREE.Vector3(0, 1.5, 7))
  const targetLook = useRef(new THREE.Vector3(0, 0, 0))

  useFrame((state) => {
    const t = state.clock.elapsedTime

    // Gentle idle camera sway
    const idleX = Math.sin(t * 0.2) * 0.2
    const idleY = Math.cos(t * 0.15) * 0.1

    // Scroll-driven pull back
    targetPos.current.set(
      idleX,
      1.5 + idleY - scrollProgress * 2,
      7 - scrollProgress * 3
    )
    targetLook.current.set(0, 0 - scrollProgress * 1.5, 0)

    camera.position.lerp(targetPos.current, 0.03)
    const lerpLook = new THREE.Vector3().lerpVectors(
      new THREE.Vector3(0, 0, 0),
      targetLook.current,
      0.03
    )
    camera.lookAt(lerpLook)
  })

  return null
}

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.3} color="#1a3a6a" />
      <directionalLight
        position={[10, 20, 5]}
        intensity={1.2}
        color="#c8e0ff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      {/* Sun rays */}
      <pointLight position={[8, 15, -10]} intensity={1.5} color="#80c0ff" distance={60} />
      {/* Rim light */}
      <pointLight position={[-10, 5, 5]} intensity={0.5} color="#4080ff" distance={30} />
      {/* Ambient cyan bounce */}
      <hemisphereLight args={["#1a3a8a", "#0a1530", 0.4]} />
    </>
  )
}

function SceneContent() {
  return (
    <>
      <SceneLighting />
      <fog attach="fog" args={["#060d20", 20, 70]} />
      <Stars radius={80} depth={50} count={3000} factor={3} fade speed={0.5} />
      <CloudParticles />
      <FloatingClouds />
      <CloudIsland />
      <Robot position={[0, 0.15, 0]} />
      <FlyingDrones />
    </>
  )
}

interface HeroSceneProps {
  scrollProgress: number
}

export function HeroScene({ scrollProgress }: HeroSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 7], fov: 60, near: 0.1, far: 200 }}
      shadows
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      style={{ background: "#06091a" }}
    >
      <AdaptiveDpr pixelated />
      <Suspense fallback={null}>
        <SceneContent />
        <CameraRig scrollProgress={scrollProgress} />
      </Suspense>
    </Canvas>
  )
}
