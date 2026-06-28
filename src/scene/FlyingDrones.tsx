import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

function Drone({ offset, radius, height, speed }: { offset: number; radius: number; height: number; speed: number }) {
  const ref = useRef<THREE.Group>(null)
  const propRef1 = useRef<THREE.Mesh>(null)
  const propRef2 = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed + offset
    ref.current.position.x = Math.cos(t) * radius
    ref.current.position.z = Math.sin(t) * radius - 8
    ref.current.position.y = height + Math.sin(t * 2.1) * 0.3
    ref.current.rotation.y = -t + Math.PI / 2
    ref.current.rotation.z = Math.sin(t) * 0.1

    if (propRef1.current) propRef1.current.rotation.y += 0.4
    if (propRef2.current) propRef2.current.rotation.y -= 0.4
  })

  return (
    <group ref={ref} scale={0.35}>
      {/* Drone body */}
      <mesh castShadow>
        <boxGeometry args={[0.5, 0.15, 0.5]} />
        <meshStandardMaterial color="#1a2a4a" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Drone arms */}
      {[[-0.4, 0, -0.4], [0.4, 0, -0.4], [-0.4, 0, 0.4], [0.4, 0, 0.4]].map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh>
            <cylinderGeometry args={[0.04, 0.04, 0.5, 6]} />
            <meshStandardMaterial color="#0d1b35" metalness={0.7} roughness={0.4} />
          </mesh>
          {/* Propeller */}
          <mesh position={[0, 0.1, 0]} rotation={[0, i % 2 === 0 ? 0 : Math.PI / 4, 0]}>
            <boxGeometry args={[0.5, 0.02, 0.08]} />
            <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.3} transparent opacity={0.7} />
          </mesh>
        </group>
      ))}
      {/* LED */}
      <mesh position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.06, 6, 6]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={2} />
      </mesh>
      <pointLight color="#00e5ff" intensity={0.2} distance={2} position={[0, 0, 0]} />
    </group>
  )
}

export function FlyingDrones() {
  return (
    <group>
      <Drone offset={0} radius={8} height={4} speed={0.25} />
      <Drone offset={Math.PI} radius={6} height={5.5} speed={0.3} />
      <Drone offset={Math.PI * 0.5} radius={10} height={3} speed={0.2} />
    </group>
  )
}
