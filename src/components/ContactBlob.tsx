'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { createWebGLRenderer, releaseWebGLRenderer } from '@/lib/webgl'

const FOV = 38
const CAMERA_Z = 6.5
const LOOK_Y = 0
const FLOW_SPEED = 0.16
const PIPE_COLORS = [0xffae1c, 0x5916eb, 0x00b996, 0x97019a] as const

type Controls = {
  play: () => void
  pause: () => void
}

export function ContactBlob({ active }: { active: boolean }) {
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
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 60)
    camera.position.set(0, LOOK_Y, CAMERA_Z)
    camera.lookAt(0, LOOK_Y, 0)

    scene.add(new THREE.AmbientLight(0xffffff, 0.9))
    const key = new THREE.DirectionalLight(0xffffff, 0.5)
    key.position.set(2.5, 3, 4)
    scene.add(key)

    const group = new THREE.Group()
    group.position.y = -0.55
    scene.add(group)

    const uTime = { value: 1.2 }
    const knotMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.42,
      metalness: 0,
      clearcoat: 0.28,
      clearcoatRoughness: 0.55,
      transparent: true,
      opacity: 0.92,
    })
    knotMat.customProgramCacheKey = () => 'contact-pipe'
    knotMat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = uTime
      shader.uniforms.uC0 = { value: new THREE.Color(PIPE_COLORS[0]) }
      shader.uniforms.uC1 = { value: new THREE.Color(PIPE_COLORS[1]) }
      shader.uniforms.uC2 = { value: new THREE.Color(PIPE_COLORS[2]) }
      shader.uniforms.uC3 = { value: new THREE.Color(PIPE_COLORS[3]) }
      shader.vertexShader =
        'varying vec2 vPipeUv;\n' +
        shader.vertexShader.replace(
          '#include <uv_vertex>',
          `#include <uv_vertex>
           vPipeUv = uv;`,
        )
      shader.fragmentShader =
        'uniform float uTime;\n' +
        'uniform vec3 uC0;\n' +
        'uniform vec3 uC1;\n' +
        'uniform vec3 uC2;\n' +
        'uniform vec3 uC3;\n' +
        'varying vec2 vPipeUv;\n' +
        shader.fragmentShader.replace(
          '#include <color_fragment>',
          `#include <color_fragment>
           float t = fract(vPipeUv.x * 2.0 - uTime);
           vec3 cA = mix(uC0, uC1, smoothstep(0.0, 1.0, t * 4.0));
           vec3 cB = mix(uC1, uC2, smoothstep(0.0, 1.0, t * 4.0 - 1.0));
           vec3 cC = mix(uC2, uC3, smoothstep(0.0, 1.0, t * 4.0 - 2.0));
           vec3 cD = mix(uC3, uC0, smoothstep(0.0, 1.0, t * 4.0 - 3.0));
           vec3 pipe = t < 0.25 ? cA : t < 0.5 ? cB : t < 0.75 ? cC : cD;
           float rim = smoothstep(0.0, 0.45, abs(vPipeUv.y - 0.5) * 2.0);
           diffuseColor.rgb = mix(pipe, pipe * 0.72, rim * 0.35);`,
        )
    }
    const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.8, 0.25, 160, 14), knotMat)
    group.add(knot)

    const section =
      canvas.closest<HTMLElement>('#contact') ?? canvas.closest('section')
    const frame = canvas.parentElement
    const host = frame ?? section

    let raf = 0
    let running = false
    let elapsed = 0
    let lastNow = 0

    const tmp = new THREE.Vector3()
    const layout = () => {
      const w = host?.clientWidth || canvas.clientWidth
      const h = host?.clientHeight || canvas.clientHeight
      if (w < 2 || h < 2) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      const visH = 2 * Math.tan(THREE.MathUtils.degToRad(FOV) * 0.5) * CAMERA_Z
      const fill = (w < 640 ? 0.38 : 0.42) * 1.3 * 0.7
      const objPx = Math.min(section?.clientWidth || w, 860) * fill
      const world = visH * (objPx / h)
      group.scale.setScalar(world / 2.2)

      const ctas = section?.querySelector<HTMLElement>('.home__actions--contact')
      if (ctas && host) {
        const hostRect = host.getBoundingClientRect()
        const ctaRect = ctas.getBoundingClientRect()
        const dyPx = (ctaRect.top + ctaRect.bottom) / 2 - (hostRect.top + hostRect.height / 2)
        group.position.y = LOOK_Y - (dyPx / h) * visH
        group.updateMatrixWorld(true)
        camera.position.set(0, LOOK_Y, CAMERA_Z)
        camera.lookAt(0, LOOK_Y, 0)
        camera.updateMatrixWorld()
        if (!knot.geometry.boundingBox) knot.geometry.computeBoundingBox()
        const box = knot.geometry.boundingBox
        let bottomPx = ctaRect.bottom
        if (box) {
          const corners = [
            [box.min.x, box.min.y, box.min.z],
            [box.min.x, box.min.y, box.max.z],
            [box.min.x, box.max.y, box.min.z],
            [box.min.x, box.max.y, box.max.z],
            [box.max.x, box.min.y, box.min.z],
            [box.max.x, box.min.y, box.max.z],
            [box.max.x, box.max.y, box.min.z],
            [box.max.x, box.max.y, box.max.z],
          ] as const
          for (const [x, y, z] of corners) {
            tmp.set(x, y, z).applyMatrix4(knot.matrixWorld).project(camera)
            const sy = hostRect.top + (1 - tmp.y) * 0.5 * hostRect.height
            if (sy > bottomPx) bottomPx = sy
          }
        }
        const below = Math.max(0, Math.ceil(bottomPx - ctaRect.bottom))
        section?.style.setProperty('--contact-object-below', `${below}px`)
      } else {
        group.position.y = -0.55 + world * 0.3
      }
    }

    const poseAt = (t: number, reducedMotion: boolean) => {
      if (reducedMotion) {
        uTime.value = 1.2
        knot.rotation.y = 1.2 * 0.14
        knot.rotation.x = Math.sin(1.2 * 0.06) * 0.12
        camera.position.set(0, LOOK_Y, CAMERA_Z)
      } else {
        uTime.value = t * FLOW_SPEED
        knot.rotation.y = t * 0.14
        knot.rotation.x = Math.sin(t * 0.06) * 0.12
        camera.position.x = Math.sin(t * 0.12) * 0.12
        camera.position.y = LOOK_Y + Math.cos(t * 0.09) * 0.09
        camera.position.z = CAMERA_Z
      }
      camera.lookAt(0, LOOK_Y, 0)
      renderer.render(scene, camera)
    }

    const tick = (now: number) => {
      raf = 0
      if (!activeRef.current || reducedRef.current || document.hidden) {
        running = false
        return
      }
      if (lastNow) elapsed += Math.min(0.05, (now - lastNow) * 0.001)
      lastNow = now
      poseAt(elapsed, false)
      raf = requestAnimationFrame(tick)
    }

    const play = () => {
      layout()
      if (reducedRef.current) {
        poseAt(1.2, true)
        return
      }
      if (running) return
      running = true
      lastNow = 0
      raf = requestAnimationFrame(tick)
    }

    const pause = () => {
      running = false
      lastNow = 0
      if (!raf) return
      cancelAnimationFrame(raf)
      raf = 0
    }

    layout()
    poseAt(1.2, reducedRef.current)

    const resize = new ResizeObserver(() => {
      layout()
      if (!running) poseAt(elapsed || 1.2, reducedRef.current)
    })
    if (host) resize.observe(host)

    const onVisibility = () => {
      if (document.hidden) pause()
      else if (activeRef.current) play()
    }
    document.addEventListener('visibilitychange', onVisibility)

    controlsRef.current = { play, pause }
    if (activeRef.current) play()

    return () => {
      controlsRef.current = null
      pause()
      resize.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      knot.geometry.dispose()
      knotMat.dispose()
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
