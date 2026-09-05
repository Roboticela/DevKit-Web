'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { createFrameClock } from './frame-clock'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'
import { createWebGLRenderer, releaseWebGLRenderer } from './webgl'
const POINTS = 36
const SPREAD_X = 9
const SPREAD_Y = 5.4
const SPREAD_Z = 2.2
const DRIFT_PERIOD_MIN = 26
const DRIFT_PERIOD_MAX = 46
const DRIFT_AMP_MIN = 0.28
const DRIFT_AMP_MAX = 0.62
const PALETTE = [0xffae1c, 0x5916eb, 0x00b996, 0x97019a]

type Controls = {
  play: () => void
  pause: () => void
}

function isDarkTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark'
}

function discTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  if (!ctx) return new THREE.Texture()
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.arc(32, 32, 30, 0, Math.PI * 2)
  ctx.fill()
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

export function TrustField({ active }: { active: boolean }) {
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

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 40)
    camera.position.set(0, 0, 7)

    const positions = new Float32Array(POINTS * 3)
    const home = new Float32Array(POINTS * 3)
    const colors = new Float32Array(POINTS * 3)
    const phaseX = new Float32Array(POINTS)
    const phaseY = new Float32Array(POINTS)
    const phaseZ = new Float32Array(POINTS)
    const speedX = new Float32Array(POINTS)
    const speedY = new Float32Array(POINTS)
    const speedZ = new Float32Array(POINTS)
    const ampX = new Float32Array(POINTS)
    const ampY = new Float32Array(POINTS)
    const ampZ = new Float32Array(POINTS)
    const tint = new THREE.Color()
    const period = () =>
      (Math.PI * 2) / (DRIFT_PERIOD_MIN + Math.random() * (DRIFT_PERIOD_MAX - DRIFT_PERIOD_MIN))
    const amp = () => DRIFT_AMP_MIN + Math.random() * (DRIFT_AMP_MAX - DRIFT_AMP_MIN)
    for (let i = 0; i < POINTS; i += 1) {
      home[i * 3] = (Math.random() - 0.5) * SPREAD_X
      home[i * 3 + 1] = (Math.random() - 0.5) * SPREAD_Y
      home[i * 3 + 2] = (Math.random() - 0.5) * SPREAD_Z
      positions[i * 3] = home[i * 3]
      positions[i * 3 + 1] = home[i * 3 + 1]
      positions[i * 3 + 2] = home[i * 3 + 2]
      phaseX[i] = Math.random() * Math.PI * 2
      phaseY[i] = Math.random() * Math.PI * 2
      phaseZ[i] = Math.random() * Math.PI * 2
      speedX[i] = period()
      speedY[i] = period()
      speedZ[i] = period()
      ampX[i] = amp()
      ampY[i] = amp() * 0.75
      ampZ[i] = amp() * 0.45
      tint.setHex(PALETTE[i % PALETTE.length])
      colors[i * 3] = tint.r
      colors[i * 3 + 1] = tint.g
      colors[i * 3 + 2] = tint.b
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const posAttr = geometry.getAttribute('position')

    const disc = discTexture()
    const material = new THREE.PointsMaterial({
      map: disc,
      vertexColors: true,
      size: 3,
      sizeAttenuation: false,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    })
    const field = new THREE.Points(geometry, material)
    field.frustumCulled = false
    scene.add(field)

    const frame = canvas.parentElement
    const host = canvas.closest<HTMLElement>('.home__trust') ?? canvas.closest('section') ?? frame

    let raf = 0
    let simT = 0
    const clock = createFrameClock()

    const applyTheme = () => {
      material.opacity = isDarkTheme() ? 0.7 : 0.55
    }

    const layout = () => {
      const w = frame?.clientWidth || canvas.clientWidth || window.innerWidth
      const h = frame?.clientHeight || canvas.clientHeight
      if (w < 2 || h < 2) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      material.size = 3 * renderer.getPixelRatio()
    }

    const renderPose = () => {
      for (let i = 0; i < POINTS; i += 1) {
        const i3 = i * 3
        positions[i3] = home[i3] + Math.sin(simT * speedX[i] + phaseX[i]) * ampX[i]
        positions[i3 + 1] = home[i3 + 1] + Math.cos(simT * speedY[i] + phaseY[i]) * ampY[i]
        positions[i3 + 2] = home[i3 + 2] + Math.sin(simT * speedZ[i] + phaseZ[i]) * ampZ[i]
      }
      posAttr.needsUpdate = true
      renderer.render(scene, camera)
    }

    const tick = () => {
      raf = 0
      if (!activeRef.current || reducedRef.current || document.hidden) return
      simT += clock.delta()
      renderPose()
      raf = requestAnimationFrame(tick)
    }

    const play = () => {
      if (raf || reducedRef.current) return
      clock.skipGap()
      raf = requestAnimationFrame(tick)
    }

    const pause = () => {
      if (!raf) return
      cancelAnimationFrame(raf)
      raf = 0
    }

    applyTheme()
    layout()
    renderPose()

    const resize = new ResizeObserver(() => {
      layout()
      if (!raf) renderPose()
    })
    if (frame) resize.observe(frame)
    if (host && host !== frame) resize.observe(host)

    const theme = new MutationObserver(() => {
      applyTheme()
      if (!raf) renderPose()
    })
    theme.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    controlsRef.current = { play, pause }
    if (activeRef.current && !reducedRef.current) play()

    return () => {
      controlsRef.current = null
      pause()
      resize.disconnect()
      theme.disconnect()
      geometry.dispose()
      disc.dispose()
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
