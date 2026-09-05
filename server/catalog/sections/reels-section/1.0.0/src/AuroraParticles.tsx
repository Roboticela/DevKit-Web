'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { createWebGLRenderer, releaseWebGLRenderer } from './webgl'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'
/* ═══════════════════════════════════════════════════════════════════
   GLSL — 3-D simplex noise + wave height
   ═══════════════════════════════════════════════════════════════════ */

const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 Cv=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,Cv.yyy)); vec3 x0=v-i+dot(i,Cv.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+Cv.xxx; vec3 x2=x0-i2+Cv.yyy; vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
float waveH(vec3 p, float t, float edge, float amp, float freq){
  float x=p.x*freq, z=p.z*freq;
  float n1=snoise(vec3(x*0.055, z*0.075, t*0.10));
  float n2=snoise(vec3(x*0.12+31.4, z*0.13, t*0.16));
  float w =sin(x*0.16 + t*0.45 + n1*1.6)*cos(z*0.14 + t*0.30);
  float h=(n1*0.95+n2*0.45+w*0.55)*amp;
  h+=sin(x*0.5+t*0.6)*0.07*edge;
  return h;
}`

/* ═══════════════════════════════════════════════════════════════════
   GLSL — Dot (particle) vertex + fragment
   ═══════════════════════════════════════════════════════════════════ */

const WAVE_VERT = NOISE + /* glsl */ `
uniform float uTime,uAmp,uFreq,uSize,uPR,uIntensity;
uniform vec3 uColBlue,uColCyan,uColIndigo,uColViolet,uCrestL,uCrestR;
attribute float aRand;
varying vec3 vColor; varying float vAlpha;
void main(){
  vec3 p=position;
  float t=uTime;
  float edge=smoothstep(4.0,20.0,abs(p.x));
  float amp=uAmp*mix(0.28,1.0,edge);
  float h=waveH(p,t,edge,amp,uFreq);
  p.y+=h;
  float crest=smoothstep(0.55,1.5,h);
  vec4 mv=modelViewMatrix*vec4(p,1.0);
  float dist=-mv.z;
  gl_Position=projectionMatrix*mv;
  vec2 ndc=gl_Position.xy/gl_Position.w;
  float edgeX=smoothstep(0.22,0.80,abs(ndc.x));
  float bottom=1.0-smoothstep(-0.80,-0.05,ndc.y);
  float vis=clamp(max(edgeX,bottom*0.8),0.10,1.0);
  float distFade=1.0-smoothstep(34.0,60.0,dist);
  float side=smoothstep(-18.0,18.0,p.x);
  vec3 base=mix(mix(uColBlue,uColCyan,aRand),mix(uColIndigo,uColViolet,aRand),side);
  vColor=mix(base,mix(uCrestL,uCrestR,side),crest*0.8);
  vAlpha=vis*distFade*uIntensity*(0.34+0.25*aRand+crest*0.95);
  gl_PointSize=clamp(uSize*(0.75+0.5*aRand)*uPR*(160.0/dist),1.0,3.5*uPR);
}`

const DOT_FRAG = /* glsl */ `
varying vec3 vColor; varying float vAlpha;
void main(){
  float d=length(gl_PointCoord-0.5);
  if(d>0.5) discard;
  float g=smoothstep(0.5,0.12,d);
  gl_FragColor=vec4(vColor,g*vAlpha);
}`

/* ═══════════════════════════════════════════════════════════════════
   GLSL — Line (wireframe mesh) vertex + fragment
   ═══════════════════════════════════════════════════════════════════ */

const LINE_VERT = NOISE + /* glsl */ `
uniform float uTime,uAmp,uFreq,uIntensity;
uniform vec3 uColBlue,uColCyan,uColIndigo,uColViolet,uCrestL,uCrestR;
attribute float aRand;
varying vec3 vColor; varying float vAlpha;
void main(){
  vec3 p=position;
  float t=uTime;
  float edge=smoothstep(4.0,20.0,abs(p.x));
  float amp=uAmp*mix(0.28,1.0,edge);
  float h=waveH(p,t,edge,amp,uFreq);
  p.y+=h;
  float crest=smoothstep(0.55,1.5,h);
  vec4 mv=modelViewMatrix*vec4(p,1.0);
  float dist=-mv.z;
  gl_Position=projectionMatrix*mv;
  vec2 ndc=gl_Position.xy/gl_Position.w;
  float edgeX=smoothstep(0.22,0.80,abs(ndc.x));
  float bottom=1.0-smoothstep(-0.80,-0.05,ndc.y);
  float vis=clamp(max(edgeX,bottom*0.8),0.10,1.0);
  float distFade=1.0-smoothstep(34.0,60.0,dist);
  float side=smoothstep(-18.0,18.0,p.x);
  vec3 base=mix(mix(uColBlue,uColCyan,aRand),mix(uColIndigo,uColViolet,aRand),side);
  vColor=mix(base,mix(uCrestL,uCrestR,side),crest*0.8);
  vAlpha=vis*distFade*uIntensity*(0.055+0.05*aRand+crest*0.22);
}`

const LINE_FRAG = /* glsl */ `
varying vec3 vColor; varying float vAlpha;
void main(){ gl_FragColor=vec4(vColor,vAlpha); }`

/* ═══════════════════════════════════════════════════════════════════
   GLSL — Star field vertex + fragment
   ═══════════════════════════════════════════════════════════════════ */

const STAR_VERT = /* glsl */ `
uniform float uTime,uPR;
attribute float aPhase,aSize;
varying float vTw;
void main(){
  vTw=0.72+0.28*sin(uTime*0.5+aPhase);
  vec4 mv=modelViewMatrix*vec4(position,1.0);
  gl_Position=projectionMatrix*mv;
  gl_PointSize=clamp(aSize*uPR*(90.0/-mv.z),0.75,4.0*uPR);
}`

const STAR_FRAG = /* glsl */ `
varying float vTw;
void main(){
  float d=length(gl_PointCoord-0.5);
  if(d>0.5) discard;
  float g=smoothstep(0.5,0.05,d);
  gl_FragColor=vec4(vec3(0.72,0.82,1.0),g*g*vTw*0.6);
}`

/* ═══════════════════════════════════════════════════════════════════
   Colour palette
   ═══════════════════════════════════════════════════════════════════ */

const C = {
  blue:   new THREE.Color('#3B82F6'),
  cyan:   new THREE.Color('#38BDF8'),
  indigo: new THREE.Color('#6366F1'),
  violet: new THREE.Color('#8B5CF6'),
  crestL: new THREE.Color('#7DEBFC'),
  crestR: new THREE.Color('#E39BFF'),
}

/* ═══════════════════════════════════════════════════════════════════
   Ambient glow
   ═══════════════════════════════════════════════════════════════════ */

function makeGlowTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 256
  const g = c.getContext('2d')!
  const gr = g.createRadialGradient(128, 128, 0, 128, 128, 128)
  gr.addColorStop(0, 'rgba(255,255,255,.9)')
  gr.addColorStop(0.35, 'rgba(255,255,255,.28)')
  gr.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = gr
  g.fillRect(0, 0, 256, 256)
  return new THREE.CanvasTexture(c)
}

type GlowSprite = THREE.Sprite & { userData: { base: number; phase: number } }

function createAmbientGlow(scene: THREE.Scene) {
  const tex = makeGlowTexture()
  const sprites: GlowSprite[] = []
  const add = (x: number, y: number, z: number, color: number, opacity: number, scale: number) => {
    const m = new THREE.SpriteMaterial({
      map: tex, color, transparent: true, opacity,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })
    const s = new THREE.Sprite(m) as GlowSprite
    s.position.set(x, y, z)
    s.scale.set(scale, scale, 1)
    s.userData = { base: opacity, phase: Math.random() * 6.28 }
    scene.add(s)
    sprites.push(s)
  }
  add(-17, -1, -16, 0x1d4ed8, 0.12, 32)
  add(17, -1, -16, 0x7c3aed, 0.10, 32)
  add(0, -7, -20, 0x0b1d33, 0.14, 44)
  return { tex, sprites, update(t: number) { for (const s of sprites) s.material.opacity = s.userData.base * (0.8 + 0.2 * Math.sin(t * 0.1 + s.userData.phase)) } }
}

/* ═══════════════════════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════════════════════ */

export function AuroraParticles() {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced      = usePrefersReducedMotion()
  const reducedRef   = useRef(reduced)
  reducedRef.current = reduced

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let cancelled = false
    let disposeFn: (() => void) | undefined

    const boot = () => {
      if (cancelled || disposeFn) return

      /* ── renderer ── */
      let renderer: THREE.WebGLRenderer
      try {
        renderer = createWebGLRenderer({ antialias: false, alpha: false, powerPreference: 'high-performance' })
      } catch { return }
      renderer.setClearColor(0x030507, 1)
      renderer.domElement.setAttribute('aria-hidden', 'true')
      el.appendChild(renderer.domElement)

      const scene  = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 120)
      camera.position.set(0, 3, 13)

      /* ── tier detection ── */
      const w = window.innerWidth
      const cores = navigator.hardwareConcurrency || 4
      const mobile = w < 768
      const tablet = !mobile && (w < 1280 || cores <= 4)
      let segX: number, segZ: number, prCap: number, mouseScale: number
      if (mobile)      { segX = 96;  segZ = 56;  prCap = 1.6;  mouseScale = 0.35 }
      else if (tablet) { segX = 140; segZ = 84;  prCap = 1.75; mouseScale = 0.7 }
      else             { segX = 200; segZ = 120; prCap = 2;    mouseScale = 1 }
      let pr = Math.min(window.devicePixelRatio || 1, prCap)

      /* ── wave terrain (dots + wireframe lines) ── */
      const geo = new THREE.PlaneGeometry(150, 90, segX, segZ)
      geo.rotateX(-Math.PI / 2)
      const n = geo.attributes.position.count
      const rnd = new Float32Array(n)
      for (let i = 0; i < n; i++) rnd[i] = Math.random()
      geo.setAttribute('aRand', new THREE.BufferAttribute(rnd, 1))

      const sharedUniforms: Record<string, THREE.IUniform> = {
        uTime:      { value: 0 },
        uAmp:       { value: 2.6 },
        uFreq:      { value: 1.0 },
        uSize:      { value: 0.55 },
        uPR:        { value: pr },
        uIntensity: { value: 0.95 },
        uColBlue:   { value: C.blue },
        uColCyan:   { value: C.cyan },
        uColIndigo: { value: C.indigo },
        uColViolet: { value: C.violet },
        uCrestL:    { value: C.crestL },
        uCrestR:    { value: C.crestR },
      }

      const blend = { transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending }

      const dots = new THREE.Points(geo, new THREE.ShaderMaterial({
        uniforms: sharedUniforms, vertexShader: WAVE_VERT, fragmentShader: DOT_FRAG, ...blend,
      }))
      const lines = new THREE.Mesh(geo, new THREE.ShaderMaterial({
        uniforms: sharedUniforms, vertexShader: LINE_VERT, fragmentShader: LINE_FRAG, wireframe: true, ...blend,
      }))
      dots.frustumCulled = false
      lines.frustumCulled = false

      const waveGroup = new THREE.Group()
      waveGroup.add(dots, lines)
      waveGroup.position.set(0, -2.6, -28)
      scene.add(waveGroup)

      /* ── star field ── */
      const starCount = mobile ? 140 : 340
      const sPos = new Float32Array(starCount * 3)
      const sPh  = new Float32Array(starCount)
      const sSz  = new Float32Array(starCount)
      for (let i = 0; i < starCount; i++) {
        sPos[i * 3]     = (Math.random() - 0.5) * 70
        sPos[i * 3 + 1] = 3 + Math.random() * 14
        sPos[i * 3 + 2] = -8 - Math.random() * 20
        sPh[i] = Math.random() * 6.28
        sSz[i] = 0.6 + Math.random() * 1.2 + (Math.random() < 0.05 ? 1.2 : 0)
      }
      const sGeo = new THREE.BufferGeometry()
      sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3))
      sGeo.setAttribute('aPhase',   new THREE.BufferAttribute(sPh, 1))
      sGeo.setAttribute('aSize',    new THREE.BufferAttribute(sSz, 1))
      const sUni: Record<string, THREE.IUniform> = { uTime: { value: 0 }, uPR: { value: pr } }
      const stars = new THREE.Points(sGeo, new THREE.ShaderMaterial({
        uniforms: sUni, vertexShader: STAR_VERT, fragmentShader: STAR_FRAG,
        transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending,
      }))
      stars.frustumCulled = false
      scene.add(stars)

      /* ── ambient glow ── */
      const glow = createAmbientGlow(scene)

      /* ── mouse ── */
      let mxt = 0, myt = 0, mx = 0, my = 0
      const onPointer = (e: PointerEvent) => {
        if (reducedRef.current) return
        mxt = (e.clientX / window.innerWidth) * 2 - 1
        myt = (e.clientY / window.innerHeight) * 2 - 1
      }
      window.addEventListener('pointermove', onPointer)

      /* ── layout ── */
      const resize = () => {
        const W = el.clientWidth, H = el.clientHeight
        if (W < 2 || H < 2) return
        renderer.setSize(W, H, false)
        camera.aspect = W / H
        camera.updateProjectionMatrix()
      }
      const applyPR = () => {
        renderer.setPixelRatio(pr)
        sharedUniforms.uPR.value = pr
        sUni.uPR.value = pr
        resize()
      }
      window.addEventListener('resize', resize)
      applyPR()

      /* ── animation ── */
      const clock = new THREE.Clock()
      let time = 8.0, raf = 0, frames = 0, acc = 0, stage = 0

      const downgrade = () => {
        stage++
        if (stage === 1) { pr = Math.max(1, pr * 0.75); applyPR() }
        if (stage === 2) { lines.visible = false }
        if (stage === 3) { pr = Math.max(1, pr * 0.8); applyPR(); stars.visible = false }
      }

      const tick = () => {
        raf = requestAnimationFrame(tick)
        const dt = Math.min(clock.getDelta(), 0.05)
        if (!reducedRef.current) time += dt

        mx += (mxt - mx) * 0.03
        my += (myt - my) * 0.03
        const drift = reducedRef.current ? 0 : Math.sin(time * 0.05) * 0.18
        camera.position.x = mx * 1.2 * mouseScale + drift
        camera.position.y = 3 - my * 0.8 * mouseScale
        camera.lookAt(0, -1.5, -16)

        sharedUniforms.uTime.value = time
        sUni.uTime.value = time
        glow.update(time)

        renderer.render(scene, camera)

        if (!reducedRef.current && stage < 3) {
          frames++
          acc += dt
          if (acc >= 2) {
            if (frames / acc < 47) downgrade()
            frames = 0
            acc = 0
          }
        }
      }

      const start = () => { if (!raf) { clock.getDelta(); tick() } }
      const stop  = () => { cancelAnimationFrame(raf); raf = 0 }

      const onVis = () => { if (document.hidden) stop(); else start() }
      document.addEventListener('visibilitychange', onVis)

      const io = new IntersectionObserver(
        (es) => es.forEach((e) => { if (e.isIntersecting) start(); else stop() }),
        { threshold: 0.01 },
      )
      io.observe(el)

      resize()
      if (reducedRef.current) {
        sharedUniforms.uTime.value = 8
        sUni.uTime.value = 8
        renderer.render(scene, camera)
      } else start()

      disposeFn = () => {
        stop()
        io.disconnect()
        document.removeEventListener('visibilitychange', onVis)
        window.removeEventListener('resize', resize)
        window.removeEventListener('pointermove', onPointer)
        glow.tex.dispose()
        glow.sprites.forEach((s) => s.material.dispose())
        geo.dispose()
        sGeo.dispose()
        ;(dots.material as THREE.ShaderMaterial).dispose()
        ;(lines.material as THREE.ShaderMaterial).dispose()
        ;(stars.material as THREE.ShaderMaterial).dispose()
        releaseWebGLRenderer(renderer, { removeCanvas: true })
      }
    }

    const bootIO = new IntersectionObserver(
      (es) => { if (es.some((e) => e.isIntersecting)) boot() },
      { rootMargin: '10% 0px', threshold: 0.01 },
    )
    bootIO.observe(el)

    return () => { cancelled = true; bootIO.disconnect(); disposeFn?.() }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[-1] overflow-hidden [&_canvas]:absolute [&_canvas]:inset-0 [&_canvas]:block [&_canvas]:size-full"
    />
  )
}
