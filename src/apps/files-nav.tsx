'use client'

import { useMemo, useState } from 'react'
import { cn } from '@/lib/cn'
import { SegmentedControl, type SegmentedOption } from '@/components/SegmentedControl'
import { Slider } from '@/components/Slider'
import { Badge } from '@/components/Badge'
import {
  DkChevronCaretRight as ChevronRight,
  DkChevronCaretDown as ChevronDown,
  DkChevronCaretLeft as ChevronLeft,
  DkHomeHouse as Home,
  DkFolderDirectory as Folder,
  DkStarFavoriteRating as Star,
  DkCloseDismissCancel as X,
  DkChevronCaretDown as ChevronUp,
} from '@/icons'
import { formatSize, type SortField, type SortDirection } from './files-model'

export class NavigationHistory {
  private stack: string[] = []
  private index = 0

  constructor(public readonly initial: string) {
    this.stack = [initial]
  }

  push(path: string) {
    this.stack = this.stack.slice(0, this.index + 1)
    this.stack.push(path)
    this.index++
  }

  back() {
    if (this.canGoBack()) {
      this.index--
    }
    return this.stack[this.index]
  }

  forward() {
    if (this.canGoForward()) {
      this.index++
    }
    return this.stack[this.index]
  }

  canGoBack() {
    return this.index > 0
  }

  canGoForward() {
    return this.index < this.stack.length - 1
  }
}
