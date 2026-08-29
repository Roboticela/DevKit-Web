// @ts-nocheck
/* eslint-disable */
import data from './data/rx.json'
import { createPack } from './create-glyph'
import { remapPack } from './names'
import type { CompactGlyph, IconType } from './types'

const icons = remapPack('rx', createPack(data as unknown as Record<string, CompactGlyph>) as Record<string, IconType>)
export default icons
