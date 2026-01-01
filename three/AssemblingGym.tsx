// @ts-nocheck
'use client'

import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

export function AssemblingGym() {
  const groupRef = useRef<THREE.Group>(null)
  const progressRef = useRef(0)

  // Gym structure vertices (wireframe points)
  const floorPoints: [number, number, number][] = [
    [-4, 0, -4], [4, 0, -4], [4, 0, 4], [-4, 0, 4], [-4, 0, -4]
  ]

  const wallPoints: [number, number, number][] = [
    [-4, 0, -4], [-4, 3, -4], [4, 3, -4], [4, 0, -4],
  ]

  const rackPoints: [number, number, number][] = [
    [-2, 0, 0], [-2, 2.5, 0], [-2, 2.5, 1], [-2, 0, 1],
    [2, 0, 0], [2, 2.5, 0], [2, 2.5, 1], [2, 0, 1],
  ]

  useFrame((state) => {
    if (!groupRef.current) return

    // Rotate slowly
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3
  })

  useEffect(() => {
    // Animate assembly on scroll
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        const element = document.getElementById('features')
        if (element) {
          const rect = element.getBoundingClientRect()
          const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight))
          progressRef.current = progress
        }
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <group ref={groupRef}>
      {/* Lighting - Cyber theme */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#00d4ff" />
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#ff00ff" />

      {/* Floor - Electric Blue */}
      <Line
        points={floorPoints}
        color="#00d4ff"
        lineWidth={2}
        opacity={progressRef.current}
        transparent
      />

      {/* Wall - Gradient effect with magenta */}
      <Line
        points={wallPoints}
        color="#ff00ff"
        lineWidth={2}
        opacity={progressRef.current}
        transparent
      />

      {/* Rack left - Cyan */}
      <Line
        points={[rackPoints[0], rackPoints[1]]}
        color="#22d3ee"
        lineWidth={2}
        opacity={progressRef.current}
        transparent
      />
      <Line
        points={[rackPoints[1], rackPoints[2]]}
        color="#22d3ee"
        lineWidth={2}
        opacity={progressRef.current}
        transparent
      />
      <Line
        points={[rackPoints[2], rackPoints[3]]}
        color="#22d3ee"
        lineWidth={2}
        opacity={progressRef.current}
        transparent
      />

      {/* Rack right - Purple */}
      <Line
        points={[rackPoints[4], rackPoints[5]]}
        color="#8b5cf6"
        lineWidth={2}
        opacity={progressRef.current}
        transparent
      />
      <Line
        points={[rackPoints[5], rackPoints[6]]}
        color="#8b5cf6"
        lineWidth={2}
        opacity={progressRef.current}
        transparent
      />
      <Line
        points={[rackPoints[6], rackPoints[7]]}
        color="#8b5cf6"
        lineWidth={2}
        opacity={progressRef.current}
        transparent
      />

      {/* Connection lines - Electric blue */}
      <Line
        points={[rackPoints[1], rackPoints[5]]}
        color="#00d4ff"
        lineWidth={2}
        opacity={progressRef.current}
        transparent
      />

      {/* Grid floor - Subtle cyan */}
      {[-3, -2, -1, 0, 1, 2, 3].map((x) => (
        <Line
          key={`grid-x-${x}`}
          points={[[x, 0, -4], [x, 0, 4]]}
          color="#00d4ff"
          lineWidth={1}
          opacity={progressRef.current * 0.2}
          transparent
        />
      ))}

      {[-3, -2, -1, 0, 1, 2, 3].map((z) => (
        <Line
          key={`grid-z-${z}`}
          points={[[-4, 0, z], [4, 0, z]]}
          color="#00d4ff"
          lineWidth={1}
          opacity={progressRef.current * 0.2}
          transparent
        />
      ))}
    </group>
  )
}
