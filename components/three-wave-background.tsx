"use client";

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import * as THREE from "three"

import { detectLowEndDevice } from "@/hooks/use-low-end-device"

export function ThreeWaveBackground({ wave = true }: { wave?: boolean }) {
  const threeRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const { isLowEnd, prefersReducedMotion } = detectLowEndDevice();

    let renderer: THREE.WebGLRenderer | null = null;
    let animationId: number;
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let mesh: THREE.InstancedMesh;
    let count = 0;
    let lastFrameTime = 0;
    let isVisible = true;
    let isPageVisible = typeof document !== 'undefined' ? !document.hidden : true;

    const isMobile = window.innerWidth < 768;
    // Low-end devices get fewer particles (cuts per-frame instance updates
    // roughly in half) and a tighter framerate cap.
    const SEPARATION = isMobile || isLowEnd ? 90 : 45;
    const AMOUNTX = isLowEnd ? 35 : isMobile ? 50 : 100;
    const AMOUNTY = isLowEnd ? 14 : isMobile ? 20 : 35;
    const TOTAL_PARTICLES = AMOUNTX * AMOUNTY;
    const targetFPS = prefersReducedMotion ? 0 : isLowEnd ? 24 : isMobile ? 30 : 60;

    // Scroll state
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
      localRenderer.setSize(width, height, false);
      localRenderer.setClearColor(bgColorHex, 1);
      localRenderer.setPixelRatio(1);
      threeRef.current.appendChild(localRenderer.domElement);
      localRenderer.domElement.style.width = '100%';
      localRenderer.domElement.style.height = '100%';
      renderer = localRenderer;

      const handleScroll = () => {
        scrollY = window.scrollY || window.pageYOffset;
        targetFov = 100 + Math.min(16, scrollY * 0.032);
      };
      window.addEventListener('scroll', handleScroll, { passive: true });

      // Reusable objects
      const dummy = new THREE.Object3D();
      const colorInstance = new THREE.Color();

      function animate() {
        // Skip work entirely while the canvas is offscreen or the tab is
        // hidden — keep the rAF loop alive (cheap) so we resume instantly.
        if (!isVisible || !isPageVisible) {
          animationId = requestAnimationFrame(animate);
          return;
        }

        // Throttle to the resolved target FPS to reduce CPU/GPU load.
        // Always allow the first frame through so reduced-motion users (who
        // have an effectively infinite frame interval) still see one render.
        const now = performance.now();
        const frameInterval = 1000 / targetFPS;
        if (lastFrameTime !== 0 && now - lastFrameTime < frameInterval) {
          animationId = requestAnimationFrame(animate);
          return;
        }
        lastFrameTime = now;

        let i = 0;

        for (let ix = 0; ix < AMOUNTX; ix++) {
          for (let iy = 0; iy < AMOUNTY; iy++) {

            const xPos = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
            const zPosBase = iy * SEPARATION - (AMOUNTY * SEPARATION - 10);

            const yPos = wave
              ? Math.sin((ix + count) * 0.45) * 16 +
                Math.cos((iy + count) * 0.32) * 12
              : 0;

            const zPos = wave
              ? (Math.sin((ix + count) * 0.18) + Math.cos((iy + count) * 0.22)) * 8 +
                zPosBase
              : zPosBase;

            const scale = 1.2 + 0.45 * Math.sin((ix + count) * 0.25 + (iy + count) * 0.18);

            dummy.position.set(xPos, yPos, zPos);
            dummy.scale.set(scale, scale, scale);
            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);

            colorInstance.setRGB(originalColors[i*3], originalColors[i*3+1], originalColors[i*3+2]);
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

      // Reduced-motion users get a single static frame and no rAF loop.
      if (prefersReducedMotion) {
        cancelAnimationFrame(animationId);
      }

      // Pause the wave update when the canvas scrolls out of view so the
      // expensive instance-matrix loop only runs when the user can actually
      // see it.
      let visibilityObserver: IntersectionObserver | null = null;
      if (typeof IntersectionObserver !== 'undefined' && threeRef.current) {
        visibilityObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              isVisible = entry.isIntersecting;
            });
          },
          { threshold: 0 }
        );
        visibilityObserver.observe(threeRef.current);
      }

      const handleVisibilityChange = () => {
        isPageVisible = !document.hidden;
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);

      const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        if (renderer) {
          renderer.setSize(width, height, false);
        }
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        if (visibilityObserver) visibilityObserver.disconnect();
        if (renderer) {
          renderer.dispose();
          if (renderer.domElement && renderer.domElement.parentNode) {
            renderer.domElement.parentNode.removeChild(renderer.domElement);
          }
        }
        cancelAnimationFrame(animationId);
      };
    }
  }, [theme, wave]);

  return (
    <div
      ref={threeRef}
      className="absolute inset-0 z-0"
    ></div>
  )
}
