// @ts-nocheck
/* eslint-disable */
import data from './data/gr.json'
import { createPack } from './create-glyph'
import { remapPack } from './names'
import type { CompactGlyph, IconType } from './types'

const icons = remapPack('gr', createPack(data as unknown as Record<string, CompactGlyph>) as Record<string, IconType>)
export default icons
