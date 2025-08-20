"use client"

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  const meshRef = useRef<THREE.Group>(null)

  // Add bouncing and subtle movement animation
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      // Reduced bouncing motion using sine wave
      meshRef.current.position.y = Math.sin(time * 0.8) * 0.15
      // Increased side-to-side movement
      meshRef.current.position.x = Math.sin(time * 0.3) * 0.8
      // Increased forward-back movement
      meshRef.current.position.z = Math.cos(time * 0.2) * 0.3
    }
  })

  return <primitive ref={meshRef} object={scene} scale={[8, 8, 8]} rotation={[0, -Math.PI/1.7, 0]} />
}

interface GLBViewerProps {
  modelUrl: string
  className?: string
}

export function GLBViewer({ modelUrl, className = "" }: GLBViewerProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 8], fov: 65 }}>
        <Suspense fallback={null}>
          <Model url={modelUrl} />
          <Environment preset="studio" />
        </Suspense>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      </Canvas>
    </div>
  )
}

// Preload the model
useGLTF.preload('/model.glb')
