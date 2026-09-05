'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import { cssTokenColor } from '@/lib/css-token-color'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { createWebGLRenderer, releaseWebGLRenderer } from '@/lib/webgl'

const WIDTH = 26
const STRAND_PATH = new THREE.LineCurve3(
  new THREE.Vector3(-WIDTH / 2, 0, 0),
  new THREE.Vector3(WIDTH / 2, 0, 0),
)
const WAVE_SPEED = (Math.PI * 2) / 8
const REVEAL_MS = 800
const REVEAL_OPACITY = 0.25

type Controls = {
  play: () => void
  pause: () => void
}

function easeOutCubic(p: number) {
  return 1 - (1 - Math.min(1, Math.max(0, p))) ** 3
}

function fract(v: number) {
  return v - Math.floor(v)
}

function brandPair(fromMix: number, toMix: number) {
  const brand = new THREE.Color(cssTokenColor('--brand-primary'))
  const white = new THREE.Color('#ffffff')
  return {
    from: brand.clone().lerp(white, fromMix),
    to: brand.clone().lerp(white, toMix),
  }
}

function buildFamily(
  strandCount: number,
  radius: number,
  family: number,
  colFrom: THREE.Color,
  colTo: THREE.Color,
  alphaLo: number,
  alphaHi: number,
) {
  const template = new THREE.TubeGeometry(STRAND_PATH, 220, radius, 5, false)
  const parts: THREE.BufferGeometry[] = []
  const tmpColor = new THREE.Color()

  for (let sIdx = 0; sIdx < strandCount; sIdx++) {
    const geo = template.clone()
    const rand = fract(Math.sin(sIdx * 127.1 + family * 311.7) * 43758.5453)
    const seed = (sIdx / (strandCount - 1)) * 2 - 1 + (rand - 0.5) * 0.1
    const alpha = alphaLo + rand * (alphaHi - alphaLo)
    const count = geo.attributes.position.count

    geo.setAttribute('aSeed', new THREE.BufferAttribute(new Float32Array(count).fill(seed), 1))
    geo.setAttribute('aFamily', new THREE.BufferAttribute(new Float32Array(count).fill(family), 1))
    geo.setAttribute('aAlpha', new THREE.BufferAttribute(new Float32Array(count).fill(alpha), 1))

    const colors = new Float32Array(count * 3)
    for (let vIdx = 0; vIdx < count; vIdx++) {
      const gradX = THREE.MathUtils.clamp(geo.attributes.position.getX(vIdx) / WIDTH + 0.5, 0, 1)
      const t = THREE.MathUtils.clamp(rand * 0.45 + gradX * 0.25, 0, 1)
      tmpColor.copy(colFrom).lerp(colTo, t)
      colors[vIdx * 3] = tmpColor.r
      colors[vIdx * 3 + 1] = tmpColor.g
      colors[vIdx * 3 + 2] = tmpColor.b
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    parts.push(geo)
  }

  const merged = mergeGeometries(parts, false)
  template.dispose()
  parts.forEach((part) => part.dispose())
  return merged
}

export function ServiceRibbon({
  active,
  className = 'pointer-events-none block size-full',
}: {
  active: boolean
  glow?: boolean
  hostSelector?: string
  className?: string
}) {
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
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 60)
    camera.position.set(0, 0.4, 14)
    camera.lookAt(0, 0.4, 0)
    const baseRotX = camera.rotation.x
    const baseRotZ = camera.rotation.z

    scene.add(new THREE.AmbientLight(0xffffff, 1.05))
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.3)
    keyLight.position.set(5, 7, 9)
    scene.add(keyLight)

    const uTime = { value: 2.2 }
    const ribbonMat = new THREE.MeshPhysicalMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      roughness: 0.42,
      metalness: 0,
      clearcoat: 0.22,
      clearcoatRoughness: 0.55,
      specularIntensity: 0.2,
    })
    ribbonMat.customProgramCacheKey = () => 'service-ribbon'
    ribbonMat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = uTime
      shader.vertexShader =
        'uniform float uTime;\n' +
        'attribute float aSeed;\n' +
        'attribute float aFamily;\n' +
        'attribute float aAlpha;\n' +
        'varying float vAlpha;\n' +
        shader.vertexShader.replace(
          '#include <begin_vertex>',
          `#include <begin_vertex>
           float x  = position.x;
           float ph = uTime;
           float s  = aSeed;
           float xs  = x + s * 0.70 + aFamily * 1.6;
           float amp = 1.0 + 0.30 * sin(xs * 0.35 + 0.8);
           float w   = ( sin(xs * 0.90 + ph)       * 1.60
                       + sin(xs * 1.80 + ph + 1.3) * 0.32 ) * amp;
           w *= 1.0 + 0.10 * sin(ph);
           w += 0.12 * sin(ph + x * 0.15);
           float drape = (1.0 - s * s) * 1.05 - 0.52;
           transformed.y += w * (1.0 + s * 0.08) * (1.0 - 0.22 * s * s) + drape;
           transformed.z += s * 0.28 - aFamily * 1.1
                          + sin(xs * 0.50 + ph) * 0.12;
           vAlpha = aAlpha;`,
        )
      shader.fragmentShader =
        'varying float vAlpha;\n' +
        shader.fragmentShader.replace(
          '#include <color_fragment>',
          `#include <color_fragment>
           diffuseColor.a *= vAlpha;`,
        )
    }

    const pairA = brandPair(0, 0.42)
    const pairB = brandPair(0.48, 0.82)
    const geoA = buildFamily(70, 0.008, 0, pairA.from, pairA.to, 0.3, 0.9)
    const geoB = buildFamily(40, 0.01, 1, pairB.from, pairB.to, 0.15, 0.5)
    const silkGeo = geoA && geoB ? mergeGeometries([geoA, geoB], false) : geoA
    geoA?.dispose()
    geoB?.dispose()

    const silkMesh = new THREE.Mesh(silkGeo ?? new THREE.BufferGeometry(), ribbonMat)
    const ribbon = new THREE.Group()
    ribbon.add(silkMesh)
    ribbon.position.y = 0.4
    ribbon.position.z = -1
    scene.add(ribbon)

    const host =
      canvas.closest<HTMLElement>('.home__services-stage') ??
      canvas.closest('section') ??
      canvas.parentElement
    let raf = 0
    let running = false
    let revealed = false
    let revealStart = 0
    let elapsed = 0
    let lastNow = 0

    const layout = () => {
      const w = host?.clientWidth || canvas.clientWidth
      const h = host?.clientHeight || canvas.clientHeight
      if (w < 2 || h < 2) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      const dist = Math.abs(camera.position.z - ribbon.position.z)
      const visH = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) * 0.5) * dist
      const visW = visH * camera.aspect
      ribbon.scale.setX((visW * 1.2) / WIDTH)
    }

    const renderPose = (now: number, reducedMotion: boolean) => {
      if (reducedMotion) {
        uTime.value = 2.2
        ribbonMat.opacity = REVEAL_OPACITY
        camera.rotation.z = baseRotZ
        camera.rotation.x = baseRotX
      } else {
        if (lastNow) elapsed += Math.min(0.05, (now - lastNow) * 0.001)
        lastNow = now
        const phase = elapsed * WAVE_SPEED
        uTime.value = phase
        if (revealed && ribbonMat.opacity < REVEAL_OPACITY) {
          ribbonMat.opacity = REVEAL_OPACITY * easeOutCubic((now - revealStart) / REVEAL_MS)
        }
        camera.rotation.z = baseRotZ + Math.sin(phase) * 0.012
        camera.rotation.x = baseRotX + Math.cos(phase) * 0.007
      }
      renderer.render(scene, camera)
    }

    const tick = (now: number) => {
      raf = 0
      if (!activeRef.current || reducedRef.current || document.hidden) {
        running = false
        return
      }
      renderPose(now, false)
      raf = requestAnimationFrame(tick)
    }

    const play = () => {
      layout()
      if (!revealed) {
        revealed = true
        revealStart = performance.now()
      }
      if (reducedRef.current) {
        renderPose(performance.now(), true)
        return
      }
      if (running) return
      running = true
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
    renderPose(performance.now(), reducedRef.current)

    const resize = new ResizeObserver(() => {
      layout()
      if (!running) renderer.render(scene, camera)
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
      silkMesh.geometry.dispose()
      ribbonMat.dispose()
      releaseWebGLRenderer(renderer)
    }
  }, [active])

  useEffect(() => {
    if (active) controlsRef.current?.play()
    else controlsRef.current?.pause()
  }, [active, reduced])

  if (!active) return null

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
