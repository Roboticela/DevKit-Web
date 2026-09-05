'use client'

import type { ComponentType } from 'react'
import { ContactSection } from './ContactSection'
import { FooterSection } from './FooterSection'
import { IdeaSection } from './IdeaSection'
import { NavbarSection } from './NavbarSection'
import { ProductMarqueeSection } from './ProductMarqueeSection'
import { ReelsSection } from './ReelsSection'
import { RoadmapSection } from './RoadmapSection'
import { RoboticelaHeroSection } from './RoboticelaHeroSection'
import { ServicesSection } from './ServicesSection'
import { TrustSection } from './TrustSection'

export const LANDING_SECTIONS: Record<string, ComponentType> = {
  'navbar-section': NavbarSection,
  'roboticela-hero-section': RoboticelaHeroSection,
  'idea-section': IdeaSection,
  'product-marquee-section': ProductMarqueeSection,
  'services-section': ServicesSection,
  'reels-section': ReelsSection,
  'trust-section': TrustSection,
  'roadmap-section': RoadmapSection,
  'contact-section': ContactSection,
  'footer-section': FooterSection,
}
