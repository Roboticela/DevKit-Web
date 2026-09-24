# RoboCursor (`.rcur`) — Format Specification

### Overview
A single-file, binary container format holding every cursor state, every resolution, both theme variants, and animation frame data for a complete cursor set — designed so a runtime (web, Roboticela OS, or any custom app) loads one file and gets everything needed to render pixel-perfect cursors at any density.

### File Structure

```
┌─────────────────────────────────────┐
│ MAGIC HEADER (8 bytes)               │  "RCUR" + version bytes
├─────────────────────────────────────┤
│ FILE METADATA BLOCK                  │  author, brand color, name, date
├─────────────────────────────────────┤
│ CURSOR TABLE (index)                 │  offsets to each cursor's data
├─────────────────────────────────────┤
│ CURSOR ENTRY 1 (default/arrow)       │
│  ├─ Theme: Light                     │
│  │   ├─ Hotspot                      │
│  │   ├─ Frame @32px (PNG blob)       │
│  │   ├─ Frame @48px (PNG blob)       │
│  │   └─ Frame @64px (PNG blob)       │
│  └─ Theme: Dark                      │
│      └─ (same structure)             │
├─────────────────────────────────────┤
│ CURSOR ENTRY 2 (pointer/hand)        │
│  └─ ...                              │
├─────────────────────────────────────┤
│ CURSOR ENTRY N (wait/spinner)        │
│  ├─ Animation: 12 frames             │
│  ├─ Frame duration: 83ms             │
│  └─ Loop: true                       │
└─────────────────────────────────────┘
```

### Header (8 bytes)

| Bytes | Field | Value |
|---|---|---|
| 0–3 | Magic | `"RCUR"` (ASCII) |
| 4 | Major version | `uint8` — e.g. `1` |
| 5 | Minor version | `uint8` — e.g. `0` |
| 6 | Flags | bitfield: bit 0 = has animations, bit 1 = has dark variants, bit 2 = compressed |
| 7 | Reserved | `0x00` |

### File Metadata Block

```json
{
  "name": "Roboticela Cursor Pack",
  "author": "Roboticela",
  "brandAccent": "#3B9EFF",
  "created": "2026-09-22",
  "cursorCount": 18,
  "hasThemes": true,
  "hasAnimations": true
}
```
Stored as a length-prefixed UTF-8 JSON string immediately after the header (`uint32` byte-length, then the JSON bytes).

### Cursor Table (Index)

A lookup table so a loader can seek directly to any single cursor without parsing the whole file:

```
uint16  cursorCount
repeated cursorCount times:
  uint8   stateID          // enum, see State ID Table below
  uint8   nameLength
  utf8    stateName[nameLength]   // e.g. "pointer"
  uint32  byteOffset        // absolute offset into file where this entry starts
  uint32  byteLength        // size of this entry's full data block
```

### State ID Table (fixed enum — extensible via values ≥64)

| ID | State | ID | State |
|---|---|---|---|
| 0 | default | 7 | resize-diag-1 |
| 1 | pointer | 8 | resize-diag-2 |
| 2 | text | 9 | wait |
| 3 | grab | 10 | crosshair |
| 4 | grabbing | 11 | zoom-in |
| 5 | disabled | 12 | zoom-out |
| 6 | resize-h/v | 13 | help |

IDs 64–255 reserved for custom/app-specific states (e.g. 64: pencil/draw).
