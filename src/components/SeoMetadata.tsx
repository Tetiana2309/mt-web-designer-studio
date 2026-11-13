import { useEffect } from 'react'
import { useLocation } from 'react-router'

const origin = 'https://www.mt-web-designer-studio.com'

// Clear, distinct page summaries based on the actual studio and portfolio content.
const metadata: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'M&T Web Designer Studio | Web Design & Development',
    description: 'Custom website design and development for businesses and brands. From concept to launch, we build modern websites that help your business grow.',
  },
  '/about': {
    title: 'About Our Web Design Studio | M&T Web Designer Studio',
    description: 'Meet M&T Web Designer Studio and discover our approach to custom website design, clear communication and creative digital experiences.',
  },
  '/about-two': {
    title: 'Our Web Design Process & Approach | M&T Studio',
    description: 'Discover how M&T Web Designer Studio approaches custom websites: understanding business goals, shaping user experience and designing with purpose.',
  },
  '/portfolio': {
    title: 'Custom Web Design Portfolio | M&T Web Designer Studio',
    description: 'Explore M&T Web Designer Studio’s custom website design portfolio, including projects for brands, agencies, real estate and beauty businesses.',
  },
  '/portfolio/eco-natura': {
    title: 'Ecommerce Website Design — Eco Natura | M&T Studio',
    description: 'Eco Natura web design case study: a natural, product-focused online experience for an eco-conscious brand. Explore the website design concept.',
  },
  '/portfolio/capone': {
    title: 'Marketing Agency Website Design — Capone | M&T Studio',
    description: 'Capone Agency web design case study: a refined website concept that communicates marketing expertise, brand positioning and services.',
  },
  '/portfolio/villa-bali': {
    title: 'Luxury Real Estate Website Design — Villa Bali | M&T Studio',
    description: 'Villa Bali web design case study: a premium property website concept showcasing luxury villas and guiding international buyers.',
  },
  '/portfolio/zone': {
    title: 'Community Website Design — Zone | M&T Studio',
    description: 'Zone Community website design case study: a digital home for S.T.A.L.K.E.R. fans, community discussions and shared content.',
  },
  '/portfolio/beauty-sculpture': {
    title: 'Beauty Clinic Website Design — Beauty Sculpture | M&T Studio',
    description: 'Beauty Sculpture web design case study: an elegant aesthetic clinic website concept presenting treatments, expertise and enquiries.',
  },
  '/contacts': {
    title: 'Contact M&T | Custom Website Design & Development',
    description: 'Have a business website or landing page in mind? Contact M&T Web Designer Studio to discuss custom web design and development from idea to launch.',
  },
}

export default function SeoMetadata() {
  const { pathname } = useLocation()

  useEffect(() => {
    const entry = metadata[pathname] ?? metadata['/']!
    document.title = entry.title

    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (description) description.content = entry.description

    const pageUrl = origin + (pathname === '/' ? '/' : pathname)
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (canonical) canonical.href = pageUrl

    // Keep sharing metadata in sync when a visitor navigates between pages.
    const socialFields: Record<string, string> = {
      'og:title': entry.title,
      'og:description': entry.description,
      'og:url': pageUrl,
    }
    for (const [property, value] of Object.entries(socialFields)) {
      const meta = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
      if (meta) meta.content = value
    }
  }, [pathname])

  return null
}
