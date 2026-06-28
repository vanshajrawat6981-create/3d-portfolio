import { useRef, useState, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

interface RobotProps {
  position?: [number, number, number]
}

export function Robot({ position = [0, 0, 0] }: RobotProps) {
  const groupRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Group>(null)
  const leftArmRef = useRef<THREE.Mesh>(null)
  const rightArmRef = useRef<THREE.Mesh>(null)
  const eyeLeftRef = useRef<THREE.Mesh>(null)
  const eyeRightRef = useRef<THREE.Mesh>(null)
  const antennaRef = useRef<THREE.Mesh>(null)

  const [isWaving, setIsWaving] = useState(false)
  const blinkTimerRef = useRef(0)
  const [isBlinking, setIsBlinking] = useState(false)
  const { pointer } = useThree()

  useEffect(() => {
    const waveTimer = setTimeout(() => setIsWaving(true), 1500)
    const stopWave = setTimeout(() => setIsWaving(false), 3500)
    return () => {
      clearTimeout(waveTimer)
      clearTimeout(stopWave)
    }
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (!groupRef.current) return

    // Idle hover
    groupRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.08

    // Head follows cursor
    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        pointer.x * 0.5,
        0.05
      )
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        -pointer.y * 0.2,
        0.05
      )
    }

    // Wave animation
    if (rightArmRef.current) {
      if (isWaving) {
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(
          rightArmRef.current.rotation.z,
          -Math.PI * 0.6 + Math.sin(t * 8) * 0.3,
          0.1
        )
      } else {
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(
          rightArmRef.current.rotation.z,
          -0.3,
          0.05
        )
      }
    }

    // Left arm idle
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = THREE.MathUtils.lerp(
        leftArmRef.current.rotation.z,
        0.3 + Math.sin(t * 1.4 + 1) * 0.05,
        0.05
      )
    }

    // Blink
    blinkTimerRef.current += state.clock.getDelta() * 60
    if (blinkTimerRef.current > 200 + Math.random() * 100) {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 150)
      blinkTimerRef.current = 0
    }

    if (eyeLeftRef.current && eyeRightRef.current) {
      const scaleY = isBlinking ? 0.05 : 1
      eyeLeftRef.current.scale.y = THREE.MathUtils.lerp(eyeLeftRef.current.scale.y, scaleY, 0.3)
      eyeRightRef.current.scale.y = THREE.MathUtils.lerp(eyeRightRef.current.scale.y, scaleY, 0.3)
    }

    // Antenna bounce
    if (antennaRef.current) {
      antennaRef.current.position.y = 0.58 + Math.sin(t * 3) * 0.02
    }
  })

  const bodyMat = (
    <meshStandardMaterial color="#1a2a4a" metalness={0.7} roughness={0.3} />
  )
  const accentMat = (
    <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.4} metalness={0.3} roughness={0.5} />
  )
  const eyeMat = (
    <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={1} />
  )

  return (
    <group ref={groupRef} position={position}>
      {/* Body */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.55, 0.65, 0.42]} />
        {bodyMat}
      </mesh>
      {/* Body trim */}
      <mesh position={[0, 0.05, 0.22]}>
        <boxGeometry args={[0.42, 0.5, 0.03]} />
        <meshStandardMaterial color="#0d1b35" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Chest panel glow */}
      <mesh position={[0, 0.05, 0.215]}>
        <boxGeometry args={[0.22, 0.2, 0.02]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.6} transparent opacity={0.9} />
      </mesh>
      {/* Chest dots */}
      {[-0.07, 0, 0.07].map((x, i) => (
        <mesh key={i} position={[x, -0.08, 0.222]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={1} />
        </mesh>
      ))}

      {/* Head */}
      <group ref={headRef} position={[0, 0.55, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.48, 0.42, 0.4]} />
          {bodyMat}
        </mesh>
        {/* Eye sockets */}
        <mesh position={[-0.1, 0.04, 0.21]}>
          <boxGeometry args={[0.13, 0.1, 0.03]} />
          <meshStandardMaterial color="#0d1b35" />
        </mesh>
        <mesh position={[0.1, 0.04, 0.21]}>
          <boxGeometry args={[0.13, 0.1, 0.03]} />
          <meshStandardMaterial color="#0d1b35" />
        </mesh>
        {/* Eyes */}
        <mesh ref={eyeLeftRef} position={[-0.1, 0.04, 0.225]}>
          <boxGeometry args={[0.1, 0.08, 0.02]} />
          {eyeMat}
        </mesh>
        <mesh ref={eyeRightRef} position={[0.1, 0.04, 0.225]}>
          <boxGeometry args={[0.1, 0.08, 0.02]} />
          {eyeMat}
        </mesh>
        {/* Mouth */}
        <mesh position={[0, -0.1, 0.21]}>
          <boxGeometry args={[0.22, 0.04, 0.02]} />
          <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.5} />
        </mesh>
        {/* Head accent stripe */}
        <mesh position={[0, 0.19, 0]}>
          <boxGeometry args={[0.48, 0.04, 0.4]} />
          {accentMat}
        </mesh>
        {/* Antenna base */}
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.12, 8]} />
          <meshStandardMaterial color="#1a2a4a" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Antenna ball */}
        <mesh ref={antennaRef} position={[0, 0.38, 0]}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={1.2} />
        </mesh>
      </group>

      {/* Left arm */}
      <mesh ref={leftArmRef} position={[-0.38, 0.08, 0]} castShadow>
        <capsuleGeometry args={[0.07, 0.36, 4, 8]} />
        {bodyMat}
      </mesh>
      {/* Left hand */}
      <mesh position={[-0.38, -0.22, 0]}>
        <sphereGeometry args={[0.09, 8, 8]} />
        {bodyMat}
      </mesh>

      {/* Right arm */}
      <mesh ref={rightArmRef} position={[0.38, 0.08, 0]} castShadow>
        <capsuleGeometry args={[0.07, 0.36, 4, 8]} />
        {bodyMat}
      </mesh>
      {/* Right hand */}
      <mesh position={[0.38, -0.22, 0]}>
        <sphereGeometry args={[0.09, 8, 8]} />
        {bodyMat}
      </mesh>

      {/* Legs */}
      <mesh position={[-0.16, -0.52, 0]} castShadow>
        <capsuleGeometry args={[0.09, 0.3, 4, 8]} />
        {bodyMat}
      </mesh>
      <mesh position={[0.16, -0.52, 0]} castShadow>
        <capsuleGeometry args={[0.09, 0.3, 4, 8]} />
        {bodyMat}
      </mesh>
      {/* Feet */}
      <mesh position={[-0.16, -0.72, 0.06]}>
        <boxGeometry args={[0.18, 0.1, 0.22]} />
        {bodyMat}
      </mesh>
      <mesh position={[0.16, -0.72, 0.06]}>
        <boxGeometry args={[0.18, 0.1, 0.22]} />
        {bodyMat}
      </mesh>

      {/* Shoulder joints */}
      <mesh position={[-0.3, 0.19, 0]}>
        <sphereGeometry args={[0.09, 8, 8]} />
        {accentMat}
      </mesh>
      <mesh position={[0.3, 0.19, 0]}>
        <sphereGeometry args={[0.09, 8, 8]} />
        {accentMat}
      </mesh>

      {/* Point light for glow */}
      <pointLight color="#00e5ff" intensity={0.8} distance={3} position={[0, 0, 0.3]} />
    </group>
  )
}
