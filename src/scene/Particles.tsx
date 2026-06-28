import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function AmbientParticles({ count = 120 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null)

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15
      vel[i * 3] = (Math.random() - 0.5) * 0.01
      vel[i * 3 + 1] = Math.random() * 0.005 + 0.002
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01
    }
    return [pos, vel]
  }, [count])

  useFrame(() => {
    if (!meshRef.current) return
    const posAttr = meshRef.current.geometry.attributes.position
    const arr = posAttr.array as Float32Array
    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3]
      arr[i * 3 + 1] += velocities[i * 3 + 1]
      arr[i * 3 + 2] += velocities[i * 3 + 2]
      if (arr[i * 3 + 1] > 8) arr[i * 3 + 1] = -5
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#3B82F6"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
