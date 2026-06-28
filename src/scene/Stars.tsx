import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Stars({ count = 2000 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null)

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const siz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 200
      pos[i * 3 + 1] = (Math.random() - 0.5) * 200
      pos[i * 3 + 2] = (Math.random() - 0.5) * 200
      siz[i] = Math.random() * 2 + 0.5
    }
    return [pos, siz]
  }, [count])

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.01
      mesh.current.rotation.x += delta * 0.005
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.3}
        color="#a8d8ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}
