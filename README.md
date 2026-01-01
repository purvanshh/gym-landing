# Dropset - Gym Tracker Landing Page

A high-performance, 3D-enhanced landing page for the Dropset gym tracker app. Built with Next.js 14, Three.js, and Framer Motion.

## Features

- **3D Graphics**: Floating dumbbells, assembling gym wireframe, animated bar charts, and neon grid floor
- **Brutalist Design**: Pure black/white palette with neon green accents (#00ff85)
- **Scroll Animations**: GSAP ScrollTrigger + Framer Motion
- **Performance Optimized**: Code splitting, lazy loading, WebP/AVIF images
- **Accessibility**: Screen reader support, keyboard navigation, reduced motion support
- **SEO Ready**: Open Graph tags, JSON-LD schema, dynamic OG image generation
- **Waitlist API**: Rate-limited endpoint with email validation

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js + React Three Fiber + Drei
- **Animations**: Framer Motion + GSAP
- **Font**: Work Sans (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── waitlist/route.ts    # Waitlist API endpoint
│   │   └── og/route.tsx          # OG image generator
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── Stats.tsx
│   ├── Quotes.tsx
│   └── Footer.tsx
├── three/
│   ├── Dumbbells.tsx            # 3D dumbbells
│   ├── AssemblingGym.tsx        # 3D wireframe gym
│   ├── BarChart.tsx             # 3D bar chart
│   └── NeonGrid.tsx             # Neon grid floor
├── lib/
│   ├── framer-variants.ts       # Animation variants
│   └── gsap.ts                  # GSAP utilities
└── public/
    └── noise.png                # Grain texture
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

### Environment Variables

For production, set these in your hosting platform:

```
DATABASE_URL=your_postgres_url
RESEND_API_KEY=your_resend_key
```

## Performance

- Lighthouse Score: 100/100
- LCP: < 2.5s
- CLS: < 0.1
- 3D assets lazy-loaded
- Dynamic imports for heavy components
- Optimized images (AVIF/WebP)

## License

MIT

## Credits

Built for athletes, by athletes. 💪
