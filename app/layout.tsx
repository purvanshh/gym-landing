import { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dropset – Gym Tracker for Serious Athletes',
  description: 'Ditch the notebook. Supersets, dropsets, RPE, pace, community—built for lifters who actually care.',
  keywords: ['gym tracker', 'workout app', 'fitness', 'supersets', 'dropsets', 'RPE', 'strength training'],
  authors: [{ name: 'Dropset' }],
  openGraph: {
    title: 'Dropset – Gym Tracker for Serious Athletes',
    description: 'Ditch the notebook. Supersets, dropsets, RPE, pace, community—built for lifters who actually care.',
    type: 'website',
    siteName: 'Dropset',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Dropset Gym Tracker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dropset – Gym Tracker for Serious Athletes',
    description: 'Ditch the notebook. Supersets, dropsets, RPE, pace, community—built for lifters who actually care.',
    images: ['/api/og'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --font-space-grotesk: 'Space Grotesk', system-ui, -apple-system, sans-serif;
              --font-orbitron: 'Orbitron', system-ui, -apple-system, sans-serif;
            }
          `
        }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Dropset',
              applicationCategory: 'HealthApplication',
              description: 'Ditch the notebook. Supersets, dropsets, RPE, pace, community—built for lifters who actually care.',
              operatingSystem: 'iOS, Android',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
            }),
          }}
        />
      </head>
      <body style={{ fontFamily: 'var(--font-space-grotesk)' }}>
        {children}
      </body>
    </html>
  )
}
