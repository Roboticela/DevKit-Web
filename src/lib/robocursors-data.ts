// Generated automatically from refcursors directory.
// RoboticelaOS Cursors Pack Data & Specifications.

export type CursorCategory = 'all' | 'navigation' | 'resize' | 'editing' | 'status'

export interface RoboCursorItem {
  id: string
  filename: string
  title: string
  category: 'navigation' | 'resize' | 'editing' | 'status'
  stateId: number
  stateName: string
  hotspot: { x: number; y: number }
  hotspot32: { x: number; y: number }
  animated: boolean
  frameCount: number
  frameDurationMs: number
  description: string
  keywords: string[]
  svg: string
}

export interface CursorPackMeta {
  id: string
  name: string
  version: string
  author: string
  brandAccent: string
  totalCursors: number
  supportedFormats: ('SVG' | '.rcur' | 'React' | 'CSS')[]
  badge?: string
  description?: string
}

export const ROBOTICELA_OS_PACK_META: CursorPackMeta = {
  id: 'roboticela-os',
  name: 'RoboticelaOS Cursors',
  description: '18 vector cursors calibrated with pixel-exact hotspots, dual-theme adaptation, and animated wait spinners.',
  version: '1.0.0',
  author: 'Roboticela Systems',
  brandAccent: '#3B9EFF',
  totalCursors: 18,
  supportedFormats: ['SVG', '.rcur', 'React', 'CSS'],
  badge: 'Official Pack',
}

export const AVAILABLE_CURSOR_PACKS = [
  ROBOTICELA_OS_PACK_META,
]


