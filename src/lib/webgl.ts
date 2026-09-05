import * as THREE from 'three'

export function createWebGLRenderer(params: THREE.WebGLRendererParameters = {}) {
  return new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'low-power',
    preserveDrawingBuffer: false,
    ...params,
  })
}

export function releaseWebGLRenderer(
  renderer: THREE.WebGLRenderer,
  { removeCanvas = false }: { removeCanvas?: boolean } = {},
) {
  renderer.setAnimationLoop(null)
  const canvas = renderer.domElement
  try {
    renderer.dispose()
  } catch {
    // Context may already be lost.
  }
  try {
    renderer.forceContextLoss()
  } catch {
    // Already released.
  }
  if (removeCanvas) canvas.remove()
}
