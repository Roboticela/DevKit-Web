'use client'

import { useId, useMemo, useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import {
  AVAILABLE_CURSOR_PACKS,
  CursorCategory,
  ROBOCURSORS_LIST,
  RoboCursorItem,
  getCursorCssValue,
  getCssCursorRule,
  getReactSnippet,
  getRcurLoaderSnippet,
} from '@/lib/robocursors-data'
import { useTheme } from '@/lib/theme'
import { CursorPreview } from './CursorPreview'
import { Badge } from './Badge'
import { Button } from './Button'
import { DocsHeader, DocsSectionTitle } from './DocsCopy'
import { DocsInlineCode, DocsUsage } from './DocsCard'
import { Card, CardGrid } from './Card'
import { RuleCard } from './RuleCard'
import { DocsPager } from './DocsPager'
import { Body, Caption, Heading, Label } from './Text'
import { TextField } from './TextField'
import { Modal } from './Modal'
import { CodeBlock } from './CodeBlock'
import {
  DkChevronCaretLeft,
  DkClipboardCopyDuplicate,
  DkHelpQuestionCircle,
  DkInformationCircleDetails,
  DkPencilWriteEdit,
  DkSearchMagnifyingGlass,
  DkSuccessCircleCheckmark,
} from '@/icons'

const CATEGORIES: { id: CursorCategory; label: string }[] = [
  { id: 'all', label: 'All Cursors' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'resize', label: 'Resize & Window' },
  { id: 'editing', label: 'Editing & Canvas' },
  { id: 'status', label: 'Status & Loading' },
]

export function CursorPackPlaygroundDocs({ packId }: { packId: string }) {
  const { theme } = useTheme()
  const pack = AVAILABLE_CURSOR_PACKS.find((p) => p.id === packId) ?? AVAILABLE_CURSOR_PACKS[0]

  // Filter & Search
  const [activeCategory, setActiveCategory] = useState<CursorCategory>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Active studio cursor override
  const [activeStudioCursor, setActiveStudioCursor] = useState<RoboCursorItem | null>(null)

  // Inspector modal state
  const [inspectedCursor, setInspectedCursor] = useState<RoboCursorItem | null>(null)
  const [inspectorTab, setInspectorTab] = useState<'svg' | 'css' | 'react' | 'rcur'>('svg')
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  // Interactive playground stations states
  const [splitRatio, setSplitRatio] = useState(50)
  const isDraggingSplit = useRef(false)
  const splitContainerRef = useRef<HTMLDivElement>(null)

  // Canvas doodle pad state
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [brushColor, setBrushColor] = useState('#3b9eff')

  // Precision reticle state
  const [crosshairCoords, setCrosshairCoords] = useState({ x: 0, y: 0 })

  // Simulated Async build state
  const [isAsyncRunning, setIsAsyncRunning] = useState(false)
  const [asyncProgress, setAsyncProgress] = useState(0)

  // Split-pane mouse drag handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingSplit.current || !splitContainerRef.current) return
      const rect = splitContainerRef.current.getBoundingClientRect()
      const x = Math.max(20, Math.min(rect.width - 20, e.clientX - rect.left))
      const pct = Math.round((x / rect.width) * 100)
      setSplitRatio(pct)
    }

    const handleMouseUp = () => {
      isDraggingSplit.current = false
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  // Canvas drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.strokeStyle = brushColor
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
    setIsDrawing(true)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  // Reticle coordinate tracking
  const handleReticleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setCrosshairCoords({
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
    })
  }

  // Trigger Async Task Simulator
  const triggerAsyncSim = () => {
    if (isAsyncRunning) return
    setIsAsyncRunning(true)
    setAsyncProgress(10)

    const interval = setInterval(() => {
      setAsyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsAsyncRunning(false), 500)
          return 100
        }
        return prev + 15
      })
    }, 400)
  }

  // Filtered cursors
  const filteredCursors = useMemo(() => {
    return ROBOCURSORS_LIST.filter((item) => {
      const matchesCat = activeCategory === 'all' || item.category === activeCategory
      const query = searchQuery.trim().toLowerCase()
      if (!query) return matchesCat
      const matchesSearch =
        item.title.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query) ||
        item.stateName.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.keywords.some((kw) => kw.toLowerCase().includes(query))
      return matchesCat && matchesSearch
    })
  }, [activeCategory, searchQuery])

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const downloadSvg = (item: RoboCursorItem) => {
    const blob = new Blob([item.svg], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = item.filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Studio container cursor style
  const studioStyle = activeStudioCursor
    ? {
        cursor: getCursorCssValue(activeStudioCursor, 'auto', theme),
      }
    : undefined

  return (
    <article className="min-w-0 pb-16" style={studioStyle}>
      {/* Back Link */}
      <div className="mb-4">
        <Link
          href="/components/cursors"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-brand-primary transition-colors"
        >
          <DkChevronCaretLeft size={14} />
          <span>All Cursor Packs</span>
        </Link>
      </div>

      <DocsHeader
        crumb="Foundations / Cursors"
        title={`${pack.name} Studio`}
        description="Interactive testing studio and export laboratory for the RoboticelaOS cursor collection. Test calibrated hotspot affordances, window resize states, drawing pads, and async spinners in real-time UI components."
      />

      {/* Studio Header Toolbar & Stats */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border-default/80 bg-bg-surface p-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="pill" size="md">
            v{pack.version}
          </Badge>
          <Badge variant="pill" size="md">
            {pack.totalCursors} Vector Cursors
          </Badge>
          <Badge variant="pill" size="md">
            Dual Theme Adaptive
          </Badge>
          <Badge variant="pill" size="md">
            Calibrated Hotspots
          </Badge>
        </div>

        {activeStudioCursor ? (
          <div className="flex items-center gap-2 rounded-xl bg-brand-primary/10 px-3 py-1.5 border border-brand-primary/30">
            <CursorPreview
              cursorOrId={activeStudioCursor}
              className="size-5"
            />
            <span className="text-xs font-mono font-medium text-brand-primary">
              Active: {activeStudioCursor.id}
            </span>
            <button
              type="button"
              onClick={() => setActiveStudioCursor(null)}
              className="ml-1 text-[11px] font-semibold text-text-tertiary hover:text-text-primary"
            >
              Reset
            </button>
          </div>
        ) : (
          <Caption tone="tertiary">Tip: Select any cursor below to test it across the studio</Caption>
        )}
      </div>

      {/* OVERVIEW SECTION */}
      <section id="overview" className="mt-8 scroll-mt-20">
        <DocsSectionTitle>Calibrated Hotspots & Architecture</DocsSectionTitle>
        <DocsUsage>
          <Body>
            Every cursor in RoboticelaOS is crafted on a 256×256 canvas and mapped with a sub-pixel
            calibrated hotspot for both standard 32×32 and Retina displays. Use the interactive testing
            ground below to verify pointer alignments and affordance feedback.
          </Body>

          <CardGrid columns={3} gap="sm">
            <Card
              variant="subtle"
              size="sm"
              eyebrow="01"
              title="Physical Anchor Calibration"
              description="Each SVG specifies exact CSS hotspot offsets (e.g. pointer tip at 7, 3; reticle pin at 16, 16)."
            />
            <Card
              variant="subtle"
              size="sm"
              eyebrow="02"
              title="Dual Theme Adaptive"
              description="Embedded @media (prefers-color-scheme) rules dynamically invert strokes and gradient fills automatically."
            />
            <Card
              variant="subtle"
              size="sm"
              eyebrow="03"
              title="Dual-Format Delivery"
              description="Directly consume pure SVG files in standard CSS or load native .rcur multi-resolution binary containers."
            />
          </CardGrid>

          <CardGrid columns={2} gap="sm">
            <RuleCard
              size="sm"
              tone="success"
              title="Do"
              items={[
                'Test cursors directly on the interactive affordance stations below before exporting.',
                'Specify CSS fallback generic cursors: url(...) x y, auto; for graceful browser degradation.',
                'Use RoboWorking for background tasks and RoboWait when the UI thread is fully blocking.',
              ]}
            />
            <RuleCard
              size="sm"
              tone="danger"
              title="Don’t"
              items={[
                'Never omit the hotspot coordinates in CSS url() rules, or the click anchor will default to (0, 0).',
                'Do not hardcode pixel dimensions when rendering cursors inside custom canvas viewports.',
                'Avoid displaying custom cursors on touch-screen devices where physical touch handles exist.',
              ]}
            />
          </CardGrid>
        </DocsUsage>
      </section>

      {/* INTERACTIVE TESTING PLAYGROUND SECTION */}
      <section id="playground" className="mt-14 scroll-mt-20">
        <DocsSectionTitle>Interactive Testing Playground</DocsSectionTitle>
        <Body className="mb-6">
          Hover and interact with each dedicated testing station below. Each surface is hooked to real
          calibrated cursors from the RoboticelaOS pack.
        </Body>

        <div className="space-y-6">
          {/* STATION A & B: Buttons & Links + Split Pane */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Station A: Action & Click Affordances */}
            <div className="rounded-2xl border border-border-default bg-bg-surface p-5 shadow-xs">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <Label className="font-semibold text-text-primary">Station A: Action & Links</Label>
                  <Caption tone="tertiary">Tests RoboPointer, RoboLink, and RoboHelp</Caption>
                </div>
                <Badge variant="pill" size="sm">
                  Navigation
                </Badge>
              </div>

              <div className="space-y-4 rounded-xl border border-dashed border-border-default bg-bg-secondary/40 p-4">
                <div className="flex flex-wrap items-center gap-3">
                  {/* Button testing RoboPointer */}
                  <div
                    style={{
                      cursor: getCursorCssValue('RoboPointer', 'pointer', theme),
                    }}
                    className="inline-block"
                  >
                    <Button variant="primary" size="sm">
                      RoboPointer Action
                    </Button>
                  </div>

                  {/* Secondary button */}
                  <div
                    style={{
                      cursor: getCursorCssValue('RoboPointer', 'pointer', theme),
                    }}
                    className="inline-block"
                  >
                    <Button variant="secondary" size="sm">
                      Hover Me
                    </Button>
                  </div>

                  {/* Link testing RoboLink */}
                  <a
                    href="#import-code"
                    style={{
                      cursor: getCursorCssValue('RoboLink', 'pointer', theme),
                    }}
                    className="inline-flex items-center gap-1 text-sm font-medium text-brand-primary underline hover:text-brand-primary/80 transition-colors"
                  >
                    <span>External Anchor</span>
                    <span className="text-xs">↗</span>
                  </a>

                  {/* Help Bubble testing RoboHelp */}
                  <div
                    style={{
                      cursor: getCursorCssValue('RoboHelp', 'help', theme),
                    }}
                    className="inline-flex size-8 items-center justify-center rounded-full bg-bg-tertiary text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-colors"
                    title="RoboHelp context: Hover to reveal calibrated tooltip hotspot"
                  >
                    <DkHelpQuestionCircle size={16} />
                  </div>
                </div>

                <div className="text-xs text-text-secondary">
                  Notice how the pointer finger aligns seamlessly with the button borders.
                </div>
              </div>
            </div>

            {/* Station B: Draggable Split-Pane Divider */}
            <div className="rounded-2xl border border-border-default bg-bg-surface p-5 shadow-xs">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <Label className="font-semibold text-text-primary">Station B: Draggable Split Pane</Label>
                  <Caption tone="tertiary">Tests RoboResizeSplitEW (Horizontal Splitter)</Caption>
                </div>
                <Badge variant="pill" size="sm">
                  Resize
                </Badge>
              </div>

              <div
                ref={splitContainerRef}
                className="relative flex h-28 w-full select-none overflow-hidden rounded-xl border border-border-default bg-bg-secondary/60"
              >
                {/* Left Pane */}
                <div
                  style={{ width: `${splitRatio}%` }}
                  className="flex items-center justify-center bg-brand-primary/5 p-3 text-center transition-[width] duration-75"
                >
                  <span className="text-xs font-mono font-medium text-brand-primary">
                    Pane A ({splitRatio}%)
                  </span>
                </div>

                {/* Draggable Divider */}
                <div
                  onMouseDown={() => {
                    isDraggingSplit.current = true
                  }}
                  style={{
                    cursor: getCursorCssValue('RoboResizeCol', 'col-resize', theme),
                  }}
                  className="group relative flex w-3 shrink-0 items-center justify-center bg-border-default/80 hover:bg-brand-primary transition-colors active:bg-brand-primary"
                  title="Drag horizontally to resize"
                >
                  <div className="h-6 w-0.5 rounded-full bg-text-tertiary group-hover:bg-white transition-colors" />
                </div>

                {/* Right Pane */}
                <div
                  style={{ width: `${100 - splitRatio}%` }}
                  className="flex items-center justify-center bg-bg-tertiary/60 p-3 text-center transition-[width] duration-75"
                >
                  <span className="text-xs font-mono font-medium text-text-secondary">
                    Pane B ({100 - splitRatio}%)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* STATION C & D: Doodle Canvas + Reticle */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Station C: Drawing & Edit Doodle Pad */}
            <div className="rounded-2xl border border-border-default bg-bg-surface p-5 shadow-xs">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <Label className="font-semibold text-text-primary">Station C: Doodle Canvas</Label>
                  <Caption tone="tertiary">Tests RoboEdit (Drawing Pencil at 5, 27)</Caption>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 rounded-lg bg-bg-secondary p-1">
                    {['#3b9eff', '#10b981', '#f59e0b', '#ef4444', '#0f172a'].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setBrushColor(c)}
                        style={{ backgroundColor: c }}
                        className={`size-4 rounded-full transition-transform ${brushColor === c ? 'scale-125 ring-2 ring-white shadow-xs' : 'opacity-70 hover:opacity-100'}`}
                      />
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" onClick={clearCanvas}>
                    Clear
                  </Button>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-border-default bg-white dark:bg-[#18181b]">
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={140}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  style={{
                    cursor: getCursorCssValue('RoboEdit', 'crosshair', theme),
                  }}
                  className="block h-[140px] w-full"
                />
              </div>
              <Caption tone="tertiary" className="mt-2 text-center">
                Click and drag to draw strokes. The pencil tip draws right at the hotspot point.
              </Caption>
            </div>

            {/* Station D: Precision Reticle Target Pad */}
            <div className="rounded-2xl border border-border-default bg-bg-surface p-5 shadow-xs">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <Label className="font-semibold text-text-primary">Station D: Target Reticle Pad</Label>
                  <Caption tone="tertiary">Tests RoboCrosshair (Precision Plus at 16, 16)</Caption>
                </div>
                <Badge variant="pill" size="sm">
                  ({crosshairCoords.x}, {crosshairCoords.y}) px
                </Badge>
              </div>

              <div
                onMouseMove={handleReticleMouseMove}
                style={{
                  cursor: getCursorCssValue('RoboCrosshair', 'crosshair', theme),
                }}
                className="relative flex h-[140px] w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-border-strong bg-bg-secondary/40"
              >
                {/* Visual coordinate lines */}
                <div className="pointer-events-none absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-25">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="border border-text-tertiary/20" />
                  ))}
                </div>

                <div className="pointer-events-none z-10 flex flex-col items-center gap-1 rounded-xl bg-bg-elevated/90 px-4 py-2 shadow-xs backdrop-blur-sm">
                  <span className="font-mono text-xs font-semibold text-brand-primary">
                    TARGET LOCK: [{crosshairCoords.x} : {crosshairCoords.y}]
                  </span>
                  <span className="text-[11px] text-text-tertiary">
                    Fused plus crosshair with calibrated center hotspot
                  </span>
                </div>
              </div>
              <Caption tone="tertiary" className="mt-2 text-center">
                Move around to inspect coordinates with the calibrated plus crosshair.
              </Caption>
            </div>
          </div>

          {/* STATION E & F: Text Typography + Async Spinners */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Station E: Typography & Text Editing */}
            <div className="rounded-2xl border border-border-default bg-bg-surface p-5 shadow-xs">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <Label className="font-semibold text-text-primary">Station E: Typography I-Beam</Label>
                  <Caption tone="tertiary">Tests RoboTextHorizontal & RoboTextVertical</Caption>
                </div>
                <Badge variant="pill" size="sm">
                  Editing
                </Badge>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Horizontal Text Field */}
                <div className="space-y-1.5">
                  <Label className="text-xs">Horizontal Buffer</Label>
                  <div
                    style={{
                      cursor: getCursorCssValue('RoboTextHorizontal', 'text', theme),
                    }}
                  >
                    <input
                      type="text"
                      defaultValue="Edit text here..."
                      style={{
                        cursor: getCursorCssValue('RoboTextHorizontal', 'text', theme),
                      }}
                      className="w-full rounded-xl border border-border-default bg-bg-secondary px-3 py-2 text-sm text-text-primary focus:border-brand-primary focus:outline-none"
                    />
                  </div>
                  <Caption tone="tertiary">Standard left-to-right I-Beam</Caption>
                </div>

                {/* Vertical Typography Area */}
                <div className="space-y-1.5">
                  <Label className="text-xs">Vertical Asian Typography</Label>
                  <div
                    style={{
                      cursor: getCursorCssValue('RoboTextVertical', 'vertical-text', theme),
                    }}
                    className="flex h-[42px] items-center rounded-xl border border-border-default bg-bg-secondary px-3 py-1 font-serif text-sm tracking-widest text-text-secondary"
                  >
                    <span>書道・文字縦書き</span>
                  </div>
                  <Caption tone="tertiary">Rotated 90° vertical text cursor</Caption>
                </div>
              </div>
            </div>

            {/* Station F: Async Spinners & Wait Simulator */}
            <div className="rounded-2xl border border-border-default bg-bg-surface p-5 shadow-xs">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <Label className="font-semibold text-text-primary">Station F: Async Spinner Simulator</Label>
                  <Caption tone="tertiary">Tests RoboWorking & RoboWait (Fixed Blue Tick)</Caption>
                </div>
                <Badge variant="pill" size="sm" tone={isAsyncRunning ? 'brand' : 'neutral'}>
                  {isAsyncRunning ? 'Executing...' : 'Idle'}
                </Badge>
              </div>

              <div
                style={{
                  cursor: isAsyncRunning
                    ? getCursorCssValue('RoboWorking', 'wait', theme)
                    : undefined,
                }}
                className={`relative flex flex-col justify-between rounded-xl border p-4 transition-all ${isAsyncRunning ? 'border-brand-primary bg-brand-primary/5' : 'border-border-default bg-bg-secondary/40'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-medium text-text-secondary">
                    Background Task: Dynamic Asset Compilation
                  </span>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={triggerAsyncSim}
                    disabled={isAsyncRunning}
                    style={{
                      cursor: isAsyncRunning
                        ? getCursorCssValue('RoboWait', 'wait', theme)
                        : getCursorCssValue('RoboPointer', 'pointer', theme),
                    }}
                  >
                    {isAsyncRunning ? 'Simulating...' : 'Trigger Async Build'}
                  </Button>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-text-tertiary">
                    <span>Progress</span>
                    <span className="font-mono">{asyncProgress}%</span>
                  </div>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-border-default/60">
                    <div
                      style={{ width: `${asyncProgress}%` }}
                      className="h-full bg-brand-primary transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
              <Caption tone="tertiary" className="mt-2 text-center">
                Click "Trigger Async Build" to experience the animated spinner cursor with calibrated light/dark tracks.
              </Caption>
            </div>
          </div>
        </div>
      </section>

      {/* CURSOR PACK LIBRARY SECTION */}
      <section id="library" className="mt-14 scroll-mt-20">
        <DocsSectionTitle>Cursor Library ({filteredCursors.length})</DocsSectionTitle>
        <Body className="mb-4">
          Browse all {pack.totalCursors} vector cursors included in this collection. Click "Test" to
          activate the cursor across the studio, or "Inspect" to export SVG and .rcur assets.
        </Body>

        {/* Filters and Search Bar */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-brand-primary text-white shadow-xs'
                    : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-64">
            <TextField
              size="sm"
              variant="outline"
              placeholder="Search cursors by name or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<DkSearchMagnifyingGlass size={16} />}
            />
          </div>
        </div>

        {/* Cursor Cards Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {filteredCursors.map((cursor) => {
            const isCurrentActive = activeStudioCursor?.id === cursor.id

            return (
              <div
                key={cursor.id}
                className={`group flex flex-col justify-between rounded-2xl border bg-bg-surface p-4 transition-all hover:-translate-y-0.5 ${
                  isCurrentActive
                    ? 'border-brand-primary shadow-sm ring-1 ring-brand-primary'
                    : 'border-border-default hover:border-border-strong'
                }`}
              >
                <div>
                  {/* Top Bar with Badges */}
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-mono text-[11px] font-semibold text-brand-primary">
                      #{cursor.stateId} • {cursor.stateName}
                    </span>
                    <span className="font-mono text-[10px] text-text-tertiary">
                      ({cursor.hotspot32.x}, {cursor.hotspot32.y})
                    </span>
                  </div>

                  {/* Centered Preview Area */}
                  <div
                    style={{
                      cursor: getCursorCssValue(cursor, 'auto', theme),
                    }}
                    className="my-3 grid h-24 place-items-center rounded-xl border border-border-default/60 bg-bg-secondary/60 p-3 group-hover:bg-bg-tertiary transition-colors"
                    title={`Hover to preview ${cursor.title}`}
                  >
                    <CursorPreview
                      cursorOrId={cursor}
                      className="size-12 drop-shadow-xs"
                    />
                  </div>

                  {/* Title & Description */}
                  <Label className="text-sm font-semibold text-text-primary">{cursor.title}</Label>
                  <Caption tone="tertiary" className="mt-1 line-clamp-2 text-xs">
                    {cursor.description}
                  </Caption>
                </div>

                {/* Footer Actions */}
                <div className="mt-4 flex items-center justify-between gap-2 border-t border-border-default/60 pt-3">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveStudioCursor(isCurrentActive ? null : cursor)
                    }
                    className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                      isCurrentActive
                        ? 'bg-brand-primary text-white'
                        : 'bg-bg-secondary text-text-secondary hover:bg-bg-hover hover:text-text-primary'
                    }`}
                  >
                    {isCurrentActive ? 'Active in Studio' : 'Test Cursor'}
                  </button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setInspectedCursor(cursor)}
                  >
                    Inspect
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* IMPORT & USAGE SECTION */}
      <section id="import-code" className="mt-14 scroll-mt-20">
        <DocsSectionTitle>Import & Usage</DocsSectionTitle>
        <Body className="mb-4">
          RoboticelaOS cursors can be imported into your projects either as standalone vector SVGs
          or compiled into high-efficiency CSS rules and React components.
        </Body>

        <div className="space-y-6">
          {/* Zero-Asset Data URI Import */}
          <div className="rounded-2xl border border-border-default bg-bg-surface overflow-hidden">
            <div className="border-b border-border-default bg-bg-secondary px-4 py-2.5 flex items-center justify-between">
              <span className="text-xs font-semibold text-text-primary">1. CSS via Data URI (Zero Static Public Assets)</span>
              <Badge variant="pill" size="sm">Self-Contained</Badge>
            </div>
            <CodeBlock
              code={`import { getCursorCssValue } from '@/lib/robocursors-data'

/* In React inline style */
<button style={{ cursor: getCursorCssValue('RoboPointer', 'pointer') }}>
  Click Me
</button>

/* In standard CSS / Tailwind */
.canvas-target {
  cursor: url("data:image/svg+xml;utf8,<encoded-svg>") 16 16, crosshair;
}`}
            />
          </div>

          {/* React Component Integration */}
          <div className="rounded-2xl border border-border-default bg-bg-surface overflow-hidden">
            <div className="border-b border-border-default bg-bg-secondary px-4 py-2.5 flex items-center justify-between">
              <span className="text-xs font-semibold text-text-primary">2. React Inline Cursor Component</span>
              <Badge variant="pill" size="sm">React JSX</Badge>
            </div>
            <CodeBlock
              code={`import { CursorPreview } from '@/components/CursorPreview'

export function Toolbar() {
  return (
    <div className="flex items-center gap-2">
      <CursorPreview cursorOrId="RoboPointer" className="size-6" />
      <CursorPreview cursorOrId="RoboCrosshair" className="size-6" />
    </div>
  )
}`}
            />
          </div>
        </div>
      </section>

      {/* ROBOCURSOR FORMAT SPECIFICATION */}
      <section id="robocursor-format" className="mt-14 scroll-mt-20">
        <DocsSectionTitle>RoboCursor (.rcur) Container Specification</DocsSectionTitle>
        <Body className="mb-4">
          For desktop runtimes, native OS shells, or zero-latency game UIs, packs are bundled into single-file
          <DocsInlineCode>.rcur</DocsInlineCode> binary containers. Read the complete reference below:
        </Body>

        <CardGrid columns={3} gap="sm">
          <Card
            variant="subtle"
            size="sm"
            eyebrow="Binary Header"
            title="Magic RCUR (0x52435552)"
            description="4-byte signature followed by uint16 version and uint16 total cursor descriptor count."
          />
          <Card
            variant="subtle"
            size="sm"
            eyebrow="Multi-Density"
            title="1x, 1.5x, 2x Rasters"
            description="Contains pre-rendered PNG bitmaps for 32px, 48px, and 64px display scalings."
          />
          <Card
            variant="subtle"
            size="sm"
            eyebrow="Animation Timing"
            title="Frame Rate Table"
            description="Embedded millisecond frame durations for animated wait loops like RoboWorking."
          />
        </CardGrid>

        <div className="mt-6 rounded-2xl border border-border-default bg-bg-surface overflow-hidden">
          <div className="border-b border-border-default bg-bg-secondary px-4 py-2.5 flex items-center justify-between">
            <span className="text-xs font-semibold text-text-primary">TypeScript RoboCursorLoader Example</span>
            <Badge variant="pill" size="sm">Zero Dependency</Badge>
          </div>
          <CodeBlock
            code={`import { RoboCursorLoader } from '@/lib/robocursor-loader'

// 1. Initialize and cache binary container
const loader = await RoboCursorLoader.load('/cursors/RoboCursor.rcur')

// 2. Lookup calibrated cursor by State ID (e.g. State 1: Pointer)
const pointer = loader.getCursor(1)
console.log(pointer.name) // "RoboPointer"
console.log(pointer.hotspot) // { x: 7, y: 3 }

// 3. Apply to document body or canvas
loader.applyToElement(document.body, 1)`}
          />
        </div>
      </section>

      {/* STATE ID ENUM REGISTRY */}
      <section id="states-table" className="mt-14 scroll-mt-20">
        <DocsSectionTitle>Standard State ID Enum</DocsSectionTitle>
        <Body className="mb-4">
          The standardized enum table used across all RoboticelaOS cursor packs for runtime lookup.
        </Body>

        <div className="overflow-hidden rounded-xl border border-border-default bg-bg-surface">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border-default bg-bg-secondary text-text-tertiary font-mono uppercase">
              <tr>
                <th className="p-3">State ID</th>
                <th className="p-3">State Name</th>
                <th className="p-3">Standard Hotspot (32px)</th>
                <th className="p-3">RoboticelaOS Mapping</th>
                <th className="p-3">Affordance / Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-default/50 font-mono">
              {ROBOCURSORS_LIST.map((c) => (
                <tr key={c.id} className="hover:bg-bg-secondary/60 transition-colors">
                  <td className="p-3 font-semibold text-brand-primary">{c.stateId}</td>
                  <td className="p-3 text-text-primary">{c.stateName}</td>
                  <td className="p-3 text-text-secondary">({c.hotspot32.x}, {c.hotspot32.y})</td>
                  <td className="p-3 text-text-tertiary">{c.filename}</td>
                  <td className="p-3 font-sans text-text-secondary">{c.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* INSPECTOR MODAL */}
      {inspectedCursor && (
        <Modal
          open={Boolean(inspectedCursor)}
          onClose={() => setInspectedCursor(null)}
          title={inspectedCursor.title}
          description={`State ID #${inspectedCursor.stateId} • ${inspectedCursor.filename}`}
          size="lg"
          footer={
            <div className="flex w-full items-center justify-between gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => downloadSvg(inspectedCursor)}
              >
                Download .svg
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setInspectedCursor(null)}
              >
                Close
              </Button>
            </div>
          }
        >
          <div className="space-y-4">
            {/* Live Visual Inspector Card */}
            <div className="flex items-center gap-4 rounded-xl border border-border-default bg-bg-secondary p-4">
              <div
                style={{
                  cursor: getCursorCssValue(inspectedCursor),
                }}
                className="grid size-20 shrink-0 place-items-center rounded-xl bg-bg-primary shadow-xs"
                title="Hover over box to test cursor"
              >
                <CursorPreview
                  cursorOrId={inspectedCursor}
                  className="size-12"
                />
              </div>

              <div className="min-w-0 flex-1 space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <Badge variant="pill" size="sm">
                    Category: {inspectedCursor.category}
                  </Badge>
                  <Badge variant="pill" size="sm">
                    Hotspot: ({inspectedCursor.hotspot32.x}, {inspectedCursor.hotspot32.y})
                  </Badge>
                  {inspectedCursor.animated && (
                    <Badge variant="pill" size="sm" tone="brand">
                      Animated ({inspectedCursor.frameCount} frames)
                    </Badge>
                  )}
                </div>
                <p className="text-text-secondary">{inspectedCursor.description}</p>
              </div>
            </div>

            {/* Export Tabs */}
            <div className="flex items-center gap-2 border-b border-border-default pb-2">
              {(
                [
                  { id: 'svg', label: 'Raw SVG' },
                  { id: 'css', label: 'CSS Rule' },
                  { id: 'react', label: 'React JSX' },
                  { id: 'rcur', label: 'RoboCursor (.rcur)' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setInspectorTab(tab.id)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                    inspectorTab === tab.id
                      ? 'bg-brand-primary text-white'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="overflow-hidden rounded-xl border border-border-default">
              {inspectorTab === 'svg' && (
                <CodeBlock code={inspectedCursor.svg} className="max-h-60 overflow-y-auto" />
              )}

              {inspectorTab === 'css' && (
                <CodeBlock code={getCssCursorRule(inspectedCursor)} />
              )}

              {inspectorTab === 'react' && (
                <CodeBlock code={getReactSnippet(inspectedCursor)} />
              )}

              {inspectorTab === 'rcur' && (
                <CodeBlock code={getRcurLoaderSnippet(inspectedCursor)} />
              )}
            </div>
          </div>
        </Modal>
      )}

      <DocsPager
        prev={{ href: '/components/cursors', label: 'All Cursor Packs' }}
        next={{ href: '/components/brand-logo', label: 'Brand Logo' }}
      />
    </article>
  )
}
