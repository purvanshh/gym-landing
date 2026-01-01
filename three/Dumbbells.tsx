// @ts-nocheck
'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Cylinder, Sphere } from '@react-three/drei'
import * as THREE from 'three'

interface DumbbellProps {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  color?: string
}

export function Dumbbell({ position, rotation = [0, 0, 0], scale = 1, color = '#00d4ff' }: DumbbellProps) {
  const groupRef = useRef<THREE.Group>(null)
  const targetRotation = useRef({ x: 0, y: 0 })
  const currentRotation = useRef({ x: 0, y: 0 })

  // Mouse movement effect
  useFrame((state) => {
    if (!groupRef.current) return

    // Smooth interpolation towards target rotation
    currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.05
    currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.05

    groupRef.current.rotation.x = rotation[0] + currentRotation.current.x
    groupRef.current.rotation.y = rotation[1] + currentRotation.current.y

    // Floating animation
    groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3
  })

  // Handle mouse move
  if (typeof window !== 'undefined') {
    useMemo(() => {
      const handleMouseMove = (e: MouseEvent) => {
        targetRotation.current.x = (e.clientY / window.innerHeight - 0.5) * 0.3
        targetRotation.current.y = (e.clientX / window.innerWidth - 0.5) * 0.3
      }
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])
  }

  const cyberMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.6,
        metalness: 0.9,
        roughness: 0.1,
      }),
    [color]
  )

  const darkMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0a0a1a',
        metalness: 0.95,
        roughness: 0.05,
      }),
    []
  )

  const accentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#ff00ff',
        emissive: '#ff00ff',
        emissiveIntensity: 0.4,
        metalness: 0.8,
        roughness: 0.2,
      }),
    []
  )

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Bar */}
      <Cylinder args={[0.05, 0.05, 2, 16]} rotation={[0, 0, Math.PI / 2]} material={darkMaterial} />

      {/* Left weight */}
      <group position={[-1, 0, 0]}>
        <Cylinder args={[0.3, 0.3, 0.15, 32]} rotation={[0, 0, Math.PI / 2]} material={cyberMaterial} />
        <Cylinder args={[0.25, 0.25, 0.1, 32]} rotation={[0, 0, Math.PI / 2]} position={[-0.1, 0, 0]} material={darkMaterial} />
      </group>

      {/* Right weight */}
      <group position={[1, 0, 0]}>
        <Cylinder args={[0.3, 0.3, 0.15, 32]} rotation={[0, 0, Math.PI / 2]} material={cyberMaterial} />
        <Cylinder args={[0.25, 0.25, 0.1, 32]} rotation={[0, 0, Math.PI / 2]} position={[0.1, 0, 0]} material={darkMaterial} />
      </group>

      {/* Center grip indicators - accent color */}
      <Sphere args={[0.08, 16, 16]} position={[-0.3, 0, 0]} material={accentMaterial} />
      <Sphere args={[0.08, 16, 16]} position={[0.3, 0, 0]} material={accentMaterial} />
    </group>
  )
}

export function DumbbellScene() {
  return (
    <>
      {/* Lighting - Cyber theme */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
      <pointLight position={[0, 5, 5]} intensity={0.3} color="#8b5cf6" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.6} color="#00d4ff" />

      {/* Dumbbells with cyber colors */}
      <Dumbbell position={[-2, 0, 0]} rotation={[0.3, 0.5, 0]} scale={0.8} color="#00d4ff" />
      <Dumbbell position={[2, -1, -1]} rotation={[-0.2, -0.3, 0.4]} scale={0.6} color="#ff00ff" />
      <Dumbbell position={[0, 1.5, -2]} rotation={[0.1, 0.8, 0.2]} scale={0.5} color="#8b5cf6" />
    </>
  )
}
