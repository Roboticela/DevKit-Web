'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Cropper, { type Area } from 'react-easy-crop'
import 'react-easy-crop/react-easy-crop.css'
import { RotateCcw, RotateCw } from 'lucide-react'
import { ButtonLabel } from './ButtonLabel'
import { SheetNav } from './SheetNav'
import { Slider } from './Slider'

type AvatarEditorProps = {
  imageSrc: string
  open: boolean
  saving?: boolean
  onCancel: () => void
  onSave: (croppedBlob: Blob) => void | Promise<void>
  onChooseAnother?: () => void
  canRemove?: boolean
  onRemove?: () => void | Promise<void>
}

async function getCroppedBlob(imageSrc: string, crop: Area, rotation: number): Promise<Blob> {
  const image = await loadImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Could not prepare image.')

  const radians = (rotation * Math.PI) / 180
  const sin = Math.abs(Math.sin(radians))
  const cos = Math.abs(Math.cos(radians))
  const boundingWidth = image.width * cos + image.height * sin
  const boundingHeight = image.width * sin + image.height * cos

  const rotateCanvas = document.createElement('canvas')
  rotateCanvas.width = Math.max(1, Math.round(boundingWidth))
  rotateCanvas.height = Math.max(1, Math.round(boundingHeight))
  const rotateCtx = rotateCanvas.getContext('2d')
  if (!rotateCtx) throw new Error('Could not prepare image.')

  rotateCtx.translate(rotateCanvas.width / 2, rotateCanvas.height / 2)
  rotateCtx.rotate(radians)
  rotateCtx.drawImage(image, -image.width / 2, -image.height / 2)

  const outputSize = 512
  canvas.width = outputSize
  canvas.height = outputSize
  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, outputSize, outputSize)
  ctx.drawImage(
    rotateCanvas,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    outputSize,
    outputSize,
  )

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Could not export image.'))
          return
        }
        resolve(blob)
      },
      'image/jpeg',
      0.92,
    )
  })
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', () => reject(new Error('Could not load image.')))
    image.crossOrigin = 'anonymous'
    image.src = src
  })
}

function wrapRotation(value: number) {
  return ((((value + 180) % 360) + 360) % 360) - 180
}

function fitZoomInsideCircle(mediaWidth: number, mediaHeight: number, cropDiameter: number) {
  const diagonal = Math.hypot(mediaWidth, mediaHeight)
  if (!diagonal || !cropDiameter) return 1
  return Math.max(0.2, (cropDiameter / diagonal) * 0.98)
}

