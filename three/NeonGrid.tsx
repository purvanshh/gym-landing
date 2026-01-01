// @ts-nocheck
'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function NeonGrid() {
  const gridRef = useRef<THREE.Mesh>(null)

  // Custom shader material for cyber neon grid effect
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color('#00d4ff') },
        color2: { value: new THREE.Color('#ff00ff') },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec2 vUv;
        
        void main() {
          // Create grid pattern
          vec2 grid = fract(vUv * 20.0);
          float line = step(0.92, grid.x) + step(0.92, grid.y);
          
          // Color gradient based on position
          vec3 gradientColor = mix(color1, color2, vUv.x + sin(time * 0.5) * 0.3);
          
          // Pulsing wave effect
          float wave = sin(vUv.y * 30.0 - time * 2.0) * 0.15 + 0.85;
          float pulse = sin(time * 2.0 + vUv.x * 5.0) * 0.2 + 0.8;
          
          // Glow intensity increases toward the horizon
          float horizonGlow = smoothstep(0.0, 0.5, vUv.y);
          
          // Final color with transparency
          vec3 finalColor = gradientColor * line * wave * pulse;
          float alpha = line * (0.5 + horizonGlow * 0.3);
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    })
  }, [])

  useFrame((state) => {
    if (shaderMaterial) {
      shaderMaterial.uniforms.time.value = state.clock.elapsedTime
    }
  })

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 5, 0]} intensity={1.2} color="#00d4ff" />
      <pointLight position={[-5, 3, 0]} intensity={0.6} color="#ff00ff" />
      <pointLight position={[5, 3, 0]} intensity={0.6} color="#8b5cf6" />

      <mesh ref={gridRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} material={shaderMaterial}>
        <planeGeometry args={[30, 30]} />
      </mesh>

      {/* Dark reflection surface */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.01, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshBasicMaterial color="#0a0a1a" opacity={0.9} transparent />
      </mesh>

      {/* Fog for depth */}
      <fog attach="fog" args={['#0a0a1a', 8, 25]} />
    </>
  )
}
