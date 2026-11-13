import { useEffect } from 'react'
import { useLocation } from 'react-router'

const origin = 'https://www.mt-web-designer-studio.com'
const metadata: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'M&T Web Designer Studio | Creative Web Design Agency',
    description: 'M&T Web Designer Studio creates distinctive websites and digital experiences. Explore our creative portfolio and contact the studio.',
  },
  '/about': {
    title: 'About Us | M&T Web Designer Studio',
    description: 'Get to know M&T Web Designer Studio, our approach to web design and the ideas behind our creative work.',
  },
  '/about-two': {
    title: 'Our Studio | M&T Web Designer Studio',
    description: 'Explore more about M&T Web Designer Studio, our creative perspective and approach to digital design.',
  },
  '/portfolio': {
    title: 'Web Design Portfolio | M&T Web Designer Studio',
    description: 'Browse web design portfolio projects by M&T Web Designer Studio, from modern brand experiences to distinctive websites.',
  },
  '/portfolio/eco-natura': {
    title: 'Eco Natura — Web Design Case | M&T Studio',
    description: 'Explore the Eco Natura web design case study by M&T Web Designer Studio.',
  },
  '/portfolio/capone': {
    title: 'Capone Agency — Web Design Case | M&T Studio',
    description: 'Explore the Capone Agency web design case study by M&T Web Designer Studio.',
  },
  '/portfolio/villa-bali': {
    title: 'Villa Bali — Web Design Case | M&T Studio',
    description: 'Explore the Villa Bali web design case study by M&T Web Designer Studio.',
  },
  '/portfolio/zone': {
    title: 'Zone Community — Web Design Case | M&T Studio',
    description: 'Explore the Zone Community web design case study by M&T Web Designer Studio.',
  },
  '/portfolio/beauty-sculpture': {
    title: 'Beauty Sculpture — Web Design Case | M&T Studio',
    description: 'Explore the Beauty Sculpture web design case study by M&T Web Designer Studio.',
  },
  '/contacts': {
    title: 'Contact Us | M&T Web Designer Studio',
    description: 'Contact M&T Web Designer Studio to discuss your website or digital design project.',
  },
}

export default function SeoMetadata() {
  const { pathname } = useLocation()

  useEffect(() => {
    const entry = metadata[pathname] ?? metadata['/']
    document.title = entry.title

    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (description) description.content = entry.description

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (canonical) canonical.href = origin + (pathname === '/' ? '/' : pathname)
  }, [pathname])

  return null
}
