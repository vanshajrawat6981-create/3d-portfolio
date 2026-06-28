import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function CloudParticles() {
  const meshRef = useRef<THREE.Points>(null)

  const { positions, speeds } = useMemo(() => {
    const count = 600
    const pos = new Float32Array(count * 3)
    const sp = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30 + 5
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60 - 10
      sp[i] = 0.002 + Math.random() * 0.006
    }
    return { positions: pos, speeds: sp }
  }, [])

  useFrame((_, delta) => {
    if (!meshRef.current) return
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < positions.length / 3; i++) {
      positions[i * 3] += speeds[i] * delta * 30
      if (positions[i * 3] > 30) positions[i * 3] = -30
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#00e5ff"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  )
}
