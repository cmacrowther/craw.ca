"use client"

import { Suspense, useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import { useTheme } from 'next-themes'
import * as THREE from 'three'

interface Sparkle {
  id: number
  position: THREE.Vector3
  scale: number
  rotation: number
  rotationSpeed: number
  life: number
  maxLife: number
  isExploding: boolean
}

interface Particle {
  id: number
  position: THREE.Vector3
  velocity: THREE.Vector3
  life: number
  maxLife: number
}

function SparkleEffect() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])
  const [particles, setParticles] = useState<Particle[]>([])
  const sparkleRefs = useRef<(THREE.Mesh | null)[]>([])
  const particleRefs = useRef<(THREE.Mesh | null)[]>([])
  const sparkleIdCounter = useRef(0)
  const particleIdCounter = useRef(0)
  const { theme } = useTheme()

  // Create a sparkle geometry that looks like fa-sparkle
  const sparkleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    
    // Create a proper fa-sparkle shape with 4 diamond rays
    const vertices: number[] = []
    const indices: number[] = []
    
    // Center point
    vertices.push(0, 0, 0) // index 0
    
    // Main 4 points - create diamond/rhombus shapes for each ray
    const mainLength = 0.5
    const rayWidth = 0.08
    
    // Top ray (diamond shape)
    vertices.push(0, mainLength, 0)           // top point - index 1
    vertices.push(-rayWidth, rayWidth, 0)     // top-left - index 2  
    vertices.push(rayWidth, rayWidth, 0)      // top-right - index 3
    
    // Right ray
    vertices.push(mainLength, 0, 0)           // right point - index 4
    vertices.push(rayWidth, -rayWidth, 0)     // right-bottom - index 5
    vertices.push(rayWidth, rayWidth, 0)      // right-top - index 6
    
    // Bottom ray
    vertices.push(0, -mainLength, 0)          // bottom point - index 7
    vertices.push(rayWidth, -rayWidth, 0)     // bottom-right - index 8
    vertices.push(-rayWidth, -rayWidth, 0)    // bottom-left - index 9
    
    // Left ray
    vertices.push(-mainLength, 0, 0)          // left point - index 10
    vertices.push(-rayWidth, rayWidth, 0)     // left-top - index 11
    vertices.push(-rayWidth, -rayWidth, 0)    // left-bottom - index 12
    
    // Create triangles for each diamond ray
    // Top ray
    indices.push(0, 2, 1) // center to top-left to top
    indices.push(0, 1, 3) // center to top to top-right
    indices.push(0, 3, 2) // center to top-right to top-left
    
    // Right ray  
    indices.push(0, 6, 4) // center to right-top to right
    indices.push(0, 4, 5) // center to right to right-bottom
    indices.push(0, 5, 6) // center to right-bottom to right-top
    
    // Bottom ray
    indices.push(0, 8, 7) // center to bottom-right to bottom
    indices.push(0, 7, 9) // center to bottom to bottom-left
    indices.push(0, 9, 8) // center to bottom-left to bottom-right
    
    // Left ray
    indices.push(0, 11, 10) // center to left-top to left
    indices.push(0, 10, 12) // center to left to left-bottom
    indices.push(0, 12, 11) // center to left-bottom to left-top
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    geometry.setIndex(indices)
    geometry.computeVertexNormals()
    
    return geometry
  }, [])

  // Create sparkles periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const newSparkle: Sparkle = {
        id: sparkleIdCounter.current++,
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 8, // Around the model
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 6
        ),
        scale: Math.random() * 0.5 + 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.15,
        life: 0,
        maxLife: 1500 + Math.random() * 1000, // 1.5-2.5 seconds
        isExploding: false
      }
      
      setSparkles(prev => [...prev, newSparkle])
    }, 400) // New sparkle every 400ms

    return () => clearInterval(interval)
  }, [])

  // Update sparkles and handle explosions
  useFrame((state, delta) => {
    const deltaMs = delta * 1000

    setSparkles(prev => prev.map(sparkle => {
      const newSparkle = { ...sparkle }
      newSparkle.life += deltaMs
      newSparkle.rotation += sparkle.rotationSpeed

      // Start exploding when life is 85% done (later than before)
      if (newSparkle.life > newSparkle.maxLife * 0.85 && !newSparkle.isExploding) {
        newSparkle.isExploding = true
        
        // Create explosion particles
        const numParticles = 4 + Math.floor(Math.random() * 2) // Reduced from 6-9 to 4-6
        const newParticles: Particle[] = []
        
        for (let i = 0; i < numParticles; i++) {
          const angle = (i / numParticles) * Math.PI * 2
          const speed = 0.015 + Math.random() * 0.015 // Further reduced speed
          const elevation = (Math.random() - 0.5) * 0.15
          
          newParticles.push({
            id: particleIdCounter.current++,
            position: sparkle.position.clone(),
            velocity: new THREE.Vector3(
              Math.cos(angle) * speed,
              Math.sin(angle) * speed + elevation,
              (Math.random() - 0.5) * speed * 0.3
            ),
            life: 0,
            maxLife: 250 + Math.random() * 150 // Even shorter lifespan
          })
        }
        
        setParticles(prev => [...prev, ...newParticles])
      }

      return newSparkle
    }).filter(sparkle => sparkle.life < sparkle.maxLife))

    // Update particles
    setParticles(prev => prev.map(particle => {
      const newParticle = { ...particle }
      newParticle.life += deltaMs
      newParticle.position.add(particle.velocity)
      newParticle.velocity.multiplyScalar(0.97) // Friction
      
      return newParticle
    }).filter(particle => particle.life < particle.maxLife))

    // Update sparkle meshes
    sparkles.forEach((sparkle, index) => {
      const mesh = sparkleRefs.current[index]
      if (mesh) {
        mesh.position.copy(sparkle.position)
        mesh.rotation.z = sparkle.rotation
        
        // Scale and opacity based on life
        const lifeRatio = sparkle.life / sparkle.maxLife
        let scale: number
        let opacity: number
        
        if (sparkle.isExploding) {
          // Grow to maximum size then fade quickly when exploding
          const explodeRatio = (lifeRatio - 0.85) / 0.15 // Adjusted for new timing
          scale = sparkle.scale * (1 + explodeRatio * 1.5)
          opacity = Math.max(0, 1 - explodeRatio * 6)
        } else {
          // Normal fade in and out (longer duration)
          scale = sparkle.scale * Math.sin(lifeRatio * Math.PI * 0.85) * (1 + Math.sin(state.clock.elapsedTime * 3) * 0.1)
          opacity = Math.sin(lifeRatio * Math.PI * 0.85)
        }
        
        mesh.scale.setScalar(scale)
        
        if (mesh.material instanceof THREE.MeshBasicMaterial) {
          mesh.material.opacity = opacity
        }
      }
    })

    // Update particle meshes
    particles.forEach((particle, index) => {
      const mesh = particleRefs.current[index]
      if (mesh) {
        mesh.position.copy(particle.position)
        
        const lifeRatio = particle.life / particle.maxLife
        const length = 0.3 * (1 - lifeRatio * 0.3) // Lines that shrink slowly
        
        // Create a line by scaling the cylinder
        mesh.scale.set(0.003, length, 0.003) // Very thin width, variable length
        
        // Orient the line in the direction of movement
        const direction = particle.velocity.clone().normalize()
        mesh.lookAt(mesh.position.clone().add(direction))
        mesh.rotateX(Math.PI / 2) // Rotate to align with movement direction
        
        if (mesh.material instanceof THREE.MeshBasicMaterial) {
          mesh.material.opacity = Math.max(0, 1 - lifeRatio)
        }
      }
    })
  })

  return (
    <>
      {/* Sparkles */}
      {sparkles.map((sparkle, index) => (
        <mesh
          key={sparkle.id}
          ref={el => sparkleRefs.current[index] = el}
          geometry={sparkleGeometry}
        >
          <meshBasicMaterial 
            color={theme === 'light' ? "#2a2a2a" : "#ffffff"} 
            transparent 
            opacity={1}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
      
      {/* Explosion particles */}
      {particles.map((particle, index) => (
        <mesh
          key={particle.id}
          ref={el => particleRefs.current[index] = el}
          position={particle.position}
        >
          <cylinderGeometry args={[1, 1, 1, 4]} />
          <meshBasicMaterial 
            color={theme === 'light' ? "#2a2a2a" : "#ffffff"} 
            transparent 
            opacity={1}
          />
        </mesh>
      ))}
    </>
  )
}

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
  const { theme } = useTheme()
  
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 8], fov: 65 }}>
        <Suspense fallback={null}>
          <Model url={modelUrl} />
          <SparkleEffect />
          <Environment preset="studio" />
        </Suspense>
        <ambientLight intensity={theme === 'light' ? 0.7 : 0.5} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1}
          intensity={theme === 'light' ? 1.2 : 1.0}
        />
        {theme === 'light' && (
          <pointLight 
            position={[-5, 5, 5]} 
            intensity={0.6} 
            color="#333333"
          />
        )}
      </Canvas>
    </div>
  )
}

// Preload the model
useGLTF.preload('/model.glb')
