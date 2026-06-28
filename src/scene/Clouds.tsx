import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function CloudPuff({ position, scale }: { position: [number, number, number]; scale: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const speed = useMemo(() => 0.1 + Math.random() * 0.2, [])
  const offset = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + offset) * 0.3
    }
  })

  const spheres = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      x: (i - 2) * 0.8,
      y: Math.random() * 0.3,
      r: (0.6 + Math.random() * 0.4) * scale,
    }))
  }, [scale])

  return (
    <group ref={groupRef} position={position}>
      {spheres.map((s, i) => (
        <mesh key={i} position={[s.x * scale, s.y, 0]}>
          <sphereGeometry args={[s.r, 8, 8]} />
          <meshStandardMaterial
            color="#c8e6ff"
            transparent
            opacity={0.15}
            roughness={1}
            metalness={0}
          />
        </mesh>
      ))}
    </group>
  )
}

export function VolumeClouds() {
  const clouds = useMemo(() => [
    { pos: [-8, 2, -5] as [number, number, number], scale: 1.2 },
    { pos: [7, 3, -8] as [number, number, number], scale: 0.9 },
    { pos: [-5, -1, -10] as [number, number, number], scale: 1.5 },
    { pos: [10, 0, -4] as [number, number, number], scale: 0.8 },
    { pos: [0, 4, -12] as [number, number, number], scale: 1.1 },
    { pos: [-12, 1, -7] as [number, number, number], scale: 1.0 },
  ], [])

  return (
    <>
      {clouds.map((c, i) => (
        <CloudPuff key={i} position={c.pos} scale={c.scale} />
      ))}
    </>
  )
}