export const ROBOCURSORS_LIST: RoboCursorItem[] = [
  {
    "id": "RoboCrosshair",
    "filename": "RoboCrosshair.svg",
    "title": "Precision Crosshair",
    "category": "navigation",
    "stateId": 10,
    "stateName": "crosshair",
    "hotspot": {
      "x": 128,
      "y": 128
    },
    "hotspot32": {
      "x": 16,
      "y": 16
    },
    "animated": false,
    "frameCount": 1,
    "frameDurationMs": 0,
    "description": "Solid dual-theme plus-shaped crosshair with calibrated center hotspot for precision targeting, screenshot selection, and canvas coordinate picking.",
    "keywords": [
      "crosshair",
      "target",
      "aim",
      "precision",
      "reticle",
      "picker",
      "measure"
    ],
    "svg": "<svg width=\"256\" height=\"256\" viewBox=\"0 0 256 256\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n  <defs>\n    <style>\n      :root {\n        --resize-fill-start: #ffffff;\n        --resize-fill-end: #f1f5f9;\n        --resize-stroke: #0f172a;\n        --shadow-opacity: 0.18;\n      }\n\n      @media (prefers-color-scheme: dark) {\n        :root {\n          --resize-fill-start: #27272a;\n          --resize-fill-end: #18181b;\n          --resize-stroke: #ffffff;\n          --shadow-opacity: 0.50;\n        }\n      }\n\n      .resize-main {\n        fill: url(#crosshair-gradient);\n        stroke: var(--resize-stroke);\n        stroke-width: 8;\n        stroke-linecap: round;\n        stroke-linejoin: round;\n        transition: stroke 0.3s ease;\n      }\n\n      .resize-shadow {\n        filter: url(#adaptive-shadow);\n      }\n    </style>\n\n    <!-- Dynamic Theme Gradient Fill -->\n    <linearGradient id=\"crosshair-gradient\" x1=\"20\" y1=\"20\" x2=\"236\" y2=\"236\" gradientUnits=\"userSpaceOnUse\">\n      <stop offset=\"0%\" stop-color=\"var(--resize-fill-start)\" />\n      <stop offset=\"100%\" stop-color=\"var(--resize-fill-end)\" />\n    </linearGradient>\n\n    <!-- Soft Ambient & Directional Shadow -->\n    <filter id=\"adaptive-shadow\" x=\"-10%\" y=\"-10%\" width=\"130%\" height=\"130%\" filterUnits=\"userSpaceOnUse\">\n      <feDropShadow dx=\"-2\" dy=\"8\" stdDeviation=\"8\" flood-color=\"#000000\" flood-opacity=\"var(--shadow-opacity)\" />\n      <feDropShadow dx=\"0\" dy=\"2\" stdDeviation=\"3\" flood-color=\"#000000\" flood-opacity=\"0.1\" />\n    </filter>\n  </defs>\n\n  <g class=\"resize-shadow\">\n    <!-- Vertical + horizontal bars fused as one plus-shaped path -->\n    <path\n      d=\"M118,20\n         L138,20\n         L138,118\n         L236,118\n         L236,138\n         L138,138\n         L138,236\n         L118,236\n         L118,138\n         L20,138\n         L20,118\n         L118,118\n         Z\"\n      class=\"resize-main\"\n    />\n  </g>\n</svg>"
  },
  {
    "id": "RoboDefault",
    "filename": "RoboDefault.svg",
    "title": "Default Arrow",
    "category": "navigation",
    "stateId": 0,
    "stateName": "default",
    "hotspot": {
      "x": 70,
      "y": 50
    },
    "hotspot32": {
      "x": 9,
      "y": 6
    },
    "animated": false,
    "frameCount": 1,
    "frameDurationMs": 0,
    "description": "The standard primary pointer cursor for selection, window navigation, and desktop interaction.",
    "keywords": [
      "arrow",
      "pointer",
      "default",
      "select",
      "primary",
      "navigation"
    ],
    "svg": "<svg width=\"256\" height=\"256\" viewBox=\"0 0 256 256\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\r\n  <defs>\r\n    <style>\r\n      :root {\r\n        --arrow-fill-start: #ffffff;\r\n        --arrow-fill-end: #f1f5f9;\r\n        --arrow-stroke: #0f172a;\r\n        --shadow-opacity: 0.18;\r\n      }\r\n\r\n      @media (prefers-color-scheme: dark) {\r\n        :root {\r\n          --arrow-fill-start: #27272a;\r\n          --arrow-fill-end: #18181b;\r\n          --arrow-stroke: #ffffff;\r\n          --shadow-opacity: 0.50;\r\n        }\r\n      }\r\n\r\n      .arrow-main {\r\n        fill: url(#arrow-gradient);\r\n        stroke: var(--arrow-stroke);\r\n        stroke-width: 8;\r\n        stroke-linecap: round;\r\n        stroke-linejoin: round;\r\n        transition: stroke 0.3s ease;\r\n      }\r\n\r\n      .arrow-shadow {\r\n        filter: url(#adaptive-shadow);\r\n      }\r\n    </style>\r\n\r\n    <!-- Dynamic Theme Gradient Fill -->\r\n    <linearGradient id=\"arrow-gradient\" x1=\"70\" y1=\"50\" x2=\"180\" y2=\"220\" gradientUnits=\"userSpaceOnUse\">\r\n      <stop offset=\"0%\" stop-color=\"var(--arrow-fill-start)\" />\r\n      <stop offset=\"100%\" stop-color=\"var(--arrow-fill-end)\" />\r\n    </linearGradient>\r\n\r\n    <!-- Soft Ambient & Directional Shadow -->\r\n    <filter id=\"adaptive-shadow\" x=\"-10%\" y=\"-10%\" width=\"130%\" height=\"130%\" filterUnits=\"userSpaceOnUse\">\r\n      <feDropShadow dx=\"-2\" dy=\"8\" stdDeviation=\"8\" flood-color=\"#000000\" flood-opacity=\"var(--shadow-opacity)\" />\r\n      <feDropShadow dx=\"0\" dy=\"2\" stdDeviation=\"3\" flood-color=\"#000000\" flood-opacity=\"0.1\" />\r\n    </filter>\r\n  </defs>\r\n\r\n  <g class=\"arrow-shadow\">\r\n    <!-- Classic Pointer Arrow Shape -->\r\n    <path\r\n      d=\"M70 50\r\n         L70 204\r\n         L108.5 171\r\n         L130.5 220.5\r\n         L152.5 209.5\r\n         L125 160\r\n         L180 160\r\n         Z\"\r\n      class=\"arrow-main\"\r\n    />\r\n  </g>\r\n</svg>"
  },
  {
    "id": "RoboEdit",
    "filename": "RoboEdit.svg",
    "title": "Drawing Pencil",
    "category": "editing",
    "stateId": 64,
    "stateName": "pencil",
    "hotspot": {
      "x": 40,
      "y": 220
    },
    "hotspot32": {
      "x": 5,
      "y": 28
    },
    "animated": false,
    "frameCount": 1,
    "frameDurationMs": 0,
    "description": "Angled drafting pencil cursor for freehand sketch pads, annotation overlays, and markup editors.",
    "keywords": [
      "pencil",
      "edit",
      "draw",
      "sketch",
      "write",
      "doodle",
      "annotation"
    ],
    "svg": "<svg width=\"256\" height=\"256\" viewBox=\"0 0 256 256\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\r\n  <defs>\r\n    <style>\r\n      :root {\r\n        --pencil-fill-start: #ffffff;\r\n        --pencil-fill-end: #f1f5f9;\r\n        --pencil-stroke: #0f172a;\r\n        --accent-lines: #0f172a;\r\n        --shadow-opacity: 0.18;\r\n      }\r\n\r\n      @media (prefers-color-scheme: dark) {\r\n        :root {\r\n          --pencil-fill-start: #27272a;\r\n          --pencil-fill-end: #18181b;\r\n          --pencil-stroke: #ffffff;\r\n          --accent-lines: #f4f4f5;\r\n          --shadow-opacity: 0.50;\r\n        }\r\n      }\r\n\r\n      .pencil-main {\r\n        fill: url(#pencil-gradient);\r\n        stroke: var(--pencil-stroke);\r\n        stroke-width: 8;\r\n        stroke-linecap: round;\r\n        stroke-linejoin: round;\r\n        transition: stroke 0.3s ease;\r\n      }\r\n\r\n      .pencil-tip {\r\n        fill: var(--accent-lines);\r\n        transition: fill 0.3s ease;\r\n      }\r\n\r\n      .pencil-line {\r\n        stroke: var(--accent-lines);\r\n        stroke-width: 6;\r\n        stroke-linecap: round;\r\n        transition: stroke 0.3s ease;\r\n      }\r\n\r\n      .pencil-shadow {\r\n        filter: url(#adaptive-shadow);\r\n      }\r\n    </style>\r\n\r\n    <!-- Dynamic Theme Gradient Fill (tip -> eraser end) -->\r\n    <linearGradient id=\"pencil-gradient\" x1=\"40\" y1=\"220\" x2=\"212\" y2=\"67\" gradientUnits=\"userSpaceOnUse\">\r\n      <stop offset=\"0%\" stop-color=\"var(--pencil-fill-start)\" />\r\n      <stop offset=\"100%\" stop-color=\"var(--pencil-fill-end)\" />\r\n    </linearGradient>\r\n\r\n    <!-- Soft Ambient & Directional Shadow -->\r\n    <filter id=\"adaptive-shadow\" x=\"-10%\" y=\"-10%\" width=\"130%\" height=\"130%\" filterUnits=\"userSpaceOnUse\">\r\n      <feDropShadow dx=\"-2\" dy=\"8\" stdDeviation=\"8\" flood-color=\"#000000\" flood-opacity=\"var(--shadow-opacity)\" />\r\n      <feDropShadow dx=\"0\" dy=\"2\" stdDeviation=\"3\" flood-color=\"#000000\" flood-opacity=\"0.1\" />\r\n    </filter>\r\n  </defs>\r\n\r\n  <g class=\"pencil-shadow\">\r\n    <!-- Pencil Body Outline (sharp tip -> wood cone -> barrel -> flat eraser end) -->\r\n    <path\r\n      d=\"M40,220\r\n         L61.2,210.1\r\n         L78.2,201.6\r\n         L212.5,67.3\r\n         L192.7,47.5\r\n         L58.4,181.8\r\n         L49.9,198.8\r\n         Z\"\r\n      class=\"pencil-main\"\r\n    />\r\n\r\n    <!-- Graphite Point -->\r\n    <path d=\"M40,220 L61.2,210.1 L49.9,198.8 Z\" class=\"pencil-tip\" />\r\n\r\n    <!-- Ferrule Band Lines -->\r\n    <path d=\"M191.3,88.5 L171.5,68.7\" class=\"pencil-line\" />\r\n    <path d=\"M198.4,81.4 L178.6,61.6\" class=\"pencil-line\" />\r\n  </g>\r\n</svg>"
  },
  {
    "id": "RoboGrab",
    "filename": "RoboGrab.svg",
    "title": "Grabbing Hand",
    "category": "navigation",
    "stateId": 4,
    "stateName": "grabbing",
    "hotspot": {
      "x": 128,
      "y": 128
    },
    "hotspot32": {
      "x": 16,
      "y": 16
    },
    "animated": false,
    "frameCount": 1,
    "frameDurationMs": 0,
    "description": "Closed fist grasping cursor for active drag-and-drop operations, canvas panning, and card reordering.",
    "keywords": [
      "grab",
      "grabbing",
      "fist",
      "drag",
      "move",
      "pan",
      "canvas"
    ],
    "svg": "<svg width=\"257\" height=\"257\" viewBox=\"0 0 257 257\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n  <defs>\n    <style>\n      :root {\n        --hand-fill-start: #ffffff;\n        --hand-fill-end: #f1f5f9;\n        --hand-stroke: #0f172a;\n        --accent-lines: #0f172a;\n        --shadow-opacity: 0.18;\n      }\n\n      @media (prefers-color-scheme: dark) {\n        :root {\n          --hand-fill-start: #27272a;\n          --hand-fill-end: #18181b;\n          --hand-stroke: #ffffff;\n          --accent-lines: #f4f4f5;\n          --shadow-opacity: 0.50;\n        }\n      }\n\n      .hand-main {\n        fill: url(#grab-hand-fill);\n        stroke: var(--hand-stroke);\n        stroke-width: 8;\n        stroke-linecap: round;\n        stroke-linejoin: round;\n        transition: stroke 0.3s ease;\n      }\n\n      .palm-line {\n        stroke: var(--accent-lines);\n        stroke-width: 8;\n        stroke-linecap: round;\n        transition: stroke 0.3s ease;\n      }\n\n      .hand-shadow {\n        filter: url(#grab-shadow);\n      }\n    </style>\n\n    <linearGradient id=\"grab-hand-fill\" x1=\"60\" y1=\"50\" x2=\"200\" y2=\"220\" gradientUnits=\"userSpaceOnUse\">\n      <stop offset=\"0%\" stop-color=\"var(--hand-fill-start)\" />\n      <stop offset=\"100%\" stop-color=\"var(--hand-fill-end)\" />\n    </linearGradient>\n\n    <filter id=\"grab-shadow\" x=\"-10%\" y=\"-10%\" width=\"130%\" height=\"130%\" filterUnits=\"userSpaceOnUse\">\n      <feDropShadow dx=\"-2\" dy=\"8\" stdDeviation=\"8\" flood-color=\"#000000\" flood-opacity=\"var(--shadow-opacity)\" />\n      <feDropShadow dx=\"0\" dy=\"2\" stdDeviation=\"3\" flood-color=\"#000000\" flood-opacity=\"0.1\" />\n    </filter>\n  </defs>\n\n  <g class=\"hand-shadow\">\n    <path \n      d=\"M81.9403 68.0299C87.9852 65.706 99.9113 67.1291 103.06 74.2053C105.742 80.2371 115.605 100.617 115.731 98.45C116.033 93.6324 115.429 83.2139 117.456 77.7696C118.93 73.8006 121.826 70.0667 126.096 68.748C129.685 67.6252 133.904 67.2336 137.631 68.03C141.573 68.8655 145.716 71.777 147.265 74.5448C151.824 82.6786 151.9 99.3378 152.114 98.45C152.92 94.8988 152.995 82.4044 155.678 77.7696C157.453 74.7015 161.937 71.9598 164.329 71.5159C168.032 70.837 172.591 70.6281 176.47 71.4114C179.605 72.0511 183.85 75.9026 184.996 77.7696C187.754 82.2608 189.303 94.951 189.768 99.4161C189.97 101.257 190.7 94.2852 193.458 89.807C198.571 81.4644 216.681 79.8455 217.361 98.1497C217.688 106.688 217.613 106.297 217.613 112.041C217.613 118.778 217.462 122.851 217.109 127.734C216.731 132.943 215.648 144.759 214.074 150.477C212.991 154.407 209.402 163.246 205.85 168.547C205.85 168.547 192.325 184.866 190.852 192.204C189.378 199.554 189.869 199.606 189.567 204.803C189.358 208.56 190.243 213.167 190.753 215.443C190.921 216.194 190.42 216.94 189.654 217.026C186.673 217.36 179.742 217.999 175.55 217.297C170.626 216.487 164.531 206.33 162.957 203.223C160.791 198.94 156.169 199.763 154.368 202.923C151.547 207.923 145.439 216.892 141.145 217.454C133.027 218.51 116.526 217.894 103.111 217.731C102.32 217.722 101.717 217.01 101.812 216.225C102.242 212.643 102.862 203.582 98.7423 199.985C94.9013 196.59 88.2897 189.749 84.3353 186.146L73.8575 174.121C70.2935 169.421 61.2387 161.993 58.2037 148.206C55.5213 135.985 55.7857 129.993 58.6697 125.097C61.5914 120.123 67.1073 117.407 69.4246 116.937C72.044 116.389 78.1393 116.428 80.4439 117.746C83.2523 119.352 84.3857 119.822 86.5896 122.851C89.4861 126.859 90.5187 128.805 89.272 124.431C88.3149 121.01 85.2169 116.663 83.8064 111.767C82.4337 107.054 71.198 89.2456 71.4625 81.6341C71.5633 78.7488 72.7596 71.5681 81.9403 68.0299Z\" \n      class=\"hand-main\"\n    />\n\n    <!-- Three Palm Detail Lines -->\n    <path d=\"M179.004 177.17V135.146\" class=\"palm-line\" />\n    <path d=\"M152.881 177.17V135.146\" class=\"palm-line\" />\n    <path d=\"M127.894 135.146V177.17\" class=\"palm-line\" />\n  </g>\n</svg>"
  },
  {
    "id": "RoboLink",
    "filename": "RoboLink.svg",
    "title": "Link Pointer",
    "category": "navigation",
    "stateId": 1,
    "stateName": "pointer",
    "hotspot": {
      "x": 89,
      "y": 41
    },
    "hotspot32": {
      "x": 11,
      "y": 5
    },
    "animated": false,
    "frameCount": 1,
    "frameDurationMs": 0,
    "description": "Index-finger pointing hand designed specifically for hyperlinks, navigation tabs, and external anchors.",
    "keywords": [
      "link",
      "pointer",
      "anchor",
      "url",
      "hand",
      "web"
    ],
    "svg": "<svg width=\"257\" height=\"257\" viewBox=\"0 0 257 257\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n  <defs>\n    <style>\n      :root {\n        --hand-fill-start: #ffffff;\n        --hand-fill-end: #f1f5f9;\n        --hand-stroke: #0f172a;\n        --accent-lines: #0f172a;\n        --shadow-opacity: 0.18;\n      }\n\n      @media (prefers-color-scheme: dark) {\n        :root {\n          --hand-fill-start: #27272a;\n          --hand-fill-end: #18181b;\n          --hand-stroke: #ffffff;\n          --accent-lines: #f4f4f5;\n          --shadow-opacity: 0.50;\n        }\n      }\n\n      .hand-main {\n        fill: url(#link-hand-fill);\n        stroke: var(--hand-stroke);\n        stroke-width: 8;\n        stroke-linecap: round;\n        stroke-linejoin: round;\n        transition: stroke 0.3s ease;\n      }\n\n      .palm-line {\n        stroke: var(--accent-lines);\n        stroke-width: 8;\n        stroke-linecap: round;\n        transition: stroke 0.3s ease;\n      }\n\n      .hand-shadow {\n        filter: url(#link-shadow);\n      }\n    </style>\n\n    <linearGradient id=\"link-hand-fill\" x1=\"60\" y1=\"30\" x2=\"200\" y2=\"220\" gradientUnits=\"userSpaceOnUse\">\n      <stop offset=\"0%\" stop-color=\"var(--hand-fill-start)\" />\n      <stop offset=\"100%\" stop-color=\"var(--hand-fill-end)\" />\n    </linearGradient>\n\n    <filter id=\"link-shadow\" x=\"-10%\" y=\"-10%\" width=\"130%\" height=\"130%\" filterUnits=\"userSpaceOnUse\">\n      <feDropShadow dx=\"-2\" dy=\"8\" stdDeviation=\"8\" flood-color=\"#000000\" flood-opacity=\"var(--shadow-opacity)\" />\n      <feDropShadow dx=\"0\" dy=\"2\" stdDeviation=\"3\" flood-color=\"#000000\" flood-opacity=\"0.1\" />\n    </filter>\n  </defs>\n\n  <g class=\"hand-shadow\">\n    <path \n      d=\"M81.0183 180.026C77.6138 175.993 73.4782 167.747 66.1179 157.738C61.9463 152.076 51.6011 141.415 48.5203 136C45.8471 131.214 46.1348 129.069 46.7702 125.103C47.897 118.048 55.6169 112.555 63.8523 113.296C70.0737 113.847 75.3482 117.7 80.0953 121.34C86.5499 126.275 89.6466 134.286 93.087 141.647C93.8232 143.222 94.2708 143.773 94 142C93.1537 136.459 83.6081 86.5647 83.5009 86.0046L83.495 85.9739L78.7682 61.3943C77.1058 52.7503 80.7622 42.5647 89.5 41.4999C98.1629 40.4443 106.163 46.1267 108.449 54.549L113.464 73.0246C113.821 74.3406 114.109 75.6552 114.333 77.0004C115.57 84.443 119.843 110.194 119.996 111.929C119.97 110.998 119.827 103.622 119.701 97.0462C119.575 90.4682 123.421 85.5 130 85.5C146 85.5 152.62 94.02 152.62 98.5C152.62 92 161.371 87.4611 167 87.4611C175.32 87.4611 181.08 89.468 183 94.5C184.92 99.5319 185.899 113.5 186 114C186.298 115.47 186.93 106.506 191 103C197.838 97.1093 208.5 100.5 209.881 111C210.271 113.967 210.36 119.705 210.36 124.647C210.36 130.455 210.216 133.949 209.881 138.151C209.509 142.644 208.478 152.8 206.98 157.72C205.966 161.045 202.645 168.456 199.331 173.039C199.22 173.193 199.113 173.336 199 173.489C197.587 175.404 187.496 189.232 186.192 195.112C184.778 201.426 185.245 201.471 184.969 205.953C184.778 209.048 185.547 212.822 186.038 214.851C186.224 215.62 185.709 216.394 184.922 216.472C182.015 216.763 175.549 217.291 171.627 216.704C166.94 215.996 166.893 208.615 165.395 205.942C163.333 202.257 157.368 201.089 155.654 203.807C152.957 208.11 147.155 215.827 143.055 216.311C135.36 217.217 119.716 216.703 106.964 216.552C106.164 216.542 105.558 215.811 105.658 215.017C106.063 211.79 106.53 204.298 102.705 201.28C99.0493 198.37 94.7559 193.472 90.9918 190.372L81.0183 180.026Z\" \n      class=\"hand-main\"\n    />\n\n    <!-- Three Palm Detail Lines -->\n    <path d=\"M175 183L175 145\" class=\"palm-line\" />\n    <path d=\"M152 182.899V144.92\" class=\"palm-line\" />\n    <path d=\"M128.7 143.92V181.899\" class=\"palm-line\" />\n  </g>\n</svg>"
  },
  {
    "id": "RoboMove",
    "filename": "RoboMove.svg",
    "title": "Four-Way Move",
    "category": "navigation",
    "stateId": 6,
    "stateName": "move",
    "hotspot": {
      "x": 128,
      "y": 128
    },
    "hotspot32": {
      "x": 16,
      "y": 16
    },
    "animated": false,
    "frameCount": 1,
    "frameDurationMs": 0,
    "description": "Omnidirectional 4-point arrow cursor for movable dialogs, freeform layout canvas items, and grid widgets.",
    "keywords": [
      "move",
      "pan",
      "all-scroll",
      "drag",
      "directions",
      "arrows"
    ],
    "svg": "<svg width=\"256\" height=\"256\" viewBox=\"0 0 256 256\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\r\n  <defs>\r\n    <style>\r\n      :root {\r\n        --resize-fill-start: #ffffff;\r\n        --resize-fill-end: #f1f5f9;\r\n        --resize-stroke: #0f172a;\r\n        --shadow-opacity: 0.18;\r\n      }\r\n\r\n      @media (prefers-color-scheme: dark) {\r\n        :root {\r\n          --resize-fill-start: #27272a;\r\n          --resize-fill-end: #18181b;\r\n          --resize-stroke: #ffffff;\r\n          --shadow-opacity: 0.50;\r\n        }\r\n      }\r\n\r\n      .resize-main {\r\n        fill: url(#all-resize-gradient);\r\n        stroke: var(--resize-stroke);\r\n        stroke-width: 8;\r\n        stroke-linecap: round;\r\n        stroke-linejoin: round;\r\n        transition: stroke 0.3s ease;\r\n      }\r\n\r\n      .resize-shadow {\r\n        filter: url(#adaptive-shadow);\r\n      }\r\n    </style>\r\n\r\n    <!-- Dynamic Theme Gradient Fill -->\r\n    <radialGradient id=\"all-resize-gradient\" cx=\"128\" cy=\"128\" r=\"120\" gradientUnits=\"userSpaceOnUse\">\r\n      <stop offset=\"0%\" stop-color=\"var(--resize-fill-start)\" />\r\n      <stop offset=\"100%\" stop-color=\"var(--resize-fill-end)\" />\r\n    </radialGradient>\r\n\r\n    <!-- Soft Ambient & Directional Shadow -->\r\n    <filter id=\"adaptive-shadow\" x=\"-10%\" y=\"-10%\" width=\"130%\" height=\"130%\" filterUnits=\"userSpaceOnUse\">\r\n      <feDropShadow dx=\"-2\" dy=\"8\" stdDeviation=\"8\" flood-color=\"#000000\" flood-opacity=\"var(--shadow-opacity)\" />\r\n      <feDropShadow dx=\"0\" dy=\"2\" stdDeviation=\"3\" flood-color=\"#000000\" flood-opacity=\"0.1\" />\r\n    </filter>\r\n  </defs>\r\n\r\n  <g class=\"resize-shadow\">\r\n    <!-- Four-directional (all-side) resize arrow -->\r\n    <path\r\n      d=\"M128 16\r\n         L84 60\r\n         L112 60\r\n         L112 112\r\n         L60 112\r\n         L60 84\r\n         L16 128\r\n         L60 172\r\n         L60 144\r\n         L112 144\r\n         L112 196\r\n         L84 196\r\n         L128 240\r\n         L172 196\r\n         L144 196\r\n         L144 144\r\n         L196 144\r\n         L196 172\r\n         L240 128\r\n         L196 84\r\n         L196 112\r\n         L144 112\r\n         L144 60\r\n         L172 60\r\n         Z\"\r\n      class=\"resize-main\"\r\n    />\r\n  </g>\r\n</svg>"
  },
  {
    "id": "RoboNotAllowed",
    "filename": "RoboNotAllowed.svg",
    "title": "Not Allowed / Disabled",
    "category": "status",
    "stateId": 5,
    "stateName": "disabled",
    "hotspot": {
      "x": 128,
      "y": 128
    },
    "hotspot32": {
      "x": 16,
      "y": 16
    },
    "animated": false,
    "frameCount": 1,
    "frameDurationMs": 0,
    "description": "Prohibition ring with diagonal slash and transparent interior indicating non-actionable or restricted targets.",
    "keywords": [
      "not-allowed",
      "forbidden",
      "disabled",
      "prohibition",
      "block",
      "denied"
    ],
    "svg": "<svg width=\"256\" height=\"256\" viewBox=\"0 0 256 256\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\r\n  <defs>\r\n    <style>\r\n      :root {\r\n        --unavailable-ring: #dc2626;\r\n        --shadow-opacity: 0.18;\r\n      }\r\n\r\n      @media (prefers-color-scheme: dark) {\r\n        :root {\r\n          --unavailable-ring: #f87171;\r\n          --shadow-opacity: 0.50;\r\n        }\r\n      }\r\n\r\n      .unavailable-disc {\r\n        fill: none;\r\n        stroke: var(--unavailable-ring);\r\n        stroke-width: 16;\r\n        transition: stroke 0.3s ease;\r\n      }\r\n\r\n      .unavailable-slash {\r\n        stroke: var(--unavailable-ring);\r\n        stroke-width: 16;\r\n        stroke-linecap: round;\r\n        transition: stroke 0.3s ease;\r\n      }\r\n\r\n      .unavailable-shadow {\r\n        filter: url(#adaptive-shadow);\r\n      }\r\n    </style>\r\n\r\n    <!-- Soft Ambient & Directional Shadow -->\r\n    <filter id=\"adaptive-shadow\" x=\"-10%\" y=\"-10%\" width=\"130%\" height=\"130%\" filterUnits=\"userSpaceOnUse\">\r\n      <feDropShadow dx=\"-2\" dy=\"8\" stdDeviation=\"8\" flood-color=\"#000000\" flood-opacity=\"var(--shadow-opacity)\" />\r\n      <feDropShadow dx=\"0\" dy=\"2\" stdDeviation=\"3\" flood-color=\"#000000\" flood-opacity=\"0.1\" />\r\n    </filter>\r\n  </defs>\r\n\r\n  <g class=\"unavailable-shadow\">\r\n    <!-- Prohibition Ring -->\r\n    <circle cx=\"128\" cy=\"128\" r=\"84\" class=\"unavailable-disc\" />\r\n\r\n    <!-- Diagonal Slash -->\r\n    <line x1=\"70\" y1=\"186\" x2=\"186\" y2=\"70\" class=\"unavailable-slash\" />\r\n  </g>\r\n</svg>"
  },
  {
    "id": "RoboPointer",
    "filename": "RoboPointer.svg",
    "title": "Pointer Hand",
    "category": "navigation",
    "stateId": 1,
    "stateName": "pointer",
    "hotspot": {
      "x": 84,
      "y": 49
    },
    "hotspot32": {
      "x": 11,
      "y": 6
    },
    "animated": false,
    "frameCount": 1,
    "frameDurationMs": 0,
    "description": "Open hand cursor indicating clickable interactive items, actions, and buttons.",
    "keywords": [
      "hand",
      "pointer",
      "click",
      "button",
      "interactive"
    ],
    "svg": "<svg width=\"256\" height=\"256\" viewBox=\"0 0 256 256\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n  <defs>\n    <style>\n      :root {\n        --hand-fill-start: #ffffff;\n        --hand-fill-end: #f1f5f9;\n        --hand-stroke: #0f172a;\n        --accent-lines: #0f172a;\n        --shadow-opacity: 0.18;\n      }\n \n      @media (prefers-color-scheme: dark) {\n        :root {\n          --hand-fill-start: #27272a;\n          --hand-fill-end: #18181b;\n          --hand-stroke: #ffffff;\n          --accent-lines: #f4f4f5;\n          --shadow-opacity: 0.50;\n        }\n      }\n\n      .hand-main {\n        fill: url(#hand-gradient);\n        stroke: var(--hand-stroke);\n        stroke-width: 8;\n        stroke-linecap: round;\n        stroke-linejoin: round;\n        transition: stroke 0.3s ease;\n      }\n\n      .palm-line {\n        stroke: var(--accent-lines);\n        stroke-width: 8;\n        stroke-linecap: round;\n        transition: stroke 0.3s ease;\n      }\n\n      .hand-shadow {\n        filter: url(#adaptive-shadow);\n      }\n    </style>\n\n    <!-- Dynamic Theme Gradient Fill -->\n    <linearGradient id=\"hand-gradient\" x1=\"60\" y1=\"40\" x2=\"200\" y2=\"220\" gradientUnits=\"userSpaceOnUse\">\n      <stop offset=\"0%\" stop-color=\"var(--hand-fill-start)\" />\n      <stop offset=\"100%\" stop-color=\"var(--hand-fill-end)\" />\n    </linearGradient>\n\n    <!-- Soft Ambient & Directional Shadow -->\n    <filter id=\"adaptive-shadow\" x=\"-10%\" y=\"-10%\" width=\"130%\" height=\"130%\" filterUnits=\"userSpaceOnUse\">\n      <feDropShadow dx=\"-2\" dy=\"8\" stdDeviation=\"8\" flood-color=\"#000000\" flood-opacity=\"var(--shadow-opacity)\" />\n      <feDropShadow dx=\"0\" dy=\"2\" stdDeviation=\"3\" flood-color=\"#000000\" flood-opacity=\"0.1\" />\n    </filter>\n  </defs>\n\n  <g class=\"hand-shadow\">\n    <!-- Hand Outline & Base Fill -->\n    <path \n      d=\"M86.7382 132.622C85.5698 128.133 84.4015 122.482 81.898 114.041C79.9071 107.372 77.8208 103.757 76.2948 99.279C74.447 93.8316 72.6826 90.6469 70.3817 85.1396C68.7246 81.2007 66.0422 72.5925 64.9335 67.8993C63.5148 61.8054 65.3269 56.8368 67.8424 53.4606C70.8586 49.4019 79.311 47.5941 84.02 49.2583C88.4429 50.8147 92.8897 55.3882 94.9402 58.6925C98.3736 64.1999 99.1962 66.2591 103.488 77.154C108.173 89.0307 110.212 100.117 110.772 103.864L111.781 110.109C111.796 110.198 111.784 110.202 111.782 110.111C111.364 97.7916 110.546 73.5383 110.808 60.1771C110.832 58.6686 111.571 53.1493 111.809 51.6168C112.739 45.6306 115.445 42.0389 119.833 39.8958C124.744 37.4894 130.872 37.3218 136.535 39.6923C141.578 41.7635 143.998 46.2771 144.725 51.9281C144.892 53.2331 145.846 63.7449 145.834 65.1816C145.679 77.4533 145.905 84.8283 146.012 91.2096C146.06 93.9753 146.048 110.665 146.215 108.797C146.942 100.943 147.336 70.6171 150.316 61.6018C152.033 56.4178 155.144 52.6704 159.782 50.4795C164.92 48.0491 173.051 49.6414 176.52 53.3888C179.918 57.0403 181.837 61.6737 182.266 67.193C182.648 72.0418 182.04 77.9322 182.028 82.0986C182.028 92.4787 181.777 97.9501 181.587 107.492C181.575 107.947 181.408 111.06 181.861 109.671C182.981 106.319 184.102 103.182 185.032 100.752C185.616 99.2551 187.905 93.4006 189.312 90.4673C190.671 87.6658 191.827 86.0495 194.259 82.2303C196.644 78.483 199.207 76.8667 202.223 75.5138C208.661 72.7003 215.444 76.8547 217.733 82.5895C218.758 85.1636 217.84 91.1258 217.399 95.819C216.672 103.565 214.371 111.455 213.203 115.55C211.677 120.901 209.936 130.336 209.149 134.717C208.291 139.435 206.36 151.263 204.869 156.507C203.844 160.111 200.447 168.216 197.097 173.077C197.097 173.077 184.293 188.043 182.886 194.771C181.491 201.512 181.956 201.559 181.682 206.324C181.48 209.699 182.283 213.819 182.772 215.949C182.946 216.707 182.439 217.461 181.666 217.544C178.79 217.853 172.328 218.419 168.413 217.782C163.752 217.04 157.982 207.713 156.492 204.876C154.441 200.949 150.066 201.703 148.361 204.6C145.679 209.186 139.909 217.411 135.831 217.926C128.176 218.892 112.611 218.333 99.9277 218.181C99.1337 218.172 98.5306 217.45 98.6255 216.662C99.0313 213.29 99.5498 205.16 95.7032 201.907C92.0671 198.794 85.8083 192.52 82.0649 189.216L72.1461 178.189C68.7604 173.879 64.6474 165.103 57.3275 154.424C53.1788 148.39 45.084 141.434 42.0202 135.52C39.3617 130.431 38.0741 124.098 39.7551 119.656C42.4374 112.544 47.8022 108.917 55.9923 109.695C62.1796 110.294 66.1018 112.161 70.7513 116.124C73.4336 118.399 77.5823 122.518 79.6925 125.08C81.6357 127.414 82.1126 128.384 84.1869 131.174C86.9289 134.849 87.7873 136.669 86.7382 132.622Z\" \n      class=\"hand-main\" \n    />\n\n    <!-- Three Palm Detail Strokes -->\n    <path d=\"M169.6 181.36V139.76\" class=\"palm-line\" />\n    <path d=\"M146.6 181.36V140.4\" class=\"palm-line\" />\n    <path d=\"M122.92 140.4V180.08\" class=\"palm-line\" />\n  </g>\n</svg>"
  },
  {
    "id": "RoboResizeEW",
    "filename": "RoboResizeEW.svg",
    "title": "Horizontal Resize",
    "category": "resize",
    "stateId": 6,
    "stateName": "resize-h",
    "hotspot": {
      "x": 128,
      "y": 128
    },
    "hotspot32": {
      "x": 16,
      "y": 16
    },
    "animated": false,
    "frameCount": 1,
    "frameDurationMs": 0,
    "description": "Double-ended horizontal arrow for column borders, sidebar width adjusters, and lateral window scaling.",
    "keywords": [
      "resize",
      "ew",
      "horizontal",
      "col-resize",
      "width",
      "lateral"
    ],
    "svg": "<svg width=\"257\" height=\"256\" viewBox=\"0 0 257 256\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\r\n  <defs>\r\n    <style>\r\n      :root {\r\n        --resize-fill-start: #ffffff;\r\n        --resize-fill-end: #f1f5f9;\r\n        --resize-stroke: #0f172a;\r\n        --shadow-opacity: 0.18;\r\n      }\r\n\r\n      @media (prefers-color-scheme: dark) {\r\n        :root {\r\n          --resize-fill-start: #27272a;\r\n          --resize-fill-end: #18181b;\r\n          --resize-stroke: #ffffff;\r\n          --shadow-opacity: 0.50;\r\n        }\r\n      }\r\n\r\n      .resize-main {\r\n        fill: url(#horizontal-resize-gradient);\r\n        stroke: var(--resize-stroke);\r\n        stroke-width: 8;\r\n        stroke-linecap: round;\r\n        stroke-linejoin: round;\r\n        transition: stroke 0.3s ease;\r\n      }\r\n\r\n      .resize-shadow {\r\n        filter: url(#adaptive-shadow);\r\n      }\r\n    </style>\r\n\r\n    <!-- Dynamic Theme Gradient Fill -->\r\n    <linearGradient id=\"horizontal-resize-gradient\" x1=\"20\" y1=\"128\" x2=\"237\" y2=\"128\" gradientUnits=\"userSpaceOnUse\">\r\n      <stop offset=\"0%\" stop-color=\"var(--resize-fill-start)\" />\r\n      <stop offset=\"100%\" stop-color=\"var(--resize-fill-end)\" />\r\n    </linearGradient>\r\n\r\n    <!-- Soft Ambient & Directional Shadow -->\r\n    <filter id=\"adaptive-shadow\" x=\"-10%\" y=\"-10%\" width=\"130%\" height=\"130%\" filterUnits=\"userSpaceOnUse\">\r\n      <feDropShadow dx=\"-2\" dy=\"8\" stdDeviation=\"8\" flood-color=\"#000000\" flood-opacity=\"var(--shadow-opacity)\" />\r\n      <feDropShadow dx=\"0\" dy=\"2\" stdDeviation=\"3\" flood-color=\"#000000\" flood-opacity=\"0.1\" />\r\n    </filter>\r\n  </defs>\r\n\r\n  <g class=\"resize-shadow\">\r\n    <!-- Double-headed horizontal arrow -->\r\n    <path\r\n      d=\"M20 128\r\n         L64 84\r\n         L64 112\r\n         L193 112\r\n         L193 84\r\n         L237 128\r\n         L193 172\r\n         L193 144\r\n         L64 144\r\n         L64 172\r\n         Z\"\r\n      class=\"resize-main\"\r\n    />\r\n  </g>\r\n</svg>"
  },
  {
    "id": "RoboResizeNESW",
    "filename": "RoboResizeNESW.svg",
    "title": "Diagonal Resize (NE-SW)",
    "category": "resize",
    "stateId": 7,
    "stateName": "resize-diag-1",
    "hotspot": {
      "x": 128,
      "y": 128
    },
    "hotspot32": {
      "x": 16,
      "y": 16
    },
    "animated": false,
    "frameCount": 1,
    "frameDurationMs": 0,
    "description": "Diagonal bidirectional arrow for top-right and bottom-left window corner resizing.",
    "keywords": [
      "resize",
      "nesw",
      "diagonal",
      "corner",
      "window"
    ],
    "svg": "<svg width=\"256\" height=\"256\" viewBox=\"0 0 256 256\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\r\n  <defs>\r\n    <style>\r\n      :root {\r\n        --resize-fill-start: #ffffff;\r\n        --resize-fill-end: #f1f5f9;\r\n        --resize-stroke: #0f172a;\r\n        --shadow-opacity: 0.18;\r\n      }\r\n\r\n      @media (prefers-color-scheme: dark) {\r\n        :root {\r\n          --resize-fill-start: #27272a;\r\n          --resize-fill-end: #18181b;\r\n          --resize-stroke: #ffffff;\r\n          --shadow-opacity: 0.50;\r\n        }\r\n      }\r\n\r\n      .resize-main {\r\n        fill: url(#nesw-resize-gradient);\r\n        stroke: var(--resize-stroke);\r\n        stroke-width: 8;\r\n        stroke-linecap: round;\r\n        stroke-linejoin: round;\r\n        transition: stroke 0.3s ease;\r\n      }\r\n\r\n      .resize-shadow {\r\n        filter: url(#adaptive-shadow);\r\n      }\r\n    </style>\r\n\r\n    <linearGradient id=\"nesw-resize-gradient\" x1=\"205.1\" y1=\"50.9\" x2=\"51.6\" y2=\"204.4\" gradientUnits=\"userSpaceOnUse\">\r\n      <stop offset=\"0%\" stop-color=\"var(--resize-fill-start)\" />\r\n      <stop offset=\"100%\" stop-color=\"var(--resize-fill-end)\" />\r\n    </linearGradient>\r\n\r\n    <filter id=\"adaptive-shadow\" x=\"-10%\" y=\"-10%\" width=\"130%\" height=\"130%\" filterUnits=\"userSpaceOnUse\">\r\n      <feDropShadow dx=\"-2\" dy=\"8\" stdDeviation=\"8\" flood-color=\"#000000\" flood-opacity=\"var(--shadow-opacity)\" />\r\n      <feDropShadow dx=\"0\" dy=\"2\" stdDeviation=\"3\" flood-color=\"#000000\" flood-opacity=\"0.1\" />\r\n    </filter>\r\n  </defs>\r\n\r\n  <g class=\"resize-shadow\">\r\n    <!-- Double-headed diagonal arrow (top-right <-> bottom-left) -->\r\n    <path\r\n      d=\"M51.6,204.4\r\n         L51.6,142.1\r\n         L71.4,161.9\r\n         L162.6,70.7\r\n         L142.9,50.9\r\n         L205.1,50.9\r\n         L205.1,113.2\r\n         L185.3,93.3\r\n         L94.1,184.6\r\n         L113.9,204.4\r\n         Z\"\r\n      class=\"resize-main\"\r\n    />\r\n  </g>\r\n</svg>"
  },
  {
    "id": "RoboResizeNS",
    "filename": "RoboResizeNS.svg",
    "title": "Vertical Resize",
    "category": "resize",
    "stateId": 6,
    "stateName": "resize-v",
    "hotspot": {
      "x": 128,
      "y": 128
    },
    "hotspot32": {
      "x": 16,
      "y": 16
    },
    "animated": false,
    "frameCount": 1,
    "frameDurationMs": 0,
    "description": "Double-ended vertical arrow for row dividers, bottom panel shelves, and vertical window scaling.",
    "keywords": [
      "resize",
      "ns",
      "vertical",
      "row-resize",
      "height",
      "top",
      "bottom"
    ],
    "svg": "<svg width=\"256\" height=\"257\" viewBox=\"0 0 256 257\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\r\n  <defs>\r\n    <style>\r\n      :root {\r\n        --resize-fill-start: #ffffff;\r\n        --resize-fill-end: #f1f5f9;\r\n        --resize-stroke: #0f172a;\r\n        --shadow-opacity: 0.18;\r\n      }\r\n\r\n      @media (prefers-color-scheme: dark) {\r\n        :root {\r\n          --resize-fill-start: #27272a;\r\n          --resize-fill-end: #18181b;\r\n          --resize-stroke: #ffffff;\r\n          --shadow-opacity: 0.50;\r\n        }\r\n      }\r\n\r\n      .resize-main {\r\n        fill: url(#vertical-resize-gradient);\r\n        stroke: var(--resize-stroke);\r\n        stroke-width: 8;\r\n        stroke-linecap: round;\r\n        stroke-linejoin: round;\r\n        transition: stroke 0.3s ease;\r\n      }\r\n\r\n      .resize-shadow {\r\n        filter: url(#adaptive-shadow);\r\n      }\r\n    </style>\r\n\r\n    <!-- Dynamic Theme Gradient Fill -->\r\n    <linearGradient id=\"vertical-resize-gradient\" x1=\"128\" y1=\"20\" x2=\"128\" y2=\"237\" gradientUnits=\"userSpaceOnUse\">\r\n      <stop offset=\"0%\" stop-color=\"var(--resize-fill-start)\" />\r\n      <stop offset=\"100%\" stop-color=\"var(--resize-fill-end)\" />\r\n    </linearGradient>\r\n\r\n    <!-- Soft Ambient & Directional Shadow -->\r\n    <filter id=\"adaptive-shadow\" x=\"-10%\" y=\"-10%\" width=\"130%\" height=\"130%\" filterUnits=\"userSpaceOnUse\">\r\n      <feDropShadow dx=\"-2\" dy=\"8\" stdDeviation=\"8\" flood-color=\"#000000\" flood-opacity=\"var(--shadow-opacity)\" />\r\n      <feDropShadow dx=\"0\" dy=\"2\" stdDeviation=\"3\" flood-color=\"#000000\" flood-opacity=\"0.1\" />\r\n    </filter>\r\n  </defs>\r\n\r\n  <g class=\"resize-shadow\">\r\n    <!-- Double-headed vertical arrow -->\r\n    <path\r\n      d=\"M128 20\r\n         L84 64\r\n         L112 64\r\n         L112 193\r\n         L84 193\r\n         L128 237\r\n         L172 193\r\n         L144 193\r\n         L144 64\r\n         L172 64\r\n         Z\"\r\n      class=\"resize-main\"\r\n    />\r\n  </g>\r\n</svg>"
  },
  {
    "id": "RoboResizeNWSE",
    "filename": "RoboResizeNWSE.svg",
    "title": "Diagonal Resize (NW-SE)",
    "category": "resize",
    "stateId": 8,
    "stateName": "resize-diag-2",
    "hotspot": {
      "x": 128,
      "y": 128
    },
    "hotspot32": {
      "x": 16,
      "y": 16
    },
    "animated": false,
    "frameCount": 1,
    "frameDurationMs": 0,
    "description": "Diagonal bidirectional arrow for top-left and bottom-right window corner resizing.",
    "keywords": [
      "resize",
      "nwse",
      "diagonal",
      "corner",
      "window"
    ],
    "svg": "<svg width=\"256\" height=\"256\" viewBox=\"0 0 256 256\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\r\n  <defs>\r\n    <style>\r\n      :root {\r\n        --resize-fill-start: #ffffff;\r\n        --resize-fill-end: #f1f5f9;\r\n        --resize-stroke: #0f172a;\r\n        --shadow-opacity: 0.18;\r\n      }\r\n\r\n      @media (prefers-color-scheme: dark) {\r\n        :root {\r\n          --resize-fill-start: #27272a;\r\n          --resize-fill-end: #18181b;\r\n          --resize-stroke: #ffffff;\r\n          --shadow-opacity: 0.50;\r\n        }\r\n      }\r\n\r\n      .resize-main {\r\n        fill: url(#nwse-resize-gradient);\r\n        stroke: var(--resize-stroke);\r\n        stroke-width: 8;\r\n        stroke-linecap: round;\r\n        stroke-linejoin: round;\r\n        transition: stroke 0.3s ease;\r\n      }\r\n\r\n      .resize-shadow {\r\n        filter: url(#adaptive-shadow);\r\n      }\r\n    </style>\r\n\r\n    <linearGradient id=\"nwse-resize-gradient\" x1=\"51.6\" y1=\"51.6\" x2=\"205.1\" y2=\"205.1\" gradientUnits=\"userSpaceOnUse\">\r\n      <stop offset=\"0%\" stop-color=\"var(--resize-fill-start)\" />\r\n      <stop offset=\"100%\" stop-color=\"var(--resize-fill-end)\" />\r\n    </linearGradient>\r\n\r\n    <filter id=\"adaptive-shadow\" x=\"-10%\" y=\"-10%\" width=\"130%\" height=\"130%\" filterUnits=\"userSpaceOnUse\">\r\n      <feDropShadow dx=\"-2\" dy=\"8\" stdDeviation=\"8\" flood-color=\"#000000\" flood-opacity=\"var(--shadow-opacity)\" />\r\n      <feDropShadow dx=\"0\" dy=\"2\" stdDeviation=\"3\" flood-color=\"#000000\" flood-opacity=\"0.1\" />\r\n    </filter>\r\n  </defs>\r\n\r\n  <g class=\"resize-shadow\">\r\n    <!-- Double-headed diagonal arrow (top-left <-> bottom-right) -->\r\n    <path\r\n      d=\"M51.6,51.6\r\n         L113.9,51.6\r\n         L94.1,71.4\r\n         L185.3,162.6\r\n         L205.1,142.9\r\n         L205.1,205.1\r\n         L142.9,205.1\r\n         L162.6,185.3\r\n         L71.4,94.1\r\n         L51.6,113.9\r\n         Z\"\r\n      class=\"resize-main\"\r\n    />\r\n  </g>\r\n</svg>"
  },
  {
    "id": "RoboResizeSplitEW",
    "filename": "RoboResizeSplitEW.svg",
    "title": "Split Window Resize (H)",
    "category": "resize",
    "stateId": 6,
    "stateName": "col-resize",
    "hotspot": {
      "x": 128,
      "y": 128
    },
    "hotspot32": {
      "x": 16,
      "y": 16
    },
    "animated": false,
    "frameCount": 1,
    "frameDurationMs": 0,
    "description": "Horizontal arrows intersected by a tall divider bar for resizable split panes and multi-column viewports.",
    "keywords": [
      "split",
      "col-resize",
      "multiwindow",
      "divider",
      "pane",
      "horizontal"
    ],
    "svg": "<svg width=\"256\" height=\"256\" viewBox=\"0 0 256 256\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\r\n  <defs>\r\n    <style>\r\n      :root {\r\n        --resize-fill-start: #ffffff;\r\n        --resize-fill-end: #f1f5f9;\r\n        --resize-stroke: #0f172a;\r\n        --shadow-opacity: 0.18;\r\n      }\r\n\r\n      @media (prefers-color-scheme: dark) {\r\n        :root {\r\n          --resize-fill-start: #27272a;\r\n          --resize-fill-end: #18181b;\r\n          --resize-stroke: #ffffff;\r\n          --shadow-opacity: 0.50;\r\n        }\r\n      }\r\n\r\n      .resize-main {\r\n        fill: url(#multiwindow-resize-gradient);\r\n        stroke: var(--resize-stroke);\r\n        stroke-width: 8;\r\n        stroke-linecap: round;\r\n        stroke-linejoin: round;\r\n        transition: stroke 0.3s ease;\r\n      }\r\n\r\n      .resize-shadow {\r\n        filter: url(#adaptive-shadow);\r\n      }\r\n    </style>\r\n\r\n    <!-- Dynamic Theme Gradient Fill -->\r\n    <linearGradient id=\"multiwindow-resize-gradient\" x1=\"20\" y1=\"128\" x2=\"236\" y2=\"128\" gradientUnits=\"userSpaceOnUse\">\r\n      <stop offset=\"0%\" stop-color=\"var(--resize-fill-start)\" />\r\n      <stop offset=\"100%\" stop-color=\"var(--resize-fill-end)\" />\r\n    </linearGradient>\r\n\r\n    <!-- Soft Ambient & Directional Shadow -->\r\n    <filter id=\"adaptive-shadow\" x=\"-10%\" y=\"-10%\" width=\"130%\" height=\"130%\" filterUnits=\"userSpaceOnUse\">\r\n      <feDropShadow dx=\"-2\" dy=\"8\" stdDeviation=\"8\" flood-color=\"#000000\" flood-opacity=\"var(--shadow-opacity)\" />\r\n      <feDropShadow dx=\"0\" dy=\"2\" stdDeviation=\"3\" flood-color=\"#000000\" flood-opacity=\"0.1\" />\r\n    </filter>\r\n  </defs>\r\n\r\n  <g class=\"resize-shadow\">\r\n    <!-- Left arrow + tall center window-edge bar + right arrow, fused as one path -->\r\n    <path\r\n      d=\"M20,128\r\n         L64,84\r\n         L64,112\r\n         L118,112\r\n         L118,20\r\n         L138,20\r\n         L138,112\r\n         L192,112\r\n         L192,84\r\n         L236,128\r\n         L192,172\r\n         L192,142\r\n         L138,142\r\n         L138,236\r\n         L118,236\r\n         L118,142\r\n         L64,142\r\n         L64,172\r\n         Z\"\r\n      class=\"resize-main\"\r\n    />\r\n  </g>\r\n</svg>"
  },
  {
    "id": "RoboResizeSplitNS",
    "filename": "RoboResizeSplitNS.svg",
    "title": "Split Window Resize (V)",
    "category": "resize",
    "stateId": 6,
    "stateName": "row-resize",
    "hotspot": {
      "x": 128,
      "y": 128
    },
    "hotspot32": {
      "x": 16,
      "y": 16
    },
    "animated": false,
    "frameCount": 1,
    "frameDurationMs": 0,
    "description": "Vertical arrows intersected by a wide divider bar for resizable terminal drawers and horizontal viewports.",
    "keywords": [
      "split",
      "row-resize",
      "multiwindow",
      "divider",
      "pane",
      "vertical"
    ],
    "svg": "<svg width=\"256\" height=\"256\" viewBox=\"0 0 256 256\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\r\n  <defs>\r\n    <style>\r\n      :root {\r\n        --resize-fill-start: #ffffff;\r\n        --resize-fill-end: #f1f5f9;\r\n        --resize-stroke: #0f172a;\r\n        --shadow-opacity: 0.18;\r\n      }\r\n\r\n      @media (prefers-color-scheme: dark) {\r\n        :root {\r\n          --resize-fill-start: #27272a;\r\n          --resize-fill-end: #18181b;\r\n          --resize-stroke: #ffffff;\r\n          --shadow-opacity: 0.50;\r\n        }\r\n      }\r\n\r\n      .resize-main {\r\n        fill: url(#multiwindow-vertical-resize-gradient);\r\n        stroke: var(--resize-stroke);\r\n        stroke-width: 8;\r\n        stroke-linecap: round;\r\n        stroke-linejoin: round;\r\n        transition: stroke 0.3s ease;\r\n      }\r\n\r\n      .resize-shadow {\r\n        filter: url(#adaptive-shadow);\r\n      }\r\n    </style>\r\n\r\n    <!-- Dynamic Theme Gradient Fill -->\r\n    <linearGradient id=\"multiwindow-vertical-resize-gradient\" x1=\"128\" y1=\"20\" x2=\"128\" y2=\"236\" gradientUnits=\"userSpaceOnUse\">\r\n      <stop offset=\"0%\" stop-color=\"var(--resize-fill-start)\" />\r\n      <stop offset=\"100%\" stop-color=\"var(--resize-fill-end)\" />\r\n    </linearGradient>\r\n\r\n    <!-- Soft Ambient & Directional Shadow -->\r\n    <filter id=\"adaptive-shadow\" x=\"-10%\" y=\"-10%\" width=\"130%\" height=\"130%\" filterUnits=\"userSpaceOnUse\">\r\n      <feDropShadow dx=\"-2\" dy=\"8\" stdDeviation=\"8\" flood-color=\"#000000\" flood-opacity=\"var(--shadow-opacity)\" />\r\n      <feDropShadow dx=\"0\" dy=\"2\" stdDeviation=\"3\" flood-color=\"#000000\" flood-opacity=\"0.1\" />\r\n    </filter>\r\n  </defs>\r\n\r\n  <g class=\"resize-shadow\">\r\n    <!-- Up arrow + wide center window-edge bar + down arrow, fused as one path -->\r\n    <path\r\n      d=\"M128,20\r\n         L172,64\r\n         L144,64\r\n         L144,118\r\n         L236,118\r\n         L236,138\r\n         L144,138\r\n         L144,192\r\n         L172,192\r\n         L128,236\r\n         L84,192\r\n         L112,192\r\n         L112,138\r\n         L20,138\r\n         L20,118\r\n         L112,118\r\n         L112,64\r\n         L84,64\r\n         Z\"\r\n      class=\"resize-main\"\r\n    />\r\n  </g>\r\n</svg>"
  },
  {
    "id": "RoboTextHorizontal",
    "filename": "RoboTextHorizontal.svg",
    "title": "Vertical Text Select",
    "category": "editing",
    "stateId": 2,
    "stateName": "vertical-text",
    "hotspot": {
      "x": 128,
      "y": 128
    },
    "hotspot32": {
      "x": 16,
      "y": 16
    },
    "animated": false,
    "frameCount": 1,
    "frameDurationMs": 0,
    "description": "Rotated horizontal I-beam cursor for vertical script layouts (CJK) and column block selections.",
    "keywords": [
      "vertical-text",
      "cjk",
      "column",
      "type",
      "select",
      "ibeam"
    ],
    "svg": "<svg width=\"257\" height=\"256\" viewBox=\"0 0 257 256\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n  <defs>\n    <style>\n      :root {\n        --text-fill-start: #ffffff;\n        --text-fill-end: #f1f5f9;\n        --text-stroke: #0f172a;\n        --shadow-opacity: 0.18;\n      }\n\n      @media (prefers-color-scheme: dark) {\n        :root {\n          --text-fill-start: #27272a;\n          --text-fill-end: #18181b;\n          --text-stroke: #ffffff;\n          --shadow-opacity: 0.50;\n        }\n      }\n\n      .text-body {\n        fill: url(#h-text-fill);\n      }\n\n      .text-stroke {\n        stroke: var(--text-stroke);\n        stroke-width: 10;\n        stroke-linejoin: round;\n        transition: stroke 0.3s ease;\n      }\n\n      .text-shadow {\n        filter: url(#text-h-shadow);\n      }\n    </style>\n\n    <linearGradient id=\"h-text-fill\" x1=\"24\" y1=\"80\" x2=\"233\" y2=\"176\" gradientUnits=\"userSpaceOnUse\">\n      <stop offset=\"0%\" stop-color=\"var(--text-fill-start)\" />\n      <stop offset=\"100%\" stop-color=\"var(--text-fill-end)\" />\n    </linearGradient>\n\n    <filter id=\"text-h-shadow\" x=\"-10%\" y=\"-10%\" width=\"130%\" height=\"130%\" filterUnits=\"userSpaceOnUse\">\n      <feDropShadow dx=\"-2\" dy=\"8\" stdDeviation=\"8\" flood-color=\"#000000\" flood-opacity=\"var(--shadow-opacity)\" />\n      <feDropShadow dx=\"0\" dy=\"2\" stdDeviation=\"3\" flood-color=\"#000000\" flood-opacity=\"0.1\" />\n    </filter>\n  </defs>\n\n  <g class=\"text-shadow\">\n    <path \n      d=\"M29.0897 169.639C28.579 161.389 30.2559 153.153 33.9609 145.69C37.2764 139.012 42.1185 133.149 48.1107 128.52C42.1185 123.891 37.2764 118.028 33.9609 111.35C30.2559 103.887 28.579 95.6509 29.0897 87.4013L29.2012 85.6H45.5611L45.326 87.7305C44.5593 94.6802 46.2659 101.681 50.1864 107.612C54.0526 113.461 59.856 117.942 66.7008 120.338H127.51V108.522H143.762V120.338H191.27C198.08 117.906 203.844 113.414 207.685 107.572C211.581 101.645 213.28 94.6622 212.527 87.7275L212.295 85.6H228.661L228.764 87.4114C229.23 95.6385 227.548 103.844 223.872 111.293C220.577 117.97 215.775 123.85 209.828 128.52C215.775 133.19 220.577 139.07 223.872 145.747C227.548 153.196 229.23 161.401 228.764 169.629L228.661 171.44H212.251L212.531 169.274C214.381 154.969 205.674 141.118 191.271 135.993H143.886V147.809H127.634V135.993H66.575C52.1754 141.005 43.3564 154.965 45.3198 169.259L45.6194 171.44H29.2012L29.0897 169.639Z\" \n      class=\"text-body\"\n    />\n    <path \n      d=\"M40.4682 128.52C35.9735 132.846 32.2494 137.894 29.4825 143.467C25.3917 151.707 23.5339 160.815 24.0992 169.948L24.2108 171.749C24.374 174.385 26.5597 176.44 29.2012 176.44H45.6194C47.0641 176.44 48.4383 175.815 49.3878 174.726C50.3374 173.637 50.7695 172.191 50.5729 170.76L50.2732 168.578C48.6879 157.037 55.6253 145.487 67.4549 140.993H122.634V147.809C122.634 150.57 124.873 152.809 127.634 152.809H143.886C146.647 152.809 148.886 150.57 148.886 147.809V140.993H190.374C202.214 145.584 209.07 157.049 207.573 168.633L212.251 169.238L207.572 168.633L207.292 170.799C207.108 172.225 207.547 173.661 208.496 174.741C209.445 175.821 210.813 176.44 212.251 176.44H228.661C231.313 176.44 233.503 174.37 233.653 171.723L233.756 169.911C234.271 160.814 232.41 151.75 228.356 143.535C225.599 137.947 221.89 132.878 217.412 128.52C221.89 124.162 225.599 119.093 228.356 113.505C232.41 105.29 234.271 96.2256 233.756 87.1285L233.653 85.3171C233.503 82.6698 231.313 80.6 228.661 80.6H212.295C210.875 80.6 209.522 81.2039 208.574 82.2609C207.625 83.318 207.171 84.7285 207.325 86.1403L207.556 88.2678C208.182 94.0306 206.775 99.8543 203.507 104.825C200.427 109.51 195.843 113.204 190.369 115.338H148.762V108.522C148.762 105.761 146.523 103.522 143.762 103.522H127.51C124.749 103.522 122.51 105.761 122.51 108.522V115.338H67.5854C62.0774 113.234 57.459 109.547 54.3575 104.855C51.0715 99.8838 49.6592 94.0497 50.2959 88.2789L50.531 86.1483C50.6869 84.7353 50.2339 83.3228 49.2855 82.2639C48.337 81.2051 46.9827 80.6 45.5611 80.6H29.2012C26.5597 80.6 24.374 82.6546 24.2108 85.291L24.0992 87.0924C23.5339 96.2248 25.3917 105.333 29.4825 113.573C32.2494 119.146 35.9735 124.193 40.4682 128.52Z\" \n      class=\"text-stroke\"\n      fill=\"none\"\n    />\n  </g>\n</svg>"
  },
  {
    "id": "RoboTextVertical",
    "filename": "RoboTextVertical.svg",
    "title": "Text Select (I-Beam)",
    "category": "editing",
    "stateId": 2,
    "stateName": "text",
    "hotspot": {
      "x": 128,
      "y": 128
    },
    "hotspot32": {
      "x": 16,
      "y": 16
    },
    "animated": false,
    "frameCount": 1,
    "frameDurationMs": 0,
    "description": "Precision vertical I-beam cursor for selecting horizontal text in paragraphs, inputs, and code editors.",
    "keywords": [
      "text",
      "ibeam",
      "select",
      "input",
      "type",
      "cursor",
      "editor"
    ],
    "svg": "<svg width=\"257\" height=\"256\" viewBox=\"0 0 257 256\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n  <defs>\n    <style>\n      :root {\n        --text-fill-start: #ffffff;\n        --text-fill-end: #f1f5f9;\n        --text-stroke: #0f172a;\n        --shadow-opacity: 0.18;\n      }\n\n      @media (prefers-color-scheme: dark) {\n        :root {\n          --text-fill-start: #27272a;\n          --text-fill-end: #18181b;\n          --text-stroke: #ffffff;\n          --shadow-opacity: 0.50;\n        }\n      }\n\n      .text-body {\n        fill: url(#v-text-fill);\n      }\n\n      .text-stroke {\n        stroke: var(--text-stroke);\n        stroke-width: 10;\n        stroke-linejoin: round;\n        transition: stroke 0.3s ease;\n      }\n\n      .text-shadow {\n        filter: url(#text-v-shadow);\n      }\n    </style>\n\n    <linearGradient id=\"v-text-fill\" x1=\"81\" y1=\"23\" x2=\"177\" y2=\"233\" gradientUnits=\"userSpaceOnUse\">\n      <stop offset=\"0%\" stop-color=\"var(--text-fill-start)\" />\n      <stop offset=\"100%\" stop-color=\"var(--text-fill-end)\" />\n    </linearGradient>\n\n    <filter id=\"text-v-shadow\" x=\"-10%\" y=\"-10%\" width=\"130%\" height=\"130%\" filterUnits=\"userSpaceOnUse\">\n      <feDropShadow dx=\"-2\" dy=\"8\" stdDeviation=\"8\" flood-color=\"#000000\" flood-opacity=\"var(--shadow-opacity)\" />\n      <feDropShadow dx=\"0\" dy=\"2\" stdDeviation=\"3\" flood-color=\"#000000\" flood-opacity=\"0.1\" />\n    </filter>\n  </defs>\n\n  <g class=\"text-shadow\">\n    <path \n      d=\"M88.2013 28.5296C96.4509 28.0189 104.687 29.6958 112.15 33.4009C118.828 36.7164 124.691 41.5584 129.32 47.5506C133.949 41.5584 139.812 36.7164 146.49 33.4009C153.953 29.6958 162.189 28.0189 170.439 28.5296L172.24 28.6411V45.0011L170.109 44.766C163.16 43.9992 156.159 45.7059 150.228 49.6263C144.379 53.4926 139.898 59.296 137.502 66.1408V126.95H149.318V143.202H137.502V190.71C139.934 197.52 144.426 203.284 150.268 207.125C156.195 211.021 163.178 212.72 170.112 211.967L172.24 211.735V228.101L170.429 228.204C162.201 228.67 153.996 226.988 146.547 223.312C139.87 220.017 133.99 215.214 129.32 209.268C124.65 215.214 118.77 220.017 112.093 223.312C104.644 226.988 96.4384 228.67 88.2113 228.204L86.3999 228.101V211.691L88.5661 211.971C102.871 213.821 116.722 205.114 121.847 190.711V143.326H110.031V127.074H121.847V66.0149C116.835 51.6153 102.874 42.7963 88.5812 44.7597L86.3999 45.0593V28.6411L88.2013 28.5296Z\" \n      class=\"text-body\"\n    />\n    <path \n      d=\"M129.32 39.9081C124.993 35.4135 119.946 31.6894 114.373 28.9224C106.133 24.8316 97.0247 22.9738 87.8923 23.5392L86.0909 23.6507C83.4545 23.8139 81.3999 25.9997 81.3999 28.6411V45.0593C81.3999 46.5041 82.0248 47.8782 83.1137 48.8278C84.2026 49.7773 85.649 50.2094 87.0803 50.0128L89.2616 49.7132C100.803 48.1278 112.353 55.0652 116.847 66.8948V122.074H110.031C107.27 122.074 105.031 124.313 105.031 127.074V143.326C105.031 146.087 107.27 148.326 110.031 148.326H116.847V189.814C112.256 201.653 100.791 208.51 89.2072 207.012L88.6023 211.691L89.2071 207.012L87.041 206.732C85.615 206.548 84.1787 206.986 83.0988 207.936C82.0189 208.885 81.3999 210.253 81.3999 211.691V228.101C81.3999 230.753 83.4698 232.943 86.1171 233.093L87.9284 233.196C97.0255 233.711 106.09 231.85 114.305 227.796C119.893 225.039 124.962 221.33 129.32 216.852C133.678 221.33 138.747 225.039 144.335 227.796C152.55 231.85 161.614 233.711 170.711 233.196L172.523 233.093C175.17 232.943 177.24 230.753 177.24 228.101V211.735C177.24 210.315 176.636 208.962 175.579 208.014C174.522 207.065 173.111 206.611 171.7 206.765L169.572 206.996C163.809 207.622 157.986 206.215 153.015 202.947C148.33 199.867 144.636 195.283 142.502 189.809V148.202H149.318C152.079 148.202 154.318 145.963 154.318 143.202V126.95C154.318 124.189 152.079 121.95 149.318 121.95H142.502V67.0253C144.606 61.5173 148.293 56.8989 152.985 53.7975C157.956 50.5114 163.79 49.0991 169.561 49.7358L171.692 49.9709C173.105 50.1268 174.517 49.6739 175.576 48.7254C176.635 47.7769 177.24 46.4226 177.24 45.0011V28.6411C177.24 25.9997 175.185 23.8139 172.549 23.6507L170.747 23.5392C161.615 22.9738 152.507 24.8316 144.267 28.9224C138.694 31.6894 133.646 35.4135 129.32 39.9081Z\" \n      class=\"text-stroke\"\n      fill=\"none\"\n    />\n  </g>\n</svg>"
  },
  {
    "id": "RoboWait",
    "filename": "RoboWait.svg",
    "title": "Wait Spinner",
    "category": "status",
    "stateId": 9,
    "stateName": "wait",
    "hotspot": {
      "x": 128,
      "y": 128
    },
    "hotspot32": {
      "x": 16,
      "y": 16
    },
    "animated": true,
    "frameCount": 12,
    "frameDurationMs": 83,
    "description": "Standalone spinning loader indicating blocking system operations and modal load gates.",
    "keywords": [
      "wait",
      "spinner",
      "loader",
      "busy",
      "progress",
      "loading"
    ],
    "svg": "<svg width=\"256\" height=\"256\" viewBox=\"0 0 256 256\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n  <defs>\n    <style>\n      :root {\n        --track-color: #8e8e93;\n        --track-opacity: 0.35;\n        --tick-color: #3b9eff;\n        --shadow-opacity: 0.18;\n      }\n\n      @media (prefers-color-scheme: dark) {\n        :root {\n          --track-color: #48484a;\n          --track-opacity: 1;\n          --tick-color: #3b9eff;\n          --shadow-opacity: 0.50;\n        }\n      }\n\n      .spinner-shadow {\n        filter: url(#adaptive-shadow);\n      }\n\n      .track {\n        fill: none;\n        stroke: var(--track-color);\n        stroke-opacity: var(--track-opacity);\n        stroke-width: 18;\n      }\n\n      .tick {\n        fill: none;\n        stroke: var(--tick-color);\n        stroke-width: 18;\n        stroke-linecap: round;\n        /* circumference = 2 * PI * 112 ≈ 703.7, arc = 28% of that ≈ 197 */\n        stroke-dasharray: 197 703.7;\n        transform-box: view-box;\n        transform-origin: 128px 128px;\n        animation: spin 0.85s linear infinite;\n      }\n\n      @keyframes spin {\n        from { transform: rotate(0deg); }\n        to   { transform: rotate(360deg); }\n      }\n    </style>\n\n    <filter id=\"adaptive-shadow\" x=\"-20%\" y=\"-20%\" width=\"140%\" height=\"140%\" filterUnits=\"userSpaceOnUse\">\n      <feDropShadow dx=\"-1\" dy=\"4\" stdDeviation=\"5\" flood-color=\"#000000\" flood-opacity=\"var(--shadow-opacity)\" />\n      <feDropShadow dx=\"0\" dy=\"1\" stdDeviation=\"2\" flood-color=\"#000000\" flood-opacity=\"0.1\" />\n    </filter>\n  </defs>\n\n  <g class=\"spinner-shadow\">\n    <circle cx=\"128\" cy=\"128\" r=\"112\" class=\"track\" />\n    <circle cx=\"128\" cy=\"128\" r=\"112\" class=\"tick\" />\n  </g>\n</svg>"
  },
  {
    "id": "RoboWorking",
    "filename": "RoboWorking.svg",
    "title": "Working in Background",
    "category": "status",
    "stateId": 9,
    "stateName": "progress",
    "hotspot": {
      "x": 52,
      "y": 38
    },
    "hotspot32": {
      "x": 7,
      "y": 5
    },
    "animated": true,
    "frameCount": 12,
    "frameDurationMs": 83,
    "description": "Compound pointer arrow paired with corner activity spinner indicating non-blocking background tasks.",
    "keywords": [
      "working",
      "progress",
      "busy",
      "arrow",
      "spinner",
      "background",
      "loading"
    ],
    "svg": "<svg width=\"256\" height=\"256\" viewBox=\"0 0 256 256\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n  <defs>\n    <style>\n      :root {\n        --arrow-fill-start: #ffffff;\n        --arrow-fill-end: #f1f5f9;\n        --arrow-stroke: #0f172a;\n        --track-color: #8e8e93;\n        --track-opacity: 0.35;\n        --tick-color: #3b9eff;\n        --shadow-opacity: 0.18;\n      }\n\n      @media (prefers-color-scheme: dark) {\n        :root {\n          --arrow-fill-start: #27272a;\n          --arrow-fill-end: #18181b;\n          --arrow-stroke: #ffffff;\n          --track-color: #48484a;\n          --track-opacity: 1;\n          --tick-color: #3b9eff;\n          --shadow-opacity: 0.50;\n        }\n      }\n\n      .arrow-main {\n        fill: url(#working-arrow-gradient);\n        stroke: var(--arrow-stroke);\n        stroke-width: 8;\n        stroke-linecap: round;\n        stroke-linejoin: round;\n        transition: stroke 0.3s ease;\n      }\n\n      .arrow-shadow { filter: url(#working-arrow-shadow); }\n      .spinner-shadow { filter: url(#working-spinner-shadow); }\n\n      .track {\n        fill: none;\n        stroke: var(--track-color);\n        stroke-opacity: var(--track-opacity);\n        stroke-width: 14;\n      }\n\n      .tick {\n        fill: none;\n        stroke: var(--tick-color);\n        stroke-width: 14;\n        stroke-linecap: round;\n        /* circumference = 2 * PI * 40 ≈ 251.3, arc = 28% ≈ 70.4 */\n        stroke-dasharray: 70.4 251.3;\n        transform-box: view-box;\n        transform-origin: 192px 192px;\n        animation: spin 0.85s linear infinite;\n      }\n\n      @keyframes spin {\n        from { transform: rotate(0deg); }\n        to   { transform: rotate(360deg); }\n      }\n    </style>\n\n    <!-- Arrow gradient -->\n    <linearGradient id=\"working-arrow-gradient\" x1=\"70\" y1=\"50\" x2=\"180\" y2=\"220\" gradientUnits=\"userSpaceOnUse\">\n      <stop offset=\"0%\" stop-color=\"var(--arrow-fill-start)\" />\n      <stop offset=\"100%\" stop-color=\"var(--arrow-fill-end)\" />\n    </linearGradient>\n\n    <!-- Arrow shadow -->\n    <filter id=\"working-arrow-shadow\" x=\"-10%\" y=\"-10%\" width=\"130%\" height=\"130%\" filterUnits=\"userSpaceOnUse\">\n      <feDropShadow dx=\"-2\" dy=\"6\" stdDeviation=\"6\" flood-color=\"#000000\" flood-opacity=\"var(--shadow-opacity)\" />\n      <feDropShadow dx=\"0\" dy=\"2\" stdDeviation=\"2\" flood-color=\"#000000\" flood-opacity=\"0.1\" />\n    </filter>\n\n    <!-- Spinner shadow -->\n    <filter id=\"working-spinner-shadow\" x=\"-30%\" y=\"-30%\" width=\"160%\" height=\"160%\" filterUnits=\"userSpaceOnUse\">\n      <feDropShadow dx=\"-1\" dy=\"3\" stdDeviation=\"4\" flood-color=\"#000000\" flood-opacity=\"var(--shadow-opacity)\" />\n      <feDropShadow dx=\"0\" dy=\"1\" stdDeviation=\"2\" flood-color=\"#000000\" flood-opacity=\"0.1\" />\n    </filter>\n  </defs>\n\n  <!-- Arrow: scaled to occupy roughly x:52-135, y:37-165 -->\n  <g class=\"arrow-shadow\" transform=\"scale(0.75)\">\n    <path\n      d=\"M70 50\n         L70 204\n         L108.5 171\n         L130.5 220.5\n         L152.5 209.5\n         L125 160\n         L180 160\n         Z\"\n      class=\"arrow-main\"\n    />\n  </g>\n\n  <!-- Spinner: bottom-right, centered (192,192) r=40, clear of arrow bbox -->\n  <g class=\"spinner-shadow\">\n    <circle cx=\"192\" cy=\"192\" r=\"40\" class=\"track\" />\n    <circle cx=\"192\" cy=\"192\" r=\"40\" class=\"tick\" />\n  </g>\n</svg>"
  }
]

