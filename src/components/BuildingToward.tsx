'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { Line2 } from 'three/addons/lines/Line2.js'
import { LineGeometry } from 'three/addons/lines/LineGeometry.js'
import { LineMaterial } from 'three/addons/lines/LineMaterial.js'
import { cssTokenColor } from '@/lib/css-token-color'
import { cn } from '@/lib/cn'
import {
  landingBuilding,
  landingBuildingCanvas,
  landingBuildingContent,
  landingBuildingEyebrow,
  landingBuildingHeadline,
  landingBuildingPin,
  landingBuildingProse,
  landingEase,
} from '@/lib/landing'
import { createWebGLRenderer, releaseWebGLRenderer } from '@/lib/webgl'

const COL = {
  blue: 0x0e7aff,
  line: 0x3d8bff,
  att: 0x0e7aff,
  ambient: 0x22334f,
  key: 0xeaf2ff,
  glow: 0x9cc7ff,
}

const CFG = {
  fov: 40,
  camZ: 10,
  latticeRadius: 1.6,
  latticeZ: -5.3,
  drift: 0.12,
}

const SAT_DEFS = [
  { t: 'cube', nx: -0.96, ny: 0.74, s: 0.55, rot: [0.5, 0.4, 0.3], bend: 0.14, z: 0.2 },
  { t: 'box', nx: 0.96, ny: 0.8, s: 0.6, rot: [0.4, 0.3, 0.5], bend: -0.14, z: -0.2 },
  { t: 'box', nx: -0.98, ny: 0.18, s: 0.5, rot: [0.5, 0.5, 0.2], bend: 0.12, z: 0.1 },
  { t: 'cap', nx: 0.98, ny: 0.28, s: 0.62, rot: [0.2, 0.3, 1.25], bend: -0.16, z: 0.0 },
  { t: 'cap', nx: -0.98, ny: -0.28, s: 0.64, rot: [0.2, 0.2, 1.35], bend: 0.16, z: -0.1 },
  { t: 'box', nx: 0.96, ny: -0.22, s: 0.55, rot: [0.6, 0.4, 0.3], bend: -0.12, z: 0.2 },
  { t: 'box', nx: -0.9, ny: -0.82, s: 0.5, rot: [0.4, 0.6, 0.4], bend: 0.12, z: 0.0 },
  { t: 'box', nx: 0.9, ny: -0.82, s: 0.45, rot: [0.5, 0.4, 0.2], bend: -0.14, z: -0.2 },
] as const

const TRAIL_PTS = 41

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v))
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function smoothstep(x: number) {
  const t = clamp01(x)
  return t * t * (3 - 2 * t)
}

