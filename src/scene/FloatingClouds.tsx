import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface CloudProps {
  position: [number, number, number]
  scale: number
  speed: number
}

function Cloud({ position, scale, speed }: CloudProps) {
  const groupRef = useRef<THREE.Group>(null)
  const baseY = position[1]

  const puffs = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      x: (i - 2) * 1.1 * scale,
      y: (Math.random() - 0.5) * 0.4 * scale,
      z: (Math.random() - 0.5) * 0.6 * scale,
      r: (0.7 + Math.random() * 0.6) * scale,
    }))
  }, [scale])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.position.y = baseY + Math.sin(t * speed + position[0]) * 0.3
    groupRef.current.position.x += speed * 0.003
    if (groupRef.current.position.x > 35) groupRef.current.position.x = -35
  })

  return (
    <group ref={groupRef} position={position}>
      {puffs.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[p.r, 7, 7]} />
          <meshStandardMaterial
            color="#dde8ff"
            transparent
            opacity={0.18}
            roughness={1}
            metalness={0}
          />
        </mesh>
      ))}
    </group>
  )
}

export function FloatingClouds() {
  const clouds = useMemo(
    () => [
      { position: [-14, 6, -18] as [number, number, number], scale: 2.2, speed: 0.4 },
      { position: [10, 9, -22] as [number, number, number], scale: 2.8, speed: 0.3 },
      { position: [-6, 12, -30] as [number, number, number], scale: 3.5, speed: 0.25 },
      { position: [18, 4, -14] as [number, number, number], scale: 1.8, speed: 0.5 },
      { position: [-20, 8, -25] as [number, number, number], scale: 2.0, speed: 0.35 },
      { position: [5, 14, -35] as [number, number, number], scale: 4.0, speed: 0.2 },
      { position: [-3, 2, -10] as [number, number, number], scale: 1.5, speed: 0.6 },
      { position: [25, 7, -20] as [number, number, number], scale: 2.5, speed: 0.3 },
    ],
    []
  )

  return (
    <group>
      {clouds.map((c, i) => (
        <Cloud key={i} position={c.position} scale={c.scale} speed={c.speed} />
      ))}
    </group>
  )
}
