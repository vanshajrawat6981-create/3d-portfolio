import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function CloudIsland() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.05
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.05
  })

  return (
    <group ref={groupRef} position={[0, -1.2, 0]}>
      {/* Main island body */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[2.2, 1.6, 0.5, 16]} />
        <meshStandardMaterial color="#1a3a5c" roughness={0.8} metalness={0.1} />
      </mesh>
      {/* Island top grass/terrain */}
      <mesh castShadow receiveShadow position={[0, 0.22, 0]}>
        <cylinderGeometry args={[2.2, 2.2, 0.1, 16]} />
        <meshStandardMaterial color="#1e4070" roughness={0.9} metalness={0.05} />
      </mesh>
      {/* Island underside taper */}
      <mesh position={[0, -0.45, 0]}>
        <cylinderGeometry args={[1.6, 0.6, 0.5, 16]} />
        <meshStandardMaterial color="#0d2040" roughness={0.9} metalness={0.1} />
      </mesh>
      {/* Bottom point */}
      <mesh position={[0, -0.85, 0]}>
        <coneGeometry args={[0.6, 0.6, 12]} />
        <meshStandardMaterial color="#0a1830" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Glowing ring at base */}
      <mesh position={[0, 0.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.3, 0.04, 8, 40]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.8} transparent opacity={0.7} />
      </mesh>

      {/* Small rocks / terrain features */}
      {[
        [1.2, 0.32, 0.8],
        [-1.4, 0.32, 0.5],
        [0.5, 0.32, -1.5],
        [-0.8, 0.32, -1.2],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} castShadow>
          <dodecahedronGeometry args={[0.18 + i * 0.04, 0]} />
          <meshStandardMaterial color="#162840" roughness={0.9} metalness={0.1} />
        </mesh>
      ))}

      {/* Cloud base below island */}
      {[
        [0, -1.1, 0, 1.8],
        [0.8, -0.9, 0.8, 1.2],
        [-0.9, -0.9, -0.5, 1.1],
        [0.4, -1.0, -0.9, 0.9],
      ].map(([x, y, z, r], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[r, 8, 8]} />
          <meshStandardMaterial
            color="#c8d8ff"
            transparent
            opacity={0.12}
            roughness={1}
          />
        </mesh>
      ))}

      {/* Small floating satellites / data nodes around island */}
      {[0, Math.PI * 0.67, Math.PI * 1.33].map((angle, i) => (
        <DataNode key={i} angle={angle} radius={3.2} speed={0.3 + i * 0.1} />
      ))}
    </group>
  )
}

function DataNode({ angle, radius, speed }: { angle: number; radius: number; speed: number }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed + angle
    ref.current.position.x = Math.cos(t) * radius
    ref.current.position.z = Math.sin(t) * radius
    ref.current.position.y = Math.sin(t * 1.4) * 0.4 + 0.2
    ref.current.rotation.y = t * 2
  })

  return (
    <group ref={ref}>
      <mesh castShadow>
        <octahedronGeometry args={[0.14, 0]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={0.6}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <pointLight color="#00e5ff" intensity={0.3} distance={2} />
    </group>
  )
}
