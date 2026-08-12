"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

import { detectLowEndDevice } from "@/hooks/use-low-end-device"

type ThreeWaveBackgroundProps = {
  wave?: boolean
  transparent?: boolean
}

const VERTEX_SHADER = `
  precision highp float;

  attribute vec2 aGrid;
  attribute vec3 aColor;

  uniform float uAmountX;
  uniform float uAmountY;
  uniform float uSeparation;
  uniform float uCount;
  uniform float uFov;
  uniform float uAspect;
  uniform float uViewportHeight;
  uniform float uWave;

  varying vec3 vColor;

  void main() {
    float ix = aGrid.x;
    float iy = aGrid.y;
    float x = ix * uSeparation - (uAmountX * uSeparation) * 0.5;
    float zBase = iy * uSeparation - (uAmountY * uSeparation - 10.0);
    float y = uWave * (
      sin((ix + uCount) * 0.32) * 7.0 +
      cos((iy + uCount) * 0.24) * 5.0
    );
    float z = zBase + uWave * (
      sin((ix + uCount) * 0.14) +
      cos((iy + uCount) * 0.16)
    ) * 3.0;
    float scale = 0.8 + 0.16 * sin(
      (ix + uCount) * 0.18 + (iy + uCount) * 0.14
    );

    // Match the previous Three.js camera: position (0, 400, 50), Y rotation 0.1.
    vec3 relative = vec3(x, y - 400.0, z - 50.0);
    float cameraCos = cos(0.1);
    float cameraSin = sin(0.1);
    vec3 viewPosition = vec3(
      cameraCos * relative.x - cameraSin * relative.z,
      relative.y,
      cameraSin * relative.x + cameraCos * relative.z
    );

    float nearPlane = 1.0;
    float farPlane = 10000.0;
    float tanHalfFov = tan(radians(uFov) * 0.5);
    float depth = max(-viewPosition.z, 1.0);

    gl_Position = vec4(
      viewPosition.x / (tanHalfFov * uAspect),
      viewPosition.y / tanHalfFov,
      -((farPlane + nearPlane) / (farPlane - nearPlane)) * viewPosition.z
        - (2.0 * farPlane * nearPlane) / (farPlane - nearPlane),
      -viewPosition.z
    );
    gl_PointSize = max(
      1.0,
      scale * 0.9 * uViewportHeight / (tanHalfFov * depth)
    );
    vColor = aColor;
  }
`

const FRAGMENT_SHADER = `
  precision mediump float;
  varying vec3 vColor;

  void main() {
    vec2 point = gl_PointCoord - vec2(0.5);
    if (dot(point, point) > 0.25) discard;
    gl_FragColor = vec4(vColor, 1.0);
  }
`

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
) {
  const shader = gl.createShader(type)
  if (!shader) return null

  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function createProgram(gl: WebGLRenderingContext) {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
  if (!vertexShader || !fragmentShader) return null

  const program = gl.createProgram()
  if (!program) return null

  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  gl.deleteShader(vertexShader)
  gl.deleteShader(fragmentShader)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program)
    return null
  }
  return program
}

function hslToRgb(hue: number, saturation: number, lightness: number) {
  if (saturation === 0) return [lightness, lightness, lightness] as const

  const hueToRgb = (p: number, q: number, value: number) => {
    let t = value
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }

  const q = lightness < 0.5
    ? lightness * (1 + saturation)
    : lightness + saturation - lightness * saturation
  const p = 2 * lightness - q

  return [
    hueToRgb(p, q, hue + 1 / 3),
    hueToRgb(p, q, hue),
    hueToRgb(p, q, hue - 1 / 3),
  ] as const
}