export const ROBO_CURSOR_SPEC_MARKDOWN = "A custom format is a great way to solve the exact problems we ran into — multi-resolution, hotspot precision, theme variants, and animation (for the Wait spinner), all bundled together instead of scattered PNG files. Here's a full spec.\r\n\r\n## RoboCursor (`.rcur`) — Format Specification\r\n\r\n### Overview\r\nA single-file, binary container format holding every cursor state, every resolution, both theme variants, and animation frame data for a complete cursor set — designed so a runtime (web, Roboticela OS, or any custom app) loads one file and gets everything needed to render pixel-perfect cursors at any density.\r\n\r\n### File Structure\r\n\r\n```\r\n┌─────────────────────────────────────┐\r\n│ MAGIC HEADER (8 bytes)               │  \"RCUR\" + version bytes\r\n├─────────────────────────────────────┤\r\n│ FILE METADATA BLOCK                  │  author, brand color, name, date\r\n├─────────────────────────────────────┤\r\n│ CURSOR TABLE (index)                 │  offsets to each cursor's data\r\n├─────────────────────────────────────┤\r\n│ CURSOR ENTRY 1 (default/arrow)       │\r\n│  ├─ Theme: Light                     │\r\n│  │   ├─ Hotspot                      │\r\n│  │   ├─ Frame @32px (PNG blob)       │\r\n│  │   ├─ Frame @48px (PNG blob)       │\r\n│  │   └─ Frame @64px (PNG blob)       │\r\n│  └─ Theme: Dark                      │\r\n│      └─ (same structure)             │\r\n├─────────────────────────────────────┤\r\n│ CURSOR ENTRY 2 (pointer/hand)        │\r\n│  └─ ...                              │\r\n├─────────────────────────────────────┤\r\n│ CURSOR ENTRY N (wait/spinner)        │\r\n│  ├─ Animation: 12 frames             │\r\n│  ├─ Frame duration: 83ms             │\r\n│  └─ Loop: true                       │\r\n└─────────────────────────────────────┘\r\n```\r\n\r\n### Header (8 bytes)\r\n\r\n| Bytes | Field | Value |\r\n|---|---|---|\r\n| 0–3 | Magic | `\"RCUR\"` (ASCII) |\r\n| 4 | Major version | `uint8` — e.g. `1` |\r\n| 5 | Minor version | `uint8` — e.g. `0` |\r\n| 6 | Flags | bitfield: bit 0 = has animations, bit 1 = has dark variants, bit 2 = compressed |\r\n| 7 | Reserved | `0x00` |\r\n\r\n### File Metadata Block\r\n\r\n```json\r\n{\r\n  \"name\": \"Roboticela Cursor Pack\",\r\n  \"author\": \"Roboticela\",\r\n  \"brandAccent\": \"#3B9EFF\",\r\n  \"created\": \"2026-09-22\",\r\n  \"cursorCount\": 12,\r\n  \"hasThemes\": true,\r\n  \"hasAnimations\": true\r\n}\r\n```\r\nStored as a length-prefixed UTF-8 JSON string immediately after the header (`uint32` byte-length, then the JSON bytes).\r\n\r\n### Cursor Table (Index)\r\n\r\nA lookup table so a loader can seek directly to any single cursor without parsing the whole file — critical for lazy-loading only the states actually needed (e.g. an app only needs `default` + `pointer` + `text`, not all 12):\r\n\r\n```\r\nuint16  cursorCount\r\nrepeated cursorCount times:\r\n  uint8   stateID          // enum, see State ID Table below\r\n  uint8   nameLength\r\n  utf8    stateName[nameLength]   // e.g. \"pointer\"\r\n  uint32  byteOffset        // absolute offset into file where this entry starts\r\n  uint32  byteLength        // size of this entry's full data block\r\n```\r\n\r\n### State ID Table (fixed enum — extensible via values ≥64)\r\n\r\n| ID | State | ID | State |\r\n|---|---|---|---|\r\n| 0 | default | 7 | resize-diag-1 |\r\n| 1 | pointer | 8 | resize-diag-2 |\r\n| 2 | text | 9 | wait |\r\n| 3 | grab | 10 | crosshair |\r\n| 4 | grabbing | 11 | zoom-in |\r\n| 5 | disabled | 12 | zoom-out |\r\n| 6 | resize-h/v | 13 | help |\r\n\r\nIDs 64–255 reserved for custom/app-specific states (e.g. a game or design tool could register `64: paintbrush`).\r\n\r\n### Cursor Entry Structure\r\n\r\n```\r\nuint8   themeCount          // 1 (theme-agnostic) or 2 (light+dark)\r\nrepeated themeCount times:\r\n  uint8   themeID            // 0 = light, 1 = dark, 2 = theme-agnostic\r\n  int16   hotspotX\r\n  int16   hotspotY\r\n  uint8   frameCount         // 1 for static, N for animated (e.g. wait spinner)\r\n  uint16  frameDurationMs    // only meaningful if frameCount > 1\r\n  uint8   loop               // 0 or 1, only meaningful if animated\r\n  repeated frameCount times:\r\n    uint8   resolutionCount    // typically 3 (32/48/64)\r\n    repeated resolutionCount times:\r\n      uint16  pixelSize          // 32, 48, or 64\r\n      uint32  pngByteLength\r\n      bytes   pngData[pngByteLength]   // standard PNG, transparent bg\r\n```\r\n\r\n### Why PNG-per-frame instead of embedding the SVG source\r\n\r\nRasterizing at author-time (the way we did with cairosvg + visual verification earlier) guarantees every consumer sees the exact anti-aliased result you approved — it removes the inconsistent-SVG-rasterization problem entirely. An **optional companion `.rcur-src` file** can hold the original editable SVGs for future edits, kept separate so the runtime file stays lean and fast to parse.\r\n\r\n### Compression\r\n\r\nIf flag bit 2 is set, the entire body (everything after the metadata block) is `gzip`-compressed as one stream — cursor packs compress well since PNG frames of the same icon family share a lot of structure.\r\n\r\n### MIME Type & Extension\r\n\r\n- File extension: `.rcur`\r\n- MIME type: `application/x-robocursor`\r\n- Web usage: loader fetches the `.rcur` file once, parses the table, extracts the needed PNG blob per state/theme/size, and sets it via `cursor: url(blob:...) hotspotX hotspotY, fallback;` — for animated states (Wait), a small JS interval swaps the blob URL per frame at `frameDurationMs`.\r\n\r\n### Reference Loader (pseudocode)\r\n\r\n```js\r\nclass RoboCursorLoader {\r\n  async load(url) {\r\n    const buf = await (await fetch(url)).arrayBuffer();\r\n    const view = new DataView(buf);\r\n    // verify magic \"RCUR\"\r\n    const magic = String.fromCharCode(...new Uint8Array(buf, 0, 4));\r\n    if (magic !== 'RCUR') throw new Error('Not a valid .rcur file');\r\n    this.version = [view.getUint8(4), view.getUint8(5)];\r\n    this.flags = view.getUint8(6);\r\n    // ...parse metadata block, then cursor table, build an index map\r\n    this.index = this._parseTable(buf);\r\n  }\r\n\r\n  getCursor(state, theme = 'dark', size = 32) {\r\n    const entry = this.index[state]?.[theme];\r\n    if (!entry) return null;\r\n    const frame = entry.frames[0]; // first frame if static\r\n    const png = frame.resolutions[size];\r\n    const blobUrl = URL.createObjectURL(new Blob([png], { type: 'image/png' }));\r\n    return `url(${blobUrl}) ${entry.hotspot.x} ${entry.hotspot.y}, auto`;\r\n  }\r\n}\r\n```\r\n\r\n### Extensibility (v1.x → v2.0 path)\r\n\r\n- New state IDs ≥64 can be added without breaking older parsers (unknown IDs are simply skipped by loaders that don't recognize them).\r\n- A future `variableFrameTiming` flag could allow per-frame duration arrays instead of one fixed `frameDurationMs`, for easing-based spinner animation rather than constant-speed rotation.\r\n- Vector-native rendering (embedding real SVG paths alongside PNG fallbacks) could be added as `themeID 3: vector` for platforms with reliable SVG cursor support, without breaking the raster-based v1 readers.\r\n\r\n---\r\n\r\nWant me to actually build this — write a real Python packer that takes the SVG masters we already made (arrow, hand, grab, disabled, etc.), rasterizes them at all three sizes, and outputs a working `roboticela.rcur` file plus the JS loader as real code?"

