'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cssTokenColor } from '@/lib/css-token-color'
import { createFrameClock } from '@/lib/frame-clock'
import { createWebGLRenderer, releaseWebGLRenderer } from '@/lib/webgl'

const VERTEX = /* glsl */ `
varying vec3 vNormal;
varying vec3 vView;
void main() {
  vNormal = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vView = mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`

const FRAGMENT = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uFresPow;
uniform float uBaseAlpha;
uniform float uGain;
uniform float uAlphaMul;
varying vec3 vNormal;
varying vec3 vView;
void main() {
  float fres = pow(clamp(1.0 - abs(dot(normalize(vNormal), normalize(-vView))), 0.0, 1.0), uFresPow);
  vec3 col = mix(uColorB, uColorA, fres);
  float alpha = clamp(uBaseAlpha + fres * uAlphaMul, 0.0, 0.5);
  gl_FragColor = vec4(col * uGain, alpha);
}
`

const EASE = cubicBezier(0.28, 0.11, 0.32, 1)
const STAGGER_MS = 80
const ENTER_MS = 600
const FLOAT_PX = 12
const PARALLAX = 0.065
const MAX_DRIFT = THREE.MathUtils.degToRad(1.8)

const RING_PRESETS = [
  { radius: 1.42, tiltX: 1.2, tiltY: 0.3, opacity: 0.2, speed: 0.05 },
  { radius: 1.66, tiltX: -0.9, tiltY: 0.6, opacity: 0.14, speed: -0.04 },
  { radius: 1.9, tiltX: 0.5, tiltY: -0.8, opacity: 0.1, speed: 0.03 },
  { radius: 2.12, tiltX: -0.3, tiltY: 1.1, opacity: 0.08, speed: -0.025 },
] as const

const CELLS = [
  { nx: -0.52, ny: 0.34, z: -0.45, d: 168, phase: 0.2, period: 8.2, segs: 48, rings: 4, motes: 22 },
  { nx: -0.48, ny: -0.38, z: 0.28, d: 92, phase: 1.35, period: 6.4, segs: 32, rings: 2, motes: 12 },
  { nx: 0.5, ny: 0.44, z: 0.18, d: 78, phase: 2.15, period: 9.5, segs: 32, rings: 2, motes: 10 },
  { nx: 0.54, ny: 0.04, z: -0.3, d: 124, phase: 0.72, period: 7.2, segs: 40, rings: 3, motes: 16 },
  { nx: 0.5, ny: -0.36, z: 0.12, d: 176, phase: 2.85, period: 9.8, segs: 48, rings: 4, motes: 22 },
] as const

type BlobMesh = THREE.Mesh<THREE.SphereGeometry, THREE.ShaderMaterial> & {
  userData: {
    basePos: Float32Array
    radius: number
    freq: number
    amp: number
    speed: number
  }
}

type LivingCell = {
  group: THREE.Group
  outer: BlobMesh
  inner: BlobMesh
  filamentA: THREE.Mesh
  filamentB: THREE.Mesh
  coreHalo: THREE.Sprite
  coreHeart: THREE.Sprite
  rings: THREE.Object3D[]
  starsA: THREE.Points
  starsB: THREE.Points
  nx: number
  ny: number
  z: number
  d: number
  phase: number
  period: number
  index: number
  radius: number
  base: THREE.Vector3
  timeOffset: number
}

type Controls = {
  play: () => void
  pause: () => void
}

function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  return (t: number) => {
    if (t <= 0) return 0
    if (t >= 1) return 1
    let start = 0
    let end = 1
    let mid = t
    for (let i = 0; i < 10; i += 1) {
      const x = sampleCurve(mid, x1, x2)
      if (Math.abs(t - x) < 0.0005) break
      if (x < t) start = mid
      else end = mid
      mid = (start + end) / 2
    }
    return sampleCurve(mid, y1, y2)
  }
}

function sampleCurve(t: number, a: number, b: number) {
  const mt = 1 - t
  return 3 * mt * mt * t * a + 3 * mt * t * t * b + t * t * t
}

function isDarkTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark'
}

function glowTexture(stops: Array<[number, string]>) {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  if (!ctx) return new THREE.Texture()
  const glow = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
  stops.forEach(([stop, color]) => glow.addColorStop(stop, color))
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, 256, 256)
  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

const noise3 = (() => {
  const p = new Uint8Array(512)
  const base: number[] = []
  let seed = 1337
  for (let i = 0; i < 256; i += 1) base[i] = i
  const rnd = () => {
    seed = (seed * 16807) % 2147483647
    return seed / 2147483647
  }
  for (let i = 255; i > 0; i -= 1) {
    const j = Math.floor(rnd() * (i + 1))
    const t = base[i]
    base[i] = base[j]
    base[j] = t
  }
  for (let i = 0; i < 512; i += 1) p[i] = base[i & 255]

  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)
  const lerp = (a: number, b: number, t: number) => a + t * (b - a)
  const grad = (h: number, x: number, y: number, z: number) => {
    const hash = h & 15
    const u = hash < 8 ? x : y
    const v = hash < 4 ? y : hash === 12 || hash === 14 ? x : z
    return ((hash & 1) === 0 ? u : -u) + ((hash & 2) === 0 ? v : -v)
  }

  return (x: number, y: number, z: number) => {
    const X = Math.floor(x) & 255
    const Y = Math.floor(y) & 255
    const Z = Math.floor(z) & 255
    const xf = x - Math.floor(x)
    const yf = y - Math.floor(y)
    const zf = z - Math.floor(z)
    const u = fade(xf)
    const v = fade(yf)
    const w = fade(zf)
    const A = p[X] + Y
    const AA = p[A] + Z
    const AB = p[A + 1] + Z
    const B = p[X + 1] + Y
    const BA = p[B] + Z
    const BB = p[B + 1] + Z
    return lerp(
      lerp(
        lerp(grad(p[AA], xf, yf, zf), grad(p[BA], xf - 1, yf, zf), u),
        lerp(grad(p[AB], xf, yf - 1, zf), grad(p[BB], xf - 1, yf - 1, zf), u),
        v,
      ),
      lerp(
        lerp(grad(p[AA + 1], xf, yf, zf - 1), grad(p[BA + 1], xf - 1, yf, zf - 1), u),
        lerp(grad(p[AB + 1], xf, yf - 1, zf - 1), grad(p[BB + 1], xf - 1, yf - 1, zf - 1), u),
        v,
      ),
      w,
    )
  }
})()

function displaceBlob(mesh: BlobMesh, t: number) {
  const data = mesh.userData
  const pos = mesh.geometry.attributes.position
  const base = data.basePos
  const f = data.freq
  const f2 = data.freq * 2.3
  const tt = t * data.speed
  for (let i = 0; i < pos.count; i += 1) {
    const ix = i * 3
    const bx = base[ix]
    const by = base[ix + 1]
    const bz = base[ix + 2]
    const n =
      noise3(bx * f + tt, by * f + tt * 0.7, bz * f - tt * 0.5) +
      0.5 * noise3(bx * f2 - tt * 1.2, by * f2 + tt, bz * f2 + tt * 0.8)
    const r = data.radius * (1 + data.amp * n)
    pos.setXYZ(i, bx * r, by * r, bz * r)
  }
  pos.needsUpdate = true
  mesh.geometry.computeVertexNormals()
}

function membraneMaterial(
  colorA: number,
  colorB: number,
  fresPow: number,
  baseAlpha: number,
  additive: boolean,
) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColorA: { value: new THREE.Color(colorA) },
      uColorB: { value: new THREE.Color(colorB) },
      uFresPow: { value: fresPow },
      uBaseAlpha: { value: baseAlpha },
      uGain: { value: additive ? 0.9 : 1 },
      uAlphaMul: { value: additive ? 0.85 : 0.28 },
    },
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    glslVersion: THREE.GLSL1,
  })
}

function makeBlob(
  segments: number,
  radius: number,
  freq: number,
  amp: number,
  speed: number,
  material: THREE.ShaderMaterial,
) {
  const geometry = new THREE.SphereGeometry(1, segments, segments)
  const mesh = new THREE.Mesh(geometry, material) as BlobMesh
  mesh.userData = {
    basePos: new Float32Array(geometry.attributes.position.array),
    radius,
    freq,
    amp,
    speed,
  }
  return mesh
}

function circleLoop(
  radius: number,
  material: THREE.LineBasicMaterial,
) {
  const pts: THREE.Vector3[] = []
  const seg = 64
  for (let i = 0; i < seg; i += 1) {
    const a = (i / seg) * Math.PI * 2
    pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0))
  }
  return new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), material)
}

function makeParticles(count: number, material: THREE.PointsMaterial) {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i += 1) {
    const dir = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize()
    const rad = 1.35 + Math.random() * 1.5
    positions[i * 3] = dir.x * rad
    positions[i * 3 + 1] = dir.y * rad
    positions[i * 3 + 2] = dir.z * rad
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  return new THREE.Points(geometry, material)
}

function pxToWorld(px: number, camera: THREE.PerspectiveCamera, viewHeight: number, z = 0) {
  const distance = Math.abs(camera.position.z - z)
  const visibleHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * distance
  return (px / viewHeight) * visibleHeight
}

function collectMaterials(cells: LivingCell[]) {
  const materials: THREE.Material[] = []
  cells.forEach((cell) => {
    materials.push(
      cell.outer.material,
      cell.inner.material,
      cell.filamentA.material as THREE.Material,
      cell.filamentB.material as THREE.Material,
      cell.coreHalo.material,
      cell.coreHeart.material,
      cell.starsA.material as THREE.Material,
      cell.starsB.material as THREE.Material,
    )
    cell.rings.forEach((pivot) => {
      pivot.children.forEach((child: THREE.Object3D) => {
        if (child instanceof THREE.Line) {
          const material = child.material
          if (Array.isArray(material)) materials.push(...material)
          else materials.push(material)
        }
      })
    })
  })
  return materials
}

export function HeroCells({ active }: { active: boolean }) {
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
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40)
    camera.position.set(0, 0, 8)

    const additive = isDarkTheme()
    const brand = cssTokenColor('--brand-primary', 0x0e7aff)
    const brandHover = cssTokenColor('--brand-primary-hover', 0x0a6ae8)
    const outerMat = membraneMaterial(0xb9defa, brand, 2.2, 0.04, additive)
    const innerMat = membraneMaterial(0xd6eeff, brandHover, 2.8, 0.05, additive)
    const filamentGeoA = new THREE.IcosahedronGeometry(0.55, 1)
    const filamentGeoB = new THREE.IcosahedronGeometry(0.4, 1)
    const filamentMatA = new THREE.MeshBasicMaterial({
      color: brand,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    })
    const filamentMatB = new THREE.MeshBasicMaterial({
      color: brandHover,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    })
    const haloMap = glowTexture([
      [0, 'rgba(255,255,255,0.9)'],
      [0.22, 'rgba(126,196,245,0.7)'],
      [0.55, 'rgba(0,113,227,0.28)'],
      [1, 'rgba(0,113,227,0)'],
    ])
    const heartMap = glowTexture([
      [0, 'rgba(184,222,250,0.95)'],
      [0.4, 'rgba(0,113,227,0.45)'],
      [1, 'rgba(0,113,227,0)'],
    ])
    const haloMat = new THREE.SpriteMaterial({
      map: haloMap,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    })
    const heartMat = new THREE.SpriteMaterial({
      map: heartMap,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    })
    const starMatA = new THREE.PointsMaterial({
      color: 0x7ec4f5,
      size: 0.022,
      transparent: true,
      opacity: 0.55,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })
    const starMatB = new THREE.PointsMaterial({
      color: 0x5aa8e8,
      size: 0.016,
      transparent: true,
      opacity: 0.4,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })
    const ringMat = new THREE.LineBasicMaterial({
      color: 0x5aa8e8,
      transparent: true,
      opacity: 0.22,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    })

    const cells: LivingCell[] = CELLS.map((spec, index) => {
      const group = new THREE.Group()
      const outer = makeBlob(spec.segs, 1, 1.15, 0.24, 0.22, outerMat)
      const inner = makeBlob(Math.max(24, spec.segs - 16), 0.74, 1.6, 0.1, 0.35, innerMat)
      const filamentA = new THREE.Mesh(filamentGeoA, filamentMatA)
      const filamentB = new THREE.Mesh(filamentGeoB, filamentMatB)
      const coreHalo = new THREE.Sprite(haloMat)
      const coreHeart = new THREE.Sprite(heartMat)
      coreHalo.scale.set(1.15, 1.15, 1)
      coreHeart.scale.set(0.42, 0.42, 1)
      const starsA = makeParticles(spec.motes, starMatA)
      const starsB = makeParticles(Math.max(8, Math.floor(spec.motes * 0.7)), starMatB)
      const ringPivots: THREE.Object3D[] = RING_PRESETS.slice(0, spec.rings).map((ring) => {
        const pivot = new THREE.Object3D()
        pivot.rotation.set(ring.tiltX, ring.tiltY, index * 0.4)
        pivot.add(circleLoop(ring.radius, ringMat))
        pivot.userData.speed = ring.speed * (index % 2 === 0 ? 1 : -1)
        group.add(pivot)
        return pivot
      })

      group.add(outer, inner, filamentA, filamentB, coreHalo, coreHeart, starsA, starsB)
      group.rotation.y = index * 0.85
      scene.add(group)

      return {
        group,
        outer,
        inner,
        filamentA,
        filamentB,
        coreHalo,
        coreHeart,
        rings: ringPivots,
        starsA,
        starsB,
        nx: spec.nx,
        ny: spec.ny,
        z: spec.z,
        d: spec.d,
        phase: spec.phase,
        period: spec.period,
        index,
        radius: 1,
        base: new THREE.Vector3(),
        timeOffset: index * 11.3,
      }
    })

    const applyTheme = () => {
      const nextAdditive = isDarkTheme()
      const blending = nextAdditive ? THREE.AdditiveBlending : THREE.NormalBlending
      outerMat.uniforms.uGain.value = nextAdditive ? 0.9 : 1
      innerMat.uniforms.uGain.value = nextAdditive ? 0.9 : 1
      outerMat.uniforms.uAlphaMul.value = nextAdditive ? 0.85 : 0.28
      innerMat.uniforms.uAlphaMul.value = nextAdditive ? 0.85 : 0.28
      collectMaterials(cells).forEach((material) => {
        material.blending = blending
        material.needsUpdate = true
      })
    }
    applyTheme()

    const root = canvas.parentElement
    const stage = canvas.closest('section')
    let width = 0
    let height = 0
    let raf = 0
    let elapsed = 0
    let enterMs = 0
    let entered = false
    const clock = createFrameClock()

    const layout = () => {
      const nextWidth = root?.clientWidth || canvas.clientWidth || window.innerWidth
      const nextHeight = root?.clientHeight || canvas.clientHeight || window.innerHeight
      const stageW = stage?.clientWidth || nextWidth
      const stageH = stage?.clientHeight || nextHeight
      if (nextWidth === 0 || nextHeight === 0) return
      width = nextWidth
      height = nextHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)

      const narrow = stageW <= 734
      cells.forEach((cell) => {
        const diameter = narrow ? cell.d * 0.62 : cell.d
        const edge = narrow ? 1.08 : 1
        cell.radius = pxToWorld(diameter / 2, camera, height, cell.z)
        cell.base.set(
          pxToWorld((cell.nx * edge * stageW) / 2, camera, height, cell.z),
          pxToWorld((cell.ny * stageH) / 2, camera, height, cell.z),
          cell.z,
        )
        cell.group.position.copy(cell.base)
      })
    }

    const parallaxY = () => {
      if (!stage) return 0
      return pxToWorld(stage.getBoundingClientRect().top * PARALLAX, camera, height)
    }

    const renderPose = (t: number, dt: number, reducedMotion: boolean) => {
      if (activeRef.current && !entered) {
        entered = true
        enterMs = 0
      }
      if (activeRef.current && !reducedMotion && entered) {
        enterMs += dt * 1000
      }

      const floatAmp = pxToWorld(FLOAT_PX, camera, height)
      const shift = parallaxY()

      cells.forEach((cell) => {
        const localT = t + cell.timeOffset
        displaceBlob(cell.outer, localT)
        displaceBlob(cell.inner, localT + 37.7)

        let enter = 1
        if (!reducedMotion) {
          const local = (enterMs - cell.index * STAGGER_MS) / ENTER_MS
          enter = EASE(Math.min(1, Math.max(0, local)))
        }

        const float = reducedMotion
          ? 0
          : Math.sin((t * Math.PI * 2) / cell.period + cell.phase) * floatAmp

        cell.group.position.set(cell.base.x, cell.base.y + float + shift, cell.base.z)
        cell.group.scale.setScalar(cell.radius * enter)
        cell.group.rotation.y += dt * 0.08

        cell.filamentA.rotation.x += dt * 0.12
        cell.filamentA.rotation.y -= dt * 0.16
        cell.filamentB.rotation.y += dt * 0.22
        cell.filamentB.rotation.z -= dt * 0.1

        const pulse = 1 + Math.sin(localT * 1.4) * 0.07
        cell.coreHalo.scale.set(1.15 * pulse, 1.15 * pulse, 1)
        cell.coreHeart.scale.set(0.42 * (2 - pulse), 0.42 * (2 - pulse), 1)

        cell.rings.forEach((pivot) => {
          const speed = pivot.userData.speed as number
          pivot.rotation.z += dt * speed
          pivot.rotation.x += dt * speed * 0.6
        })

        cell.starsA.rotation.y += dt * 0.012
        cell.starsB.rotation.y -= dt * 0.008
      })

      starMatA.opacity = 0.4 + Math.sin(t * 0.9) * 0.12
      starMatB.opacity = 0.32 + Math.cos(t * 0.7) * 0.1

      if (reducedMotion) camera.rotation.set(0, 0, 0)
      else {
        camera.rotation.x = Math.sin(t * 0.11) * (MAX_DRIFT * 0.35)
        camera.rotation.y = Math.sin(t * 0.08 + 0.4) * MAX_DRIFT
      }

      renderer.render(scene, camera)
    }

    const tick = () => {
      raf = 0
      if (!activeRef.current || reducedRef.current || document.hidden) return
      const dt = clock.delta()
      elapsed += dt
      renderPose(elapsed, dt, false)
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

    layout()
    cells.forEach((cell) => {
      displaceBlob(cell.outer, 0.01 + cell.timeOffset)
      displaceBlob(cell.inner, 37.7 + cell.timeOffset)
    })
    renderer.render(scene, camera)

    const resize = new ResizeObserver(() => {
      layout()
      if (!raf) renderer.render(scene, camera)
    })
    if (root) resize.observe(root)
    if (stage && stage !== root) resize.observe(stage)

    const theme = new MutationObserver(() => {
      applyTheme()
      if (!raf) renderer.render(scene, camera)
    })
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    controlsRef.current = { play, pause }
    if (activeRef.current && !reducedRef.current) play()

    return () => {
      controlsRef.current = null
      pause()
      resize.disconnect()
      theme.disconnect()
      cells.forEach((cell) => {
        cell.outer.geometry.dispose()
        cell.inner.geometry.dispose()
        cell.starsA.geometry.dispose()
        cell.starsB.geometry.dispose()
        cell.rings.forEach((pivot) => {
          pivot.children.forEach((child: THREE.Object3D) => {
            if (child instanceof THREE.Line) child.geometry.dispose()
          })
        })
        scene.remove(cell.group)
      })
      filamentGeoA.dispose()
      filamentGeoB.dispose()
      outerMat.dispose()
      innerMat.dispose()
      filamentMatA.dispose()
      filamentMatB.dispose()
      haloMat.dispose()
      heartMat.dispose()
      starMatA.dispose()
      starMatB.dispose()
      ringMat.dispose()
      haloMap.dispose()
      heartMap.dispose()
      releaseWebGLRenderer(renderer)
    }
  }, [active])

  useEffect(() => {
    if (active && !reduced) controlsRef.current?.play()
    else controlsRef.current?.pause()
  }, [active, reduced])

  if (!active) return null

  return <canvas ref={canvasRef} className="pointer-events-none block size-full" aria-hidden="true" />
}