export function ThreeWaveBackground({
  wave = true,
  transparent = false,
}: ThreeWaveBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean | null>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updateMotionPreference = () => setPrefersReducedMotion(motionQuery.matches)

    updateMotionPreference()
    motionQuery.addEventListener("change", updateMotionPreference)
    return () => motionQuery.removeEventListener("change", updateMotionPreference)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion !== false) return

    const container = containerRef.current
    if (!container) return

    const { isLowEnd } = detectLowEndDevice()
    const isMobile = window.innerWidth < 768
    const separation = isMobile || isLowEnd ? 90 : 45
    const amountX = isLowEnd ? 35 : isMobile ? 50 : 100
    const amountY = isLowEnd ? 14 : isMobile ? 20 : 35
    const totalParticles = amountX * amountY
    const targetFps = isLowEnd ? 24 : isMobile ? 30 : 60
    const isLightTheme = resolvedTheme === "light"
    const background = isLightTheme ? [1, 1, 1] : [17 / 255, 17 / 255, 17 / 255]

    const canvas = document.createElement("canvas")
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    container.appendChild(canvas)

    const gl = canvas.getContext("webgl", {
      alpha: transparent,
      antialias: false,
      depth: false,
      powerPreference: "low-power",
    })
    if (!gl) {
      canvas.remove()
      return
    }

    const program = createProgram(gl)
    if (!program) {
      canvas.remove()
      return
    }

    const gridData = new Float32Array(totalParticles * 2)
    const colorData = new Float32Array(totalParticles * 3)
    let particle = 0

    for (let ix = 0; ix < amountX; ix += 1) {
      for (let iy = 0; iy < amountY; iy += 1) {
        gridData[particle * 2] = ix
        gridData[particle * 2 + 1] = iy

        const verticalCurve = Math.sin((iy / amountY) * Math.PI)
        const color = isLightTheme
          ? hslToRgb(0, 0, Math.max(0.12, 0.24 + 0.05 * verticalCurve))
          : hslToRgb(0.56 - 0.06 * (ix / amountX), 0.22, 0.5 + 0.08 * verticalCurve)
        const opacity = isLightTheme
          ? 0.28 + 0.14 * verticalCurve
          : 0.2 + 0.14 * verticalCurve

        colorData[particle * 3] = transparent
          ? color[0] * opacity
          : color[0] * opacity + background[0] * (1 - opacity)
        colorData[particle * 3 + 1] = transparent
          ? color[1] * opacity
          : color[1] * opacity + background[1] * (1 - opacity)
        colorData[particle * 3 + 2] = transparent
          ? color[2] * opacity
          : color[2] * opacity + background[2] * (1 - opacity)
        particle += 1
      }
    }

    const bindAttribute = (name: string, size: number, data: Float32Array) => {
      const location = gl.getAttribLocation(program, name)
      const buffer = gl.createBuffer()
      if (location < 0 || !buffer) return null

      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
      gl.enableVertexAttribArray(location)
      gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0)
      return buffer
    }

    gl.useProgram(program)
    const gridBuffer = bindAttribute("aGrid", 2, gridData)
    const colorBuffer = bindAttribute("aColor", 3, colorData)
    if (!gridBuffer || !colorBuffer) {
      gl.deleteProgram(program)
      canvas.remove()
      return
    }

    const uniforms = {
      amountX: gl.getUniformLocation(program, "uAmountX"),
      amountY: gl.getUniformLocation(program, "uAmountY"),
      separation: gl.getUniformLocation(program, "uSeparation"),
      count: gl.getUniformLocation(program, "uCount"),
      fov: gl.getUniformLocation(program, "uFov"),
      aspect: gl.getUniformLocation(program, "uAspect"),
      viewportHeight: gl.getUniformLocation(program, "uViewportHeight"),
      wave: gl.getUniformLocation(program, "uWave"),
    }

    gl.uniform1f(uniforms.amountX, amountX)
    gl.uniform1f(uniforms.amountY, amountY)
    gl.uniform1f(uniforms.separation, separation)
    gl.uniform1f(uniforms.wave, wave ? 1 : 0)
    gl.clearColor(background[0], background[1], background[2], transparent ? 0 : 1)

    let cssWidth = 1
    let cssHeight = 1
    let targetFov = wave ? 100 : 90
    let currentFov = targetFov
    let count = 0
    let lastFrameTime = 0
    let animationFrame = 0
    let isVisible = true
    let isPageVisible = !document.hidden

    const resize = () => {
      cssWidth = wave ? window.innerWidth : container.clientWidth || window.innerWidth
      cssHeight = wave ? window.innerHeight : container.clientHeight || window.innerHeight
      const pixelRatio = wave ? 1 : Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.round(cssWidth * pixelRatio))
      canvas.height = Math.max(1, Math.round(cssHeight * pixelRatio))
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform1f(uniforms.aspect, cssWidth / cssHeight)
      gl.uniform1f(uniforms.viewportHeight, canvas.height)
    }

    const render = (now: number) => {
      animationFrame = window.requestAnimationFrame(render)
      if (!isVisible || !isPageVisible) return

      const frameInterval = 1000 / targetFps
      if (lastFrameTime !== 0 && now - lastFrameTime < frameInterval) return
      lastFrameTime = now

      currentFov += (targetFov - currentFov) * 0.04
      gl.uniform1f(uniforms.count, count)
      gl.uniform1f(uniforms.fov, currentFov)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.POINTS, 0, totalParticles)
      count += 0.018
    }

    const handleScroll = () => {
      targetFov = 100 + Math.min(16, window.scrollY * 0.032)
    }
    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden
    }

    const observer = typeof IntersectionObserver === "undefined"
      ? null
      : new IntersectionObserver(([entry]) => {
          isVisible = entry?.isIntersecting ?? false
        })

    observer?.observe(container)
    window.addEventListener("resize", resize)
    if (wave) window.addEventListener("scroll", handleScroll, { passive: true })
    document.addEventListener("visibilitychange", handleVisibilityChange)

    resize()
    animationFrame = window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      observer?.disconnect()
      window.removeEventListener("resize", resize)
      if (wave) window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      gl.deleteBuffer(gridBuffer)
      gl.deleteBuffer(colorBuffer)
      gl.deleteProgram(program)
      canvas.remove()
    }
  }, [prefersReducedMotion, resolvedTheme, transparent, wave])

  return <div ref={containerRef} className="absolute inset-0 z-0" />
}