/**
 * Convert an SVG string or cursor item/ID to a browser-safe Data URI for CSS cursor: url(...) usage.
 * This eliminates the need for any static files in public/.
 */
export function getCursorDataUri(
  itemOrIdOrSvg: RoboCursorItem | string,
  theme?: 'light' | 'dark',
): string {
  let raw = ''
  if (typeof itemOrIdOrSvg === 'string' && itemOrIdOrSvg.trim().startsWith('<svg')) {
    raw = itemOrIdOrSvg
  } else {
    const item =
      typeof itemOrIdOrSvg === 'string'
        ? ROBOCURSORS_LIST.find((c) => c.id === itemOrIdOrSvg || c.filename === itemOrIdOrSvg)
        : itemOrIdOrSvg
    if (!item) return ''
    raw = item.svg
  }

  const activeTheme =
    theme ??
    (typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'dark'
      ? 'dark'
      : 'light')

  let themedSvg = raw

  // Strip @media (prefers-color-scheme: dark) block so OS preference never overrides activeTheme
  themedSvg = themedSvg.replace(/@media\s*\(prefers-color-scheme:\s*dark\)\s*\{[\s\S]*?\}\s*\}/g, '')

  const isDark = activeTheme === 'dark'

  const vars: Record<string, string> = isDark
    ? {
        '--arrow-fill-start': '#27272a',
        '--arrow-fill-end': '#18181b',
        '--arrow-stroke': '#ffffff',
        '--resize-fill-start': '#27272a',
        '--resize-fill-end': '#18181b',
        '--resize-stroke': '#ffffff',
        '--hand-fill-start': '#27272a',
        '--hand-fill-end': '#18181b',
        '--hand-stroke': '#ffffff',
        '--accent-lines': '#f4f4f5',
        '--text-fill-start': '#27272a',
        '--text-fill-end': '#18181b',
        '--text-stroke': '#ffffff',
        '--pencil-fill-start': '#27272a',
        '--pencil-fill-end': '#18181b',
        '--pencil-stroke': '#ffffff',
        '--track-color': '#48484a',
        '--track-opacity': '1',
        '--tick-color': '#3b9eff',
        '--unavailable-ring': '#f87171',
        '--shadow-opacity': '0.50',
      }
    : {
        '--arrow-fill-start': '#ffffff',
        '--arrow-fill-end': '#f1f5f9',
        '--arrow-stroke': '#0f172a',
        '--resize-fill-start': '#ffffff',
        '--resize-fill-end': '#f1f5f9',
        '--resize-stroke': '#0f172a',
        '--hand-fill-start': '#ffffff',
        '--hand-fill-end': '#f1f5f9',
        '--hand-stroke': '#0f172a',
        '--accent-lines': '#0f172a',
        '--text-fill-start': '#ffffff',
        '--text-fill-end': '#f1f5f9',
        '--text-stroke': '#0f172a',
        '--pencil-fill-start': '#ffffff',
        '--pencil-fill-end': '#f1f5f9',
        '--pencil-stroke': '#0f172a',
        '--track-color': '#8e8e93',
        '--track-opacity': '0.35',
        '--tick-color': '#3b9eff',
        '--unavailable-ring': '#dc2626',
        '--shadow-opacity': '0.18',
      }

  // Update :root block with concrete theme values
  for (const [k, v] of Object.entries(vars)) {
    const rx = new RegExp(`${k}:\\s*[^;]+;`, 'g')
    themedSvg = themedSvg.replace(rx, `${k}: ${v};`)
  }

  // Also bake direct var(...) values into CSS rules so browser cursor image engines that don't evaluate CSS variables render with 100% fidelity
  for (const [k, v] of Object.entries(vars)) {
    const varRx = new RegExp(`var\\(${k}\\)`, 'g')
    themedSvg = themedSvg.replace(varRx, v)
  }

  // Ensure width="32" height="32" for CSS cursor safety
  const safeSvg = themedSvg.replace(
    /<svg\s+([^>]*?)width="[^"]*"\s+height="[^"]*"/,
    '<svg $1width="32" height="32"',
  )

  const clean = safeSvg.replace(/[\n\r\t]+/g, ' ').replace(/\s{2,}/g, ' ')
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(clean)
}

