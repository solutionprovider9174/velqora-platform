import type { Metadata } from 'next'
import { LandingNav } from '@/components/landing/LandingNav'
import { HeroSection } from '@/components/landing/HeroSection'
import { StatsSection } from '@/components/landing/StatsSection'
import { ServicesSection } from '@/components/landing/ServicesSection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { GlobalSection } from '@/components/landing/GlobalSection'
import { TestimonialsSection } from '@/components/landing/TestimonialsSection'
import { PricingSection } from '@/components/landing/PricingSection'
import { ContactSection } from '@/components/landing/ContactSection'
import { LandingFooter } from '@/components/landing/LandingFooter'

export const metadata: Metadata = {
  title: 'Velqora — Move. Manage. Master.',
  description: 'Enterprise logistics & renewable energy ERP platform. Move. Manage. Master.',
}

export default function LandingPage() {
  return (
    <main className="bg-white">
      <LandingNav />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <FeaturesSection />
      <GlobalSection />
      <TestimonialsSection />
      <PricingSection />
      <ContactSection />
      <LandingFooter />
    </main>
  )
}
