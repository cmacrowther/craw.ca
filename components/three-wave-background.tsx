"use client";

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import * as THREE from "three"

export function ThreeWaveBackground() {
  const threeRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    let renderer: THREE.WebGLRenderer | null = null;
    let animationId: number;
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let mesh: THREE.InstancedMesh;
    let count = 0;

    const SEPARATION = 45;
    const AMOUNTX = 100;
    const AMOUNTY = 35;
    const TOTAL_PARTICLES = AMOUNTX * AMOUNTY;

    // Mouse and scroll state
    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;
    let smoothMouseX = 0, smoothMouseY = 0;
    let isMouseOver = false;
    let scrollY = 0, targetFov = 100;

    // Store original colors (baked with opacity)
    const originalColors = new Float32Array(TOTAL_PARTICLES * 3);

    // Determine theme-based colors
    const isLightTheme = theme === 'light';
    const bgColorHex = isLightTheme ? 0xffffff : 0x111111;
    const bgR = ((bgColorHex >> 16) & 255) / 255;
    const bgG = ((bgColorHex >> 8) & 255) / 255;
    const bgB = (bgColorHex & 255) / 255;

    const baseHue = isLightTheme ? 0 : 0.6;
    const baseSaturation = isLightTheme ? 0 : 0.6;
    const baseLightness = isLightTheme ? 0.1 : 0.65;

    if (threeRef.current) {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera = new THREE.PerspectiveCamera(100, width / height, 1, 10000);
      camera.position.y = 400;
      camera.position.z = 50;
      camera.rotation.y = 0.1;

      scene = new THREE.Scene();

      // Optimized Geometry: Reduced segments
      const geometry = new THREE.SphereGeometry(1.3, 10, 10);
      // Material: Opaque, using vertex colors
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      mesh = new THREE.InstancedMesh(geometry, material, TOTAL_PARTICLES);

      // Initialize colors
      const tempColor = new THREE.Color();
      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          // Calculate base color
          if (isLightTheme) {
            const lightness = baseLightness + 0.1 * Math.sin(iy / AMOUNTY * Math.PI);
            tempColor.setHSL(0, 0, Math.max(0.05, lightness));
          } else {
            const t = ix / AMOUNTX;
            tempColor.setHSL(baseHue - 0.2 * t, baseSaturation, baseLightness + 0.15 * Math.sin(iy / AMOUNTY * Math.PI));
          }

          // Calculate opacity
          const opacity = isLightTheme
            ? 0.6 + 0.3 * Math.sin(iy / AMOUNTY * Math.PI)
            : 0.45 + 0.25 * Math.sin(iy / AMOUNTY * Math.PI);

          // Bake opacity: Color = Color * Alpha + Bg * (1 - Alpha)
          const finalR = tempColor.r * opacity + bgR * (1 - opacity);
          const finalG = tempColor.g * opacity + bgG * (1 - opacity);
          const finalB = tempColor.b * opacity + bgB * (1 - opacity);

          originalColors[i * 3] = finalR;
          originalColors[i * 3 + 1] = finalG;
          originalColors[i * 3 + 2] = finalB;

          mesh.setColorAt(i, new THREE.Color(finalR, finalG, finalB));
          i++;
        }
      }

      scene.add(mesh);

      const localRenderer = new THREE.WebGLRenderer({ alpha: false, antialias: false });
      localRenderer.setSize(width, height);
      localRenderer.setClearColor(bgColorHex, 1);
      localRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      threeRef.current.appendChild(localRenderer.domElement);
      renderer = localRenderer;

      // Mouse events
      const handleMouseMove = (e: MouseEvent) => {
        if (!threeRef.current) return;
        const rect = threeRef.current.getBoundingClientRect();
        const relY = (e.clientY - rect.top) / rect.height;
        if (relY >= 0.5 && relY <= 1) {
          isMouseOver = true;
          targetMouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          targetMouseY = (relY - 0.5) * 4 - 1;
          mouseX = (e.clientX - rect.left) / rect.width;
          mouseY = (relY - 0.5) * 2;
        } else {
          isMouseOver = false;
        }
      };

      const handleMouseLeave = () => {
        isMouseOver = false;
      };

      if (threeRef.current) {
        threeRef.current.addEventListener('mousemove', handleMouseMove);
        threeRef.current.addEventListener('mouseleave', handleMouseLeave);
      }

      const handleScroll = () => {
        scrollY = window.scrollY || window.pageYOffset;
        targetFov = 100 + Math.min(16, scrollY * 0.032);
      };
      window.addEventListener('scroll', handleScroll);

      // Reusable objects
      const dummy = new THREE.Object3D();
      const colorInstance = new THREE.Color();

      function animate() {
        if (!isMouseOver) {
          targetMouseX = 0;
          targetMouseY = 0;
        }
        smoothMouseX += (targetMouseX - smoothMouseX) * 0.08;
        smoothMouseY += (targetMouseY - smoothMouseY) * 0.08;

        let i = 0;
        const PHASE_INTENSITY = 1.2;
        const AMPLITUDE_INTENSITY = 0.09;
        const AMPLITUDE_BASE = 1;

        const phaseShiftBase = smoothMouseX * PHASE_INTENSITY + smoothMouseY * (PHASE_INTENSITY * 0.6);
        const amplitudeMod = AMPLITUDE_BASE + smoothMouseY * AMPLITUDE_INTENSITY;

        for (let ix = 0; ix < AMOUNTX; ix++) {
          for (let iy = 0; iy < AMOUNTY; iy++) {

            const xPos = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
            const zPosBase = iy * SEPARATION - (AMOUNTY * SEPARATION - 10);

            const yPos =
              Math.sin((ix + count) * (0.45 + smoothMouseX * 0.035) + phaseShiftBase) * 16 * amplitudeMod +
              Math.cos((iy + count) * (0.32 + smoothMouseY * 0.025) + phaseShiftBase) * 12 * amplitudeMod;

            const zPos =
              (Math.sin((ix + count) * 0.18 + phaseShiftBase) + Math.cos((iy + count) * 0.22 + phaseShiftBase)) * 8 +
              zPosBase;

            const scale = 1.2 + 0.45 * Math.sin((ix + count) * 0.25 + (iy + count) * 0.18 + phaseShiftBase);

            dummy.position.set(xPos, yPos, zPos);
            dummy.scale.set(scale, scale, scale);
            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);

            // Color logic
            // Reset to original (baked)
            const origR = originalColors[i*3];
            const origG = originalColors[i*3+1];
            const origB = originalColors[i*3+2];
            colorInstance.setRGB(origR, origG, origB);

            if (isMouseOver) {
              const px = ix / AMOUNTX;
              const py = iy / AMOUNTY;
              const dist = Math.sqrt((px - mouseX) ** 2 + (py - mouseY) ** 2);

              if (dist < 0.18) {
                // Apply lightness/hue shift on top of baked color?
                // The original logic shifted HSL.
                // We have RGB.
                // We should un-bake? No, that's expensive.
                // We can just apply the shift to the baked color. It won't be mathematically identical but visually close.
                // Or we can recalculate from scratch if we knew the original HSL.
                // For performance, let's just shift the current RGB.

                // Original logic:
                // Light: L += 0.1 * (1 - dist/0.18)
                // Dark: H += 0.035 * ...

                // We'll just brighten/hue shift the baked color.
                if (isLightTheme) {
                  const lightnessShift = 0.1 * (1 - dist / 0.18);
                  const hsl = { h: 0, s: 0, l: 0 };
                  colorInstance.getHSL(hsl);
                  // Clamp L to avoid blowing out
                   colorInstance.setHSL(hsl.h, hsl.s, Math.min(1.0, hsl.l + lightnessShift));
                } else {
                  const hueShift = 0.035 * (1 - dist / 0.18);
                  const hsl = { h: 0, s: 0, l: 0 };
                  colorInstance.getHSL(hsl);
                  colorInstance.setHSL(hsl.h + hueShift, hsl.s, hsl.l);
                }
              }
            }

            mesh.setColorAt(i, colorInstance);
            i++;
          }
        }

        mesh.instanceMatrix.needsUpdate = true;
        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

        camera.fov += (targetFov - camera.fov) * 0.04;
        camera.updateProjectionMatrix();

        if (renderer) {
          renderer.render(scene, camera);
        }
        count += 0.07;
        animationId = requestAnimationFrame(animate);
      }
      animate();

      const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        if (renderer) {
          renderer.setSize(width, height);
        }
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
        if (threeRef.current) {
          threeRef.current.removeEventListener('mousemove', handleMouseMove);
          threeRef.current.removeEventListener('mouseleave', handleMouseLeave);
        }
        if (renderer) {
          renderer.dispose();
          if (renderer.domElement && renderer.domElement.parentNode) {
            renderer.domElement.parentNode.removeChild(renderer.domElement);
          }
        }
        cancelAnimationFrame(animationId);
      };
    }
  }, [theme]);

  return (
    <div
      ref={threeRef}
      className="absolute inset-0 z-0"
    ></div>
  )
}