export function AvatarEditor({
  imageSrc,
  open,
  saving = false,
  onCancel,
  onSave,
  onChooseAnother,
  canRemove = false,
  onRemove,
}: AvatarEditorProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [minZoom, setMinZoom] = useState(0.4)
  const [rotation, setRotation] = useState(0)
  const [croppedArea, setCroppedArea] = useState<Area | null>(null)
  const [cropSize, setCropSize] = useState<{ width: number; height: number } | undefined>()
  const [mediaSize, setMediaSize] = useState<{ width: number; height: number } | null>(null)
  const [error, setError] = useState('')
  const [localBusy, setLocalBusy] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const fitKeyRef = useRef('')
  const busyRef = useRef(false)

  const busy = saving || localBusy
  busyRef.current = busy
  const maxZoom = Math.max(3, minZoom * 4)

  useEffect(() => {
    if (!open) return
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setMinZoom(0.4)
    setRotation(0)
    setCroppedArea(null)
    setMediaSize(null)
    setError('')
    setLocalBusy(false)
    fitKeyRef.current = ''
  }, [open, imageSrc])

  useLayoutEffect(() => {
    if (!open) return
    const stage = stageRef.current
    if (!stage) return

    const updateCropSize = () => {
      if (busyRef.current) return
      const { width, height } = stage.getBoundingClientRect()
      const size = Math.max(180, Math.floor(Math.min(width, height) * 0.92))
      setCropSize((prev) => {
        if (prev?.width === size && prev?.height === size) return prev
        return { width: size, height: size }
      })
    }

    updateCropSize()
    const observer = new ResizeObserver(updateCropSize)
    observer.observe(stage)
    return () => observer.disconnect()
  }, [open, imageSrc])

  useEffect(() => {
    if (!open || !mediaSize || !cropSize || busy) return
    const nextMin = fitZoomInsideCircle(mediaSize.width, mediaSize.height, cropSize.width)
    setMinZoom(nextMin)
    const key = `${imageSrc}:${Math.round(mediaSize.width)}:${Math.round(mediaSize.height)}`
    if (fitKeyRef.current !== key) {
      fitKeyRef.current = key
      setZoom(nextMin)
      setCrop({ x: 0, y: 0 })
      return
    }
    setZoom((current) => Math.max(current, nextMin))
  }, [open, imageSrc, mediaSize, cropSize, busy])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !busy) onCancel()
    }
    window.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [open, busy, onCancel])

  const onCropComplete = useCallback((_area: Area, areaPixels: Area) => {
    setCroppedArea(areaPixels)
  }, [])

  if (!open || typeof document === 'undefined') return null

  async function handleSave() {
    if (!croppedArea || busy) return
    setError('')
    setLocalBusy(true)
    try {
      const blob = await getCroppedBlob(imageSrc, croppedArea, rotation)
      await onSave(blob)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save photo.')
    } finally {
      setLocalBusy(false)
    }
  }

  const toolClass =
    'mb-0.5 inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#38383a] bg-transparent p-0 text-brand-primary hover:text-brand-primary-hover disabled:cursor-not-allowed disabled:opacity-40'

  return createPortal(
    <div
      className="fixed inset-0 z-[1200] flex items-stretch justify-center bg-black text-white min-[735px]:items-center min-[735px]:bg-black/72 min-[735px]:p-12"
      role="dialog"
      aria-modal="true"
      aria-label="Move and Scale"
    >
      <div className="mx-auto flex h-full w-[min(100%,692px)] flex-col bg-black min-[735px]:h-[min(860px,100%)] min-[735px]:max-h-full min-[735px]:overflow-hidden min-[735px]:rounded-[18px] min-[735px]:border min-[735px]:border-[#38383a]">
        <SheetNav
          title="Move and Scale"
          subtitle="Pinch to zoom · Drag to reposition"
          onCancel={onCancel}
          onDone={() => void handleSave()}
          cancelDisabled={busy}
          doneDisabled={busy || !croppedArea}
          doneLabel={
            <ButtonLabel loading={busy} loadingText="Saving…">
              Done
            </ButtonLabel>
          }
        />

        <div className="relative min-h-[280px] w-full flex-1 overflow-hidden bg-black" ref={stageRef}>
          {cropSize ? (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              minZoom={minZoom}
              maxZoom={maxZoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              objectFit="contain"
              restrictPosition
              cropSize={cropSize}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onRotationChange={(value) => setRotation(wrapRotation(value))}
              onCropComplete={onCropComplete}
              onMediaLoaded={(size) => {
                setMediaSize({ width: size.width, height: size.height })
              }}
              classes={{
                containerClassName: 'avatar-editor-crop',
                cropAreaClassName: 'avatar-editor-crop-area',
              }}
            />
          ) : null}
          {busy ? <div className="absolute inset-0 z-[2] cursor-wait" aria-hidden /> : null}
        </div>

        <div className="flex shrink-0 flex-col gap-4 bg-black px-6 pt-5 pb-[max(28px,env(safe-area-inset-bottom))] min-[735px]:px-8 min-[735px]:pt-6 min-[735px]:pb-7">
          <Slider
            label="Zoom"
            tone="onDark"
            min={minZoom}
            max={maxZoom}
            step={0.01}
            value={zoom}
            onValueChange={setZoom}
            disabled={busy}
            aria-label="Zoom"
          />

          <div className="flex items-end gap-3">
            <button
              type="button"
              className={toolClass}
              disabled={busy}
              onClick={() => setRotation((value) => wrapRotation(value - 90))}
              aria-label="Rotate left 90 degrees"
            >
              <RotateCcw size={18} strokeWidth={1.5} absoluteStrokeWidth aria-hidden />
            </button>

            <Slider
              label="Rotation"
              tone="onDark"
              min={-180}
              max={180}
              step={1}
              value={wrapRotation(rotation)}
              onValueChange={setRotation}
              disabled={busy}
              aria-label="Rotation"
            />

            <button
              type="button"
              className={toolClass}
              disabled={busy}
              onClick={() => setRotation((value) => wrapRotation(value + 90))}
              aria-label="Rotate right 90 degrees"
            >
              <RotateCw size={18} strokeWidth={1.5} absoluteStrokeWidth aria-hidden />
            </button>
          </div>

          {error ? (
            <p className="m-0 text-center text-sm font-normal leading-[1.4] text-danger">{error}</p>
          ) : null}

          <div className="flex flex-col items-center gap-3 pt-1">
            {onChooseAnother ? (
              <button
                type="button"
                className="cursor-pointer border-0 bg-transparent p-1 font-sans text-[17px] font-normal leading-[1.2] text-brand-primary hover:underline disabled:cursor-not-allowed disabled:opacity-40 disabled:no-underline"
                disabled={busy}
                onClick={onChooseAnother}
              >
                Choose a Different Photo
              </button>
            ) : null}
            {canRemove && onRemove ? (
              <button
                type="button"
                className="cursor-pointer border-0 bg-transparent p-1 font-sans text-[17px] font-normal leading-[1.2] text-danger hover:underline disabled:cursor-not-allowed disabled:opacity-40 disabled:no-underline"
                disabled={busy}
                onClick={() => void onRemove()}
              >
                Remove Photo
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