function mulberry32(a: number) {
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = t + Math.imul(t ^ (t >>> 7), 61 | t) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type Cell = {
  mesh: THREE.Mesh
  slot: THREE.Vector3
  scatter: THREE.Vector3
  scatterRot: THREE.Euler
  slotRot: THREE.Euler
  nearOff: THREE.Vector3
  nearRot: THREE.Euler
  i: number
  glowSpecs?: readonly string[]
  glows?: THREE.Sprite[]
}

type Bead = {
  halo: THREE.Sprite
  core: THREE.Sprite
}

type Satellite = {
  t: (typeof SAT_DEFS)[number]['t']
  nx: number
  ny: number
  s: number
  rot: readonly [number, number, number]
  bend: number
  z: number
  mesh: THREE.Mesh
  glow: THREE.Sprite
  i: number
  rest: THREE.Vector3
  start: THREE.Vector3
  end: THREE.Vector3
  phase: number
  pOff: number
  trailPos: Float32Array
  trailMat: LineMaterial
  haloMat: LineMaterial
  trailGeo: LineGeometry
  halo: Line2
  trail: Line2
  beads: Bead[]
  pulse: THREE.Sprite
}

type Edge = {
  line: Line2
  mat: LineMaterial
  haloMat: LineMaterial
  geo: LineGeometry
  pos: Float32Array
  a: Cell
  b: Cell
}

export type RoadmapSectionContent = {
  eyebrow: string
  title: string
  paragraphs: string[]
}

export const ROADMAP_SECTION_CONTENT: RoadmapSectionContent = {
  eyebrow: "What We're Building Toward",
  title: "One product doesn't say much on its own. Neither does one service.",
  paragraphs: [
    "But small things, done well, add up. That's the plan. Not one big product, but many small ones that work well together.",
    "We're just a few pieces in. There's a lot more coming.",
  ],
}

export function BuildingToward({ content }: { content?: Partial<RoadmapSectionContent> } = {}) {
  const copy = {
    ...ROADMAP_SECTION_CONTENT,
    ...content,
    paragraphs: content?.paragraphs ?? ROADMAP_SECTION_CONTENT.paragraphs,
  }
  const sectionRef = useRef<HTMLElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const wrap = wrapRef.current
    if (!section || !wrap) return

    let cancelled = false
    let disposeScene: (() => void) | undefined

    const boot = () => {
      if (cancelled || disposeScene) return

    const brand = cssTokenColor('--brand-primary', 0x0e7aff)
    COL.blue = brand
    COL.att = brand

    const rand = mulberry32(1234)

    const renderer = createWebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.domElement.setAttribute('aria-hidden', 'true')
    wrap.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(CFG.fov, 1, 0.1, 100)
    camera.position.set(0, 0, CFG.camZ)
    const CAM_TARGET = new THREE.Vector3(0, -0.7, -2.0)
    let camY = 0
    let clusterY = -2.5

    const pmrem = new THREE.PMREMGenerator(renderer)
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    pmrem.dispose()

    scene.add(new THREE.AmbientLight(COL.ambient, 0.5))
    const key = new THREE.DirectionalLight(COL.key, 1.1)
    key.position.set(4, 6, 8)
    scene.add(key)
    const core = new THREE.PointLight(COL.blue, 1.2, 12)
    scene.add(core)

    let halfH = 3.64
    let halfW = 5.46
    const clusterCenter = new THREE.Vector3(0, -2.5, -3.0)

    const cellMaterial = (rough: number) => {
      const m = new THREE.MeshPhysicalMaterial({
        color: 0x0a1e3f,
        metalness: 0.0,
        roughness: rough,
        transmission: 1.0,
        thickness: 1.2,
        ior: 1.45,
        clearcoat: 0.35,
        clearcoatRoughness: 0.25,
        specularIntensity: 0.6,
        attenuationColor: new THREE.Color(COL.att),
        attenuationDistance: 2.5,
        emissive: 0x03132e,
        emissiveIntensity: 0.6,
        envMapIntensity: 0.7,
      })
      m.onBeforeCompile = (sh) => {
        sh.fragmentShader = sh.fragmentShader.replace(
          '#include <emissivemap_fragment>',
          `#include <emissivemap_fragment>
       float glassFres = pow(1.0 - saturate(dot(normal, normalize(vViewPosition))), 3.2);
       totalEmissiveRadiance += vec3(0.05, 0.42, 1.0) * glassFres * 1.15;`,
        )
      }
      m.customProgramCacheKey = () => 'glass-rim'
      return m
    }
    const cellMats = [cellMaterial(0.22), cellMaterial(0.28), cellMaterial(0.34)]

    const glowCanvas = document.createElement('canvas')
    glowCanvas.width = glowCanvas.height = 128
    const gx = glowCanvas.getContext('2d')
    const glowTex = new THREE.CanvasTexture(glowCanvas)
    if (gx) {
      const g = gx.createRadialGradient(64, 64, 0, 64, 64, 64)
      g.addColorStop(0.0, 'rgba(235,246,255,1)')
      g.addColorStop(0.12, 'rgba(126,185,255,0.95)')
      g.addColorStop(0.35, 'rgba(10,132,255,0.32)')
      g.addColorStop(1.0, 'rgba(10,132,255,0)')
      gx.fillStyle = g
      gx.fillRect(0, 0, 128, 128)
      glowTex.colorSpace = THREE.SRGBColorSpace
    }

    const glowSprite = (scale: number, opacity: number, order: number) => {
      const m = new THREE.SpriteMaterial({
        map: glowTex,
        color: COL.glow,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: false,
      })
      const s = new THREE.Sprite(m)
      s.scale.setScalar(scale)
      s.renderOrder = order
      return s
    }

    const lattice = new THREE.Group()
    lattice.position.set(0, -2.62, CFG.latticeZ)
    lattice.scale.setScalar(0.99)
    scene.add(lattice)
    core.position.copy(lattice.position)
    lattice.add(glowSprite(6.0, 0.18, 0))

    const cellGeo = new RoundedBoxGeometry(0.9, 0.9, 0.9, 6, 0.357)
    const cells: Cell[] = []
    const hexAngles = [90, 30, -30, -90, -150, 150]

    const addCell = (slot: THREE.Vector3) => {
      const mesh = new THREE.Mesh(cellGeo, cellMats[cells.length % 3])
      mesh.renderOrder = 1
      const cell: Cell = {
        mesh,
        slot: slot.clone().add(new THREE.Vector3(0, 0, (rand() * 2 - 1) * 0.15)),
        scatter: new THREE.Vector3(),
        scatterRot: new THREE.Euler(rand() * 1.2 - 0.6, rand() * 1.2 - 0.6, rand() * 0.8 - 0.4),
        slotRot: new THREE.Euler(0, 0, 0),
        nearOff: new THREE.Vector3(),
        nearRot: new THREE.Euler(),
        i: cells.length,
      }
      const dir = new THREE.Vector3(rand() * 2 - 1, rand() * 2 - 1, (rand() * 2 - 1) * 0.4).normalize()
      cell.nearOff.copy(dir).multiplyScalar(0.55 + rand() * 0.3)
      cell.nearRot.set(0, 0, 0)
      lattice.add(mesh)
      cells.push(cell)
    }

    addCell(new THREE.Vector3(0, 0, 0))
    hexAngles.forEach((a) => {
      const r = THREE.MathUtils.degToRad(a)
      addCell(new THREE.Vector3(Math.cos(r) * CFG.latticeRadius, Math.sin(r) * CFG.latticeRadius, 0))
    })

    const addCellGlows = (cell: Cell, specs: readonly string[]) => {
      cell.glowSpecs = specs
      cell.glows = specs.map(() => {
        const g = glowSprite(0.34, 0.95, 5)
        cell.mesh.add(g)
        return g
      })
    }
    addCellGlows(cells[1], ['top', 'bottom'])
    addCellGlows(cells[2], ['top', 'bottomLeft'])
    addCellGlows(cells[3], ['top', 'bottomLeft'])
    addCellGlows(cells[4], ['top', 'bottomLeft', 'bottomRight'])
    addCellGlows(cells[5], ['top', 'bottomRight'])
    addCellGlows(cells[6], ['top', 'bottomRight'])

    const satCapGeo = new RoundedBoxGeometry(0.6, 1.02, 0.6, 4, 0.22)
    const satCubeGeo = new RoundedBoxGeometry(0.9, 0.9, 0.9, 4, 0.256)

    camera.lookAt(CAM_TARGET)

    const placeGlowCapsuleCorner = (mesh: THREE.Mesh, glow: THREE.Sprite, towardRight: boolean) => {
      mesh.updateMatrixWorld()
      camera.updateMatrixWorld()
      mesh.geometry.computeBoundingBox()
      const bb = mesh.geometry.boundingBox
      if (!bb) return
      const local = new THREE.Vector3()
      const ndc = new THREE.Vector3()
      let bestX = 0
      let bestY = 0
      let bestZ = 0
      let bestScore = -Infinity
      const sx = towardRight ? 1 : -1
      for (const x of [bb.min.x, bb.max.x]) {
        for (const y of [bb.min.y, bb.max.y]) {
          for (const z of [bb.min.z, bb.max.z]) {
            local.set(x, y, z)
            ndc.copy(local).applyMatrix4(mesh.matrixWorld).project(camera)
            const score = sx * ndc.x - ndc.y
            if (score > bestScore) {
              bestScore = score
              bestX = x
              bestY = y
              bestZ = z
            }
          }
        }
      }
      glow.position.set(bestX * 0.64, bestY * 0.64, bestZ * 0.64)
    }

    const placeGlowBottomRight = (mesh: THREE.Mesh, glow: THREE.Sprite, towardRight: boolean) => {
      mesh.updateMatrixWorld()
      camera.updateMatrixWorld()
      const right = new THREE.Vector3()
      const up = new THREE.Vector3()
      camera.matrixWorld.extractBasis(right, up, new THREE.Vector3())
      if (!towardRight) right.negate()
      const dirWorld = right.addScaledVector(up, -1).normalize()
      const dirLocal = dirWorld
        .transformDirection(new THREE.Matrix4().copy(mesh.matrixWorld).invert())
        .normalize()
      mesh.geometry.computeBoundingBox()
      const bb = mesh.geometry.boundingBox
      if (!bb) return
      const hx = Math.max(Math.abs(bb.min.x), Math.abs(bb.max.x))
      const hy = Math.max(Math.abs(bb.min.y), Math.abs(bb.max.y))
      const hz = Math.max(Math.abs(bb.min.z), Math.abs(bb.max.z))
      let t = Infinity
      if (Math.abs(dirLocal.x) > 1e-8) t = Math.min(t, hx / Math.abs(dirLocal.x))
      if (Math.abs(dirLocal.y) > 1e-8) t = Math.min(t, hy / Math.abs(dirLocal.y))
      if (Math.abs(dirLocal.z) > 1e-8) t = Math.min(t, hz / Math.abs(dirLocal.z))
      if (!Number.isFinite(t)) t = 0
      glow.position.copy(dirLocal).multiplyScalar(t * 0.62)
    }

    const _camRight = new THREE.Vector3()
    const _camUp = new THREE.Vector3()
    const _glowDir = new THREE.Vector3()
    const _glowInv = new THREE.Matrix4()
    const _glowLocal = new THREE.Vector3()

    const placeGlowAlong = (mesh: THREE.Mesh, glow: THREE.Sprite, dirWorld: THREE.Vector3, inset: number) => {
      mesh.updateMatrixWorld()
      _glowInv.copy(mesh.matrixWorld).invert()
      _glowLocal.copy(dirWorld).transformDirection(_glowInv).normalize()
      mesh.geometry.computeBoundingBox()
      const bb = mesh.geometry.boundingBox
      if (!bb) return
      const hx = Math.max(Math.abs(bb.min.x), Math.abs(bb.max.x))
      const hy = Math.max(Math.abs(bb.min.y), Math.abs(bb.max.y))
      const hz = Math.max(Math.abs(bb.min.z), Math.abs(bb.max.z))
      let t = Infinity
      if (Math.abs(_glowLocal.x) > 1e-8) t = Math.min(t, hx / Math.abs(_glowLocal.x))
      if (Math.abs(_glowLocal.y) > 1e-8) t = Math.min(t, hy / Math.abs(_glowLocal.y))
      if (Math.abs(_glowLocal.z) > 1e-8) t = Math.min(t, hz / Math.abs(_glowLocal.z))
      if (!Number.isFinite(t)) t = 0
      glow.position.copy(_glowLocal).multiplyScalar(t * inset)
    }

    const satellites: Satellite[] = SAT_DEFS.map((d, i) => {
      const geo = d.t === 'cap' ? satCapGeo : d.t === 'cube' ? satCubeGeo : cellGeo
      const mesh = new THREE.Mesh(geo, cellMats[i % 3])
      mesh.scale.setScalar(d.s)
      mesh.renderOrder = 1
      mesh.rotation.set(d.rot[0], d.rot[1], d.rot[2])
      const g = glowSprite(0.42, 0.9, 5)
      mesh.add(g)
      placeGlowBottomRight(mesh, g, d.nx < 0)
      scene.add(mesh)
      return {
        ...d,
        mesh,
        glow: g,
        i,
        rest: new THREE.Vector3(),
        start: new THREE.Vector3(),
        end: new THREE.Vector3(),
        phase: rand() * Math.PI * 2,
        pOff: rand(),
        trailPos: new Float32Array(TRAIL_PTS * 3),
        trailMat: new LineMaterial(),
        haloMat: new LineMaterial(),
        trailGeo: new LineGeometry(),
        halo: new Line2(),
        trail: new Line2(),
        beads: [],
        pulse: glowSprite(0.08, 0, 6),
      }
    })

    const lineOpts = {
      color: COL.line,
      transparent: true,
      opacity: 0,
      dashed: false,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
    }

    const edgeLine = () => {
      const geo = new LineGeometry()
      const pos = new Float32Array(6)
      geo.setPositions(pos)
      const mat = new LineMaterial({ ...lineOpts, linewidth: 2.2, color: 0x0057ff })
      const haloMat = new LineMaterial({ ...lineOpts, linewidth: 5.5, color: COL.blue })
      const halo = new Line2(geo, haloMat)
      halo.renderOrder = 3
      const line = new Line2(geo, mat)
      line.renderOrder = 4
      lattice.add(halo)
      lattice.add(line)
      return { line, mat, haloMat, geo, pos }
    }

    const edges: Edge[] = []
    for (let n = 1; n <= 6; n += 1) edges.push({ ...edgeLine(), a: cells[0], b: cells[n] })
    for (let n = 1; n <= 6; n += 1) edges.push({ ...edgeLine(), a: cells[n], b: cells[(n % 6) + 1] })

    const _invLattice = new THREE.Matrix4()
    const _surfA = new THREE.Vector3()
    const _surfB = new THREE.Vector3()
    const _otherW = new THREE.Vector3()
    const _qInv = new THREE.Quaternion()
    const _anchor = new THREE.Vector3()
    const _origin = new THREE.Vector3()
    const _dir = new THREE.Vector3()
    const _ray = new THREE.Raycaster()

    const latticeFaceToward = (mesh: THREE.Mesh, fromMesh: THREE.Mesh, out: THREE.Vector3) => {
      mesh.updateMatrixWorld()
      fromMesh.updateMatrixWorld()
      fromMesh.getWorldPosition(_origin)
      mesh.getWorldPosition(_otherW)
      _dir.copy(_otherW).sub(_origin)
      const dist = _dir.length()
      if (dist < 1e-6) {
        out.copy(mesh.position)
        return out
      }
      _dir.multiplyScalar(1 / dist)
      _ray.set(_origin, _dir)
      const hits = _ray.intersectObject(mesh, false)
      if (hits.length) {
        _invLattice.copy(lattice.matrixWorld).invert()
        return out.copy(hits[0].point).applyMatrix4(_invLattice)
      }
      out.copy(fromMesh.position).sub(mesh.position)
      out.applyQuaternion(_qInv.copy(mesh.quaternion).invert())
      out.x /= mesh.scale.x
      out.y /= mesh.scale.y
      out.z /= mesh.scale.z
      let tHit = Infinity
      if (Math.abs(out.x) > 1e-8) tHit = Math.min(tHit, 0.45 / Math.abs(out.x))
      if (Math.abs(out.y) > 1e-8) tHit = Math.min(tHit, 0.45 / Math.abs(out.y))
      if (Math.abs(out.z) > 1e-8) tHit = Math.min(tHit, 0.45 / Math.abs(out.z))
      if (!Number.isFinite(tHit)) tHit = 0
      out.multiplyScalar(tHit)
      out.x *= mesh.scale.x
      out.y *= mesh.scale.y
      out.z *= mesh.scale.z
      out.applyQuaternion(mesh.quaternion).add(mesh.position)
      return out
    }

    const satelliteAnchor = (s: Satellite, target: THREE.Vector3) => {
      s.mesh.updateMatrixWorld()
      s.mesh.getWorldPosition(_origin)
      _dir.copy(_origin).sub(target).normalize()
      _ray.set(target, _dir)
      const hits = _ray.intersectObject(s.mesh, false)
      if (hits.length) {
        _anchor.copy(hits[0].point)
        _anchor.addScaledVector(_dir, -0.06)
        return _anchor
      }
      const hx = s.t === 'cap' ? 0.3 : 0.45
      const hy = s.t === 'cap' ? 0.51 : 0.45
      const hz = s.t === 'cap' ? 0.3 : 0.45
      _anchor.copy(target)
      s.mesh.worldToLocal(_anchor)
      let tHit = Infinity
      if (Math.abs(_anchor.x) > 1e-8) tHit = Math.min(tHit, hx / Math.abs(_anchor.x))
      if (Math.abs(_anchor.y) > 1e-8) tHit = Math.min(tHit, hy / Math.abs(_anchor.y))
      if (Math.abs(_anchor.z) > 1e-8) tHit = Math.min(tHit, hz / Math.abs(_anchor.z))
      if (!Number.isFinite(tHit)) tHit = 0
      _anchor.multiplyScalar(tHit * 1.04)
      s.mesh.localToWorld(_anchor)
      return _anchor
    }

    satellites.forEach((s) => {
      const geo = new LineGeometry()
      s.trailPos = new Float32Array(TRAIL_PTS * 3)
      geo.setPositions(s.trailPos)
      const colArr = new Float32Array(TRAIL_PTS * 3)
      for (let k = 0; k < TRAIL_PTS; k += 1) {
        const u = k / (TRAIL_PTS - 1)
        const w = (1.0 - u) ** 1.55
        colArr[k * 3] = w
        colArr[k * 3 + 1] = w
        colArr[k * 3 + 2] = w
      }
      geo.setColors(colArr)
      const trailLineOpts = {
        color: COL.line,
        vertexColors: true,
        transparent: true,
        opacity: 0,
        dashed: false,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: false,
      }
      s.trailMat = new LineMaterial({ ...trailLineOpts, linewidth: 2.0 })
      s.haloMat = new LineMaterial({ ...trailLineOpts, linewidth: 4.5, color: COL.glow })
      s.trailGeo = geo
      s.halo = new Line2(geo, s.haloMat)
      s.halo.renderOrder = 2
      scene.add(s.halo)
      s.trail = new Line2(geo, s.trailMat)
      s.trail.renderOrder = 3
      scene.add(s.trail)
      s.beads = [0, 1].map(() => {
        const halo = glowSprite(0.16, 0, 6)
        const beadCore = glowSprite(0.06, 0, 7)
        scene.add(halo)
        scene.add(beadCore)
        return { halo, core: beadCore }
      })
      s.pulse = glowSprite(0.08, 0, 6)
      scene.add(s.pulse)
    })

    let p = 0
    let pS = 0
    let inView = false
    let reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t0 = performance.now()
    let rafId = 0
    let running = false

    const readScroll = () => {
      const r = section.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const span = (vh + r.height) / 2
      p = clamp01((vh - r.top) / Math.max(span, 1))
    }

    const layout = () => {
      const w = wrap.clientWidth
      const h = wrap.clientHeight
      if (w < 2 || h < 2) return
      renderer.setSize(w, h)
      camera.aspect = w / h
      const viewH = window.innerHeight || h
      const pinEl = wrap.parentElement
      let topBleedPx = 0
      if (pinEl) {
        const pinRect = pinEl.getBoundingClientRect()
        const wrapRect = wrap.getBoundingClientRect()
        topBleedPx = Math.max(0, pinRect.top - wrapRect.top)
      }
      // Extra canvas height is clip padding only — keep the field framed to the viewport.
      camera.position.z = CFG.camZ * (h / Math.max(viewH, 1))
      camera.updateProjectionMatrix()
      halfH = Math.tan(THREE.MathUtils.degToRad(CFG.fov / 2)) * CFG.camZ
      halfW = halfH * (w / Math.max(viewH, 1))
      const visHalfH = Math.tan(THREE.MathUtils.degToRad(CFG.fov / 2)) * camera.position.z
      const pinShift = visHalfH * (1 - viewH / Math.max(h, 1))
      const pinHalf = visHalfH * (viewH / Math.max(h, 1))
      camY = pinShift
      clusterY = -pinHalf * 0.82
      const lift = pinHalf * 0.32
      camera.position.y = camY
      CAM_TARGET.set(0, camY - 0.95, -2)
      const camZ = camera.position.z
      const alignedY = camY + ((clusterY - camY) * (camZ - CFG.latticeZ)) / Math.max(camZ, 0.01)
      lattice.position.y = camY + (alignedY - camY) * 1.35 + lift - pinHalf * 0.08
      // Extra height below the viewport stays as canvas room; keep the cluster on the same screen Y.
      const extraBottomPx = Math.max(0, h - viewH - topBleedPx)
      const stayY = visHalfH * (extraBottomPx / Math.max(h, 1))
      lattice.position.y += stayY + pinHalf * 0.8
      clusterCenter.set(0, lattice.position.y + 0.1, -3.0)
      core.position.copy(lattice.position)
      const scatterX = (halfW * 0.82) / lattice.scale.x
      const scatterY = halfH / lattice.scale.x
      cells.forEach((c, index) => {
        if (index === 0) {
          c.scatter.set(c.nearOff.x * 1.4, -scatterY * 0.92, 1.4)
          return
        }
        const a = THREE.MathUtils.degToRad(hexAngles[index - 1])
        c.scatter.set(Math.cos(a) * scatterX * 1.02, Math.sin(a) * scatterY * 1.08, c.nearOff.z * 3)
      })
      edges.forEach((e) => {
        e.mat.resolution.set(w, h)
        e.haloMat.resolution.set(w, h)
      })
      satellites.forEach((s) => {
        const satY = clusterY + pinHalf * 0.18 + lift + stayY + (s.t === 'cap' ? pinHalf * 0.15 : 0)
        s.rest.set(s.nx * halfW * 0.78, satY + s.ny * halfH * 0.72, s.z)
        s.start.set(s.nx * halfW * 1.08, satY + s.ny * halfH * 1.05, s.z)
        s.end.copy(s.rest).lerp(clusterCenter, 0.28)
        s.trailMat.resolution.set(w, h)
        s.haloMat.resolution.set(w, h)
        if (s.t === 'cap') {
          const toCenter = clusterCenter.clone().sub(s.rest).normalize()
          s.mesh.position.copy(s.rest)
          s.mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), toCenter)
          placeGlowCapsuleCorner(s.mesh, s.glow, s.nx < 0)
        }
      })
    }

    const updateWorld = (t: number) => {
      if (!reduced) {
        camera.position.x = Math.sin(t * ((Math.PI * 2) / 12)) * 0.14
        camera.position.y = camY + Math.cos(t * ((Math.PI * 2) / 12)) * 0.08
      } else {
        camera.position.x = 0
        camera.position.y = camY
      }
      camera.lookAt(CAM_TARGET)

      for (const c of cells) {
        const from = c.i * 0.045
        const arrive = smoothstep((pS - from) / Math.max(0.58 - from, 0.22))
        c.mesh.position.lerpVectors(c.scatter, c.slot, arrive)
        c.mesh.rotation.set(
          c.scatterRot.x * (1 - arrive),
          c.scatterRot.y * (1 - arrive),
          c.scatterRot.z * (1 - arrive),
        )
        c.mesh.scale.setScalar(lerp(0.78, 1, arrive))
      }
      camera.updateMatrixWorld()
      camera.matrixWorld.extractBasis(_camRight, _camUp, _glowDir)
      for (const c of cells) {
        if (!c.glows || !c.glowSpecs) continue
        c.glows.forEach((g, gi) => {
          const spec = c.glowSpecs?.[gi]
          if (spec === 'top') _glowDir.copy(_camUp)
          else if (spec === 'bottom') _glowDir.copy(_camUp).multiplyScalar(-1)
          else if (spec === 'bottomRight') _glowDir.copy(_camRight).addScaledVector(_camUp, -1)
          else _glowDir.copy(_camRight).multiplyScalar(-1).addScaledVector(_camUp, -1)
          _glowDir.normalize()
          placeGlowAlong(c.mesh, g, _glowDir, spec === 'top' || spec === 'bottom' ? 0.52 : 0.58)
        })
      }

      lattice.updateMatrixWorld()
      edges.forEach((e) => {
        latticeFaceToward(e.a.mesh, e.b.mesh, _surfA)
        latticeFaceToward(e.b.mesh, e.a.mesh, _surfB)
        e.pos[0] = lerp(_surfA.x, e.a.mesh.position.x, 0.24)
        e.pos[1] = lerp(_surfA.y, e.a.mesh.position.y, 0.24)
        e.pos[2] = lerp(_surfA.z, e.a.mesh.position.z, 0.24)
        e.pos[3] = lerp(_surfB.x, e.b.mesh.position.x, 0.24)
        e.pos[4] = lerp(_surfB.y, e.b.mesh.position.y, 0.24)
        e.pos[5] = lerp(_surfB.z, e.b.mesh.position.z, 0.24)
        e.geo.setPositions(e.pos)
        e.mat.opacity = smoothstep((pS - 0.52) / 0.32) * 0.62
        e.haloMat.opacity = e.mat.opacity * 0.34
      })

      satellites.forEach((s) => {
        const startAt = 0.18 + s.i * 0.03
        const arrive = smoothstep((pS - startAt) / Math.max(0.82 - startAt, 0.22))
        const bob = reduced ? 0 : Math.sin(t * 0.9 + s.phase) * 0.04 * arrive
        s.mesh.position.lerpVectors(s.start, s.rest, arrive)
        s.mesh.position.y += bob
        s.mesh.scale.setScalar(s.s * lerp(0.7, 1, arrive))

        const from = satelliteAnchor(s, clusterCenter)
        const ax = from.x
        const ay = from.y
        const az = from.z
        const ex = lerp(ax, clusterCenter.x, 0.28)
        const ey = lerp(ay, clusterCenter.y, 0.28)
        const ez = lerp(az, clusterCenter.z, 0.28)
        const pos = s.trailPos
        for (let k2 = 0; k2 < TRAIL_PTS; k2 += 1) {
          const u = k2 / (TRAIL_PTS - 1)
          pos[k2 * 3] = lerp(ax, ex, u)
          pos[k2 * 3 + 1] = lerp(ay, ey, u)
          pos[k2 * 3 + 2] = lerp(az, ez, u)
        }
        s.trailGeo.setPositions(pos)

        const op = smoothstep((pS - 0.58) / 0.34) * 0.46
        s.trailMat.opacity = op
        s.haloMat.opacity = op * 0.28

        ;[0.1, 0.3].forEach((u, di) => {
          const x = lerp(ax, ex, u)
          const y = lerp(ay, ey, u)
          const z = lerp(az, ez, u)
          const fade = (1.0 - u) ** 0.7
          const bead = s.beads[di]
          bead.halo.position.set(x, y, z)
          bead.core.position.set(x, y, z)
          bead.halo.material.opacity = clamp01(op * 1.55) * fade
          bead.core.material.opacity = clamp01(op * 2.35) * fade
        })

        if (reduced) {
          s.pulse.material.opacity = 0
        } else {
          const u = ((t * 0.07 + s.pOff) % 1) * 0.55
          s.pulse.position.set(lerp(ax, ex, u), lerp(ay, ey, u), lerp(az, ez, u))
          const fade = (1.0 - u) ** 2.4
          const win = u < 0.08 ? u / 0.08 : 1
          s.pulse.material.opacity = op * win * fade * 0.6
        }
      })
    }

    const renderStatic = () => {
      pS = 1
      updateWorld(0)
      renderer.render(scene, camera)
    }

    const stopLoop = () => {
      running = false
      cancelAnimationFrame(rafId)
    }

    const tick = () => {
      if (!running) return
      const t = (performance.now() - t0) / 1000
      readScroll()
      pS += (p - pS) * 0.08
      updateWorld(t)
      renderer.render(scene, camera)
      rafId = requestAnimationFrame(tick)
    }

    const startLoop = () => {
      if (running || reduced) return
      running = true
      rafId = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            section.dataset.inView = 'true'
            inView = true
            if (reduced) renderStatic()
            else startLoop()
          } else {
            delete section.dataset.inView
            inView = false
            stopLoop()
          }
        })
      },
      { threshold: [0, 0.25, 0.5] },
    )
    io.observe(section)

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMotion = () => {
      reduced = mq.matches
      stopLoop()
      if (inView) {
        if (reduced) renderStatic()
        else startLoop()
      }
    }
    mq.addEventListener('change', onMotion)

    const onVisibility = () => {
      if (document.hidden) stopLoop()
      else if (inView && !reduced) startLoop()
    }
    document.addEventListener('visibilitychange', onVisibility)

    const onResize = () => {
      layout()
      if (reduced) renderStatic()
    }
    window.addEventListener('resize', onResize)

    layout()
    readScroll()
    pS = reduced ? 1 : p
    updateWorld(0)
    renderer.render(scene, camera)

    disposeScene = () => {
      stopLoop()
      io.disconnect()
      mq.removeEventListener('change', onMotion)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', onResize)
      scene.traverse((o) => {
        const obj = o as THREE.Mesh
        if (obj.geometry) obj.geometry.dispose()
      })
      cellMats.forEach((m) => m.dispose())
      glowTex.dispose()
      releaseWebGLRenderer(renderer, { removeCanvas: true })
    }
    }

    const bootIO = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) boot()
      },
      { rootMargin: '15% 0px', threshold: 0.01 },
    )
    bootIO.observe(section)

    return () => {
      cancelled = true
      bootIO.disconnect()
      disposeScene?.()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={cn(landingBuilding, 'group')}
      id="building"
      aria-labelledby="home-building-title"
    >
      <div className={landingBuildingPin}>
        <div
          className={cn(
            landingBuildingCanvas,
            'group-data-[in-view]:opacity-100',
          )}
          id="canvasWrap"
          ref={wrapRef}
          aria-hidden="true"
        />
        <div className={landingBuildingContent}>
          <p
            className={cn(
              landingBuildingEyebrow,
              'translate-y-2 opacity-0 transition-[opacity,transform] duration-300',
              landingEase,
              '[[data-in-view]_&]:translate-y-0 [[data-in-view]_&]:opacity-100 [[data-in-view]_&]:duration-[550ms]',
            )}
            style={{ transitionDelay: '100ms' }}
          >
            {copy.eyebrow}
          </p>
          <h2
            id="home-building-title"
            className={cn(
              landingBuildingHeadline,
              'translate-y-2 opacity-0 transition-[opacity,transform] duration-300',
              landingEase,
              '[[data-in-view]_&]:translate-y-0 [[data-in-view]_&]:opacity-100 [[data-in-view]_&]:duration-[550ms]',
            )}
            style={{ transitionDelay: '160ms' }}
          >
            {copy.title}
          </h2>
          {copy.paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={cn(
                landingBuildingProse,
                index > 0 && 'mt-5',
                'translate-y-2 opacity-0 transition-[opacity,transform] duration-300',
                landingEase,
                '[[data-in-view]_&]:translate-y-0 [[data-in-view]_&]:opacity-100 [[data-in-view]_&]:duration-[550ms]',
                'motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none',
              )}
              style={{ transitionDelay: `${220 + index * 60}ms` }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