/**
 * Returns a complete CSS cursor rule using an inline Data URI (zero external assets).
 */
export function getCursorCssValue(
  itemOrId: RoboCursorItem | string,
  fallback: string = 'auto',
  theme?: 'light' | 'dark',
): string {
  const item =
    typeof itemOrId === 'string'
      ? ROBOCURSORS_LIST.find((c) => c.id === itemOrId || c.filename === itemOrId)
      : itemOrId
  if (!item) return fallback
  const dataUri = getCursorDataUri(item, theme)
  return `url("${dataUri}") ${item.hotspot32.x} ${item.hotspot32.y}, ${fallback}`
}

export function getCssCursorRule(item: RoboCursorItem, size: number = 32): string {
  const scale = size / 256
  const hx = Math.round(item.hotspot.x * scale)
  const hy = Math.round(item.hotspot.y * scale)
  const fallback =
    item.category === 'resize'
      ? 'pointer'
      : item.stateName === 'text'
        ? 'text'
        : item.stateName === 'wait'
          ? 'wait'
          : 'auto'
  const dataUri = getCursorDataUri(item)
  return `cursor: url("${dataUri}") ${hx} ${hy}, ${fallback};`
}

/**
 * Generates React JSX component snippet using zero-asset inline SVG.
 */
export function getReactSnippet(item: RoboCursorItem): string {
  return `// React component usage (no public assets required)
export function ${item.id}Cursor({ size = 32 }: { size?: number }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="inline-block pointer-events-none select-none [&>svg]:w-full [&>svg]:h-full"
      dangerouslySetInnerHTML={{
        __html: \`${item.svg.replace(/`/g, '\\`')}\`
      }}
    />
  )
}`
}

/**
 * Generates RoboCursor (.rcur) binary loader TypeScript code.
 */
export function getRcurLoaderSnippet(item?: RoboCursorItem): string {
  const targetState = item ? item.stateName : 'default'
  return `// Import the RoboCursor runtime loader
import { RoboCursorLoader } from '@/lib/robocursor-loader'

// Initialize the loader from bundled memory or encrypted stream
const cursorEngine = new RoboCursorLoader()
await cursorEngine.loadFromBuffer(binaryArrayBuffer)

// Extract the cursor at runtime density and current theme
const cssCursor = cursorEngine.getCursor('${targetState}', 'dark', 32)
// Sets: url(blob:...) ${item?.hotspot32?.x ?? 9} ${item?.hotspot32?.y ?? 6}, auto
document.body.style.cursor = cssCursor`
}

