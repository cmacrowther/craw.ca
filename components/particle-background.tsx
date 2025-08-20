"use client"

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { useTheme } from 'next-themes'
import * as THREE from 'three'

function FloatingParticles() {
  const meshRef = useRef<THREE.Points>(null)
  const { theme } = useTheme()
  
  // Generate random particle positions across a wider area
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(200 * 3) // 200 particles for larger area
    
    for (let i = 0; i < 200; i++) {
      // Spread particles across a much wider area to cover the section
      positions[i * 3] = (Math.random() - 0.5) * 40      // x - wider spread
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20  // y - taller spread
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30  // z - deeper spread
    }
    
    return positions
  }, [])

  // Animate particles
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      
      // Rotate the entire particle system very slowly
      meshRef.current.rotation.y = time * 0.02
      meshRef.current.rotation.x = time * 0.01
      
      // Individual particle floating animation
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < 200; i++) {
        const i3 = i * 3
        // Add gentle floating motion to each particle
        positions[i3 + 1] += Math.sin(time * 0.2 + i * 0.1) * 0.001 // y movement
        positions[i3] += Math.cos(time * 0.15 + i * 0.05) * 0.0005   // x movement
      }
      
      meshRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <Points ref={meshRef} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={theme === 'light' ? "#1a1a1a" : "#64FFDA"}
        size={0.04}
        sizeAttenuation={true}
        opacity={theme === 'light' ? 0.6 : 0.7}
      />
    </Points>
  )
}

function BackgroundParticles() {
  const meshRef = useRef<THREE.Points>(null)
  const { theme } = useTheme()
  
  // Generate background particles (further away and more spread out)
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(150 * 3) // 150 background particles
    
    for (let i = 0; i < 150; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50      // x - even wider
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25  // y - taller  
      positions[i * 3 + 2] = (Math.random() - 0.5) * -20 - 10 // z - behind everything
    }
    
    return positions
  }, [])

  // Slow background particle animation
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      meshRef.current.rotation.y = time * -0.015 // Opposite rotation, slower
      meshRef.current.rotation.x = time * 0.008
    }
  })

  return (
    <Points ref={meshRef} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={theme === 'light' ? "#2a2a2a" : "#A78BFA"}
        size={0.035}
        sizeAttenuation={true}
        opacity={theme === 'light' ? 0.4 : 0.5}
      />
    </Points>
  )
}

interface ParticleBackgroundProps {
  className?: string
}

export function ParticleBackground({ className = "" }: ParticleBackgroundProps) {
  const { theme } = useTheme()
  
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        {/* Background particles (behind everything) */}
        <BackgroundParticles />
        
        {/* Floating particles (mid-layer) */}
        <FloatingParticles />
        
        {/* Theme-appropriate ambient lighting for particles */}
        <ambientLight intensity={theme === 'light' ? 0.8 : 0.4} />
        {theme === 'light' ? (
          <>
            <pointLight position={[10, 10, 10]} intensity={0.3} color="#333333" />
            <pointLight position={[-10, -10, 5]} intensity={0.2} color="#555555" />
          </>
        ) : (
          <>
            <pointLight position={[10, 10, 10]} intensity={0.4} color="#64FFDA" />
            <pointLight position={[-10, -10, 5]} intensity={0.3} color="#A78BFA" />
          </>
        )}
      </Canvas>
    </div>
  )
}
