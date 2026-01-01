// @ts-nocheck
'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface BarProps {
  position: [number, number, number]
  height: number
  color: string
  delay: number
}

function Bar({ position, height, color, delay }: BarProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const targetHeight = useRef(height)
  const currentHeight = useRef(0)

  useFrame((state) => {
    if (!meshRef.current) return

    // Animate height growth
    const progress = Math.min(1, (state.clock.elapsedTime - delay) / 1.5)
    if (progress > 0) {
      currentHeight.current = targetHeight.current * progress
      meshRef.current.scale.y = currentHeight.current
      meshRef.current.position.y = position[1] + currentHeight.current / 2
    }

    // Pulse effect
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.05
    meshRef.current.scale.x = pulse
    meshRef.current.scale.z = pulse
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.8, 1, 0.8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  )
}

export function BarChart() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
  })

  return (
    <group ref={groupRef}>
      {/* Lighting - Cyber theme */}
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00d4ff" />
      <pointLight position={[-5, 5, -5]} intensity={0.6} color="#ff00ff" />
      <pointLight position={[0, 8, 0]} intensity={0.4} color="#8b5cf6" />

      {/* Bars with gradient colors */}
      <Bar position={[-3, 0, 0]} height={2.5} color="#00d4ff" delay={0} />
      <Bar position={[-1, 0, 0]} height={3.5} color="#22d3ee" delay={0.2} />
      <Bar position={[1, 0, 0]} height={1.8} color="#8b5cf6" delay={0.4} />
      <Bar position={[3, 0, 0]} height={4.2} color="#ff00ff" delay={0.6} />

      {/* Grid floor with cyber colors */}
      <gridHelper args={[10, 10, '#00d4ff', '#1a1a3a']} position={[0, 0, 0]} />
    </group>
  )
}
