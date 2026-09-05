'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { createFrameClock } from '@/lib/frame-clock'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { createWebGLRenderer, releaseWebGLRenderer } from '@/lib/webgl'

const VERTEX = /* glsl */ `
void main() {
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

const FRAGMENT = /* glsl */ `
precision highp float;
uniform float uT;
uniform float uGain;
uniform vec2 uR;
uniform vec2 uS;
uniform vec2 uP;

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uR) / min(uS.x, uS.y);
  float w = 0.5 + 0.5 * sin(uT * 0.32);
  float sep = mix(0.05, 0.55, smoothstep(0.12, 0.88, w));
  vec2 c1 = vec2(-sep + 0.06 * sin(uT * 0.21), 0.10 * sin(uT * 0.27));
  vec2 c2 = vec2(sep + 0.05 * cos(uT * 0.17), -0.08 * sin(uT * 0.23));
  vec2 c3 = vec2(0.62 * cos(uT * 0.13 + 2.1), 0.40 * sin(uT * 0.11 + 1.2));
  c1 += uP * 0.07;

  float f = 0.0;
  f += 0.115 / (dot(p - c1, p - c1) + 1.0e-4);
  f += 0.115 / (dot(p - c2, p - c2) + 1.0e-4);
  f += 0.028 / (dot(p - c3, p - c3) + 1.0e-4);

  float th = 1.0;
  float body = smoothstep(th - 0.08, th + 0.02, f);
  float edge = 1.0 - smoothstep(0.0, 0.15, abs(f - th));
  float n1 = smoothstep(0.085, 0.015, length(p - c1));
  float n2 = smoothstep(0.085, 0.015, length(p - c2));
  float n3 = smoothstep(0.05, 0.008, length(p - c3));

  vec3 deep = vec3(0.02, 0.08, 0.18);
  vec3 rim = vec3(0.0, 0.443, 0.89);
  vec3 core = vec3(0.49, 0.77, 0.96);

  vec3 col = deep * body;
  col += rim * edge * 0.9;
  col += core * (n1 + n2) * 0.8;
  col += rim * n3 * 0.75;

  float alpha = clamp(body * 0.55 + edge * 0.7 + n3 * 0.4, 0.0, 0.72);
  float veil = mix(0.18, 1.0, smoothstep(0.14, 0.78, length(p)));
  gl_FragColor = vec4(col * uGain, alpha * veil * uGain);
}
`

const ENTER_MS = 700

type Controls = {
  play: () => void
  pause: () => void
}

function easeOutCubic(x: number) {
  const t = Math.min(1, Math.max(0, x))
  return 1 - (1 - t) ** 3
}

export function IdeaCell({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const controlsRef = useRef<Controls | null>(null)
  const activeRef = useRef(active)
  const reduced = usePrefersReducedMotion()
  const reducedRef = useRef(reduced)

  activeRef.current = active
  reducedRef.current = reduced

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = createWebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))

    const scene = new THREE.Scene()
    const camera = new THREE.Camera()
    const uniforms = {
      uT: { value: 0 },
      uGain: { value: 1 },
      uR: { value: new THREE.Vector2(1, 1) },
      uS: { value: new THREE.Vector2(1, 1) },
      uP: { value: new THREE.Vector2(0, 0) },
    }
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms,
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
    })
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
    quad.frustumCulled = false
    scene.add(quad)

    const frame = canvas.parentElement
    const host =
      canvas.closest<HTMLElement>('.home__idea') ??
      canvas.closest('section') ??
      frame
    const pointer = new THREE.Vector2(0, 0)
    let raf = 0
    let enterMs = 0
    let entered = false
    const clock = createFrameClock()

    const layout = () => {
      const w = frame?.clientWidth || canvas.clientWidth || window.innerWidth
      const h = frame?.clientHeight || canvas.clientHeight
      if (w < 2 || h < 2) return
      renderer.setSize(w, h, false)
      const ratio = renderer.getPixelRatio()
      const stageW = (host?.clientWidth || w) * ratio
      const stageH = (host?.clientHeight || h) * ratio
      uniforms.uR.value.set(renderer.domElement.width, renderer.domElement.height)
      uniforms.uS.value.set(Math.max(stageW, 1), Math.max(stageH, 1))
    }

    const renderPose = (t: number, dt: number, reducedMotion: boolean) => {
      if (activeRef.current && !entered) {
        entered = true
        enterMs = 0
      }
      if (activeRef.current && !reducedMotion && entered) {
        enterMs += dt * 1000
      }

      const enter = reducedMotion ? 1 : easeOutCubic(enterMs / ENTER_MS)
      uniforms.uT.value = reducedMotion ? 4.2 : t
      uniforms.uGain.value = enter
      if (!reducedMotion) {
        uniforms.uP.value.x += (pointer.x - uniforms.uP.value.x) * 0.05
        uniforms.uP.value.y += (-pointer.y - uniforms.uP.value.y) * 0.05
      }
      renderer.render(scene, camera)
    }

    const tick = () => {
      raf = 0
      if (!activeRef.current || reducedRef.current || document.hidden) return
      const dt = clock.delta()
      renderPose(clock.elapsed, dt, false)
      raf = requestAnimationFrame(tick)
    }

    const play = () => {
      layout()
      renderPose(clock.elapsed, 0, reducedRef.current)
      if (raf || reducedRef.current) return
      clock.skipGap()
      raf = requestAnimationFrame(tick)
    }

    const pause = () => {
      if (!raf) return
      cancelAnimationFrame(raf)
      raf = 0
    }

    const onPointer = (event: PointerEvent) => {
      if (!host) return
      const rect = host.getBoundingClientRect()
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    }

    layout()
    renderPose(0, 0, reducedRef.current)

    const resize = new ResizeObserver(() => {
      layout()
      if (!raf) renderer.render(scene, camera)
    })
    if (frame) resize.observe(frame)
    if (host && host !== frame) resize.observe(host)
    host?.addEventListener('pointermove', onPointer)

    controlsRef.current = { play, pause }
    if (activeRef.current && !reducedRef.current) play()

    return () => {
      controlsRef.current = null
      pause()
      resize.disconnect()
      host?.removeEventListener('pointermove', onPointer)
      quad.geometry.dispose()
      material.dispose()
      releaseWebGLRenderer(renderer)
    }
  }, [active])

  useEffect(() => {
    if (active) controlsRef.current?.play()
    else controlsRef.current?.pause()
  }, [active, reduced])

  if (!active) return null

  return <canvas ref={canvasRef} className="pointer-events-none block size-full" aria-hidden="true" />
}
