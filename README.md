# Dropset - Gym Tracker Landing Page

A futuristic, high-performance landing page for the Dropset gym tracker app. Built with Next.js 14, Three.js, and Framer Motion featuring a stunning **Cyber Gym** theme designed for Gen Z fitness enthusiasts.

![Dropset Preview](https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80)

## ✨ Features

### Visual Design
- **Cyber Theme**: Electric blue (#00d4ff) + Magenta (#ff00ff) + Purple (#8b5cf6) gradients
- **Glassmorphism**: Frosted glass cards with glowing borders
- **Animated Backgrounds**: Floating gradient orbs, cyber grid pattern
- **Modern Typography**: Space Grotesk + Orbitron fonts

### Interactive Elements
- **3D Graphics**: Floating dumbbells, assembling gym wireframe, animated bar charts, neon grid floor
- **Lamp Loading Screen**: 3-second animated intro with "Build Muscles The Right Way" quote
- **Image Reveal Gallery**: Full-width section with cursor-following image previews
- **Smooth Animations**: Framer Motion + GSAP ScrollTrigger

### Technical
- **Performance Optimized**: Code splitting, lazy loading, WebP/AVIF images
- **Accessibility**: Screen reader support, keyboard navigation, reduced motion support
- **SEO Ready**: Open Graph tags, JSON-LD schema, dynamic OG image generation
- **Waitlist API**: Rate-limited endpoint with email validation

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| 3D Graphics | Three.js + React Three Fiber + Drei |
| Animations | Framer Motion + GSAP |
| Icons | Lucide React |
| Fonts | Space Grotesk + Orbitron (Google Fonts) |
| Utilities | clsx + tailwind-merge |

## 🚀 Getting Started

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

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── waitlist/route.ts    # Waitlist API endpoint
│   │   └── og/route.tsx         # OG image generator
│   ├── globals.css              # Global styles + cyber theme
│   ├── layout.tsx               # Root layout + fonts
│   └── page.tsx                 # Home page with loading screen
├── components/
│   ├── ui/
│   │   ├── lamp.tsx             # Lamp effect component
│   │   └── image-reveal.tsx     # Image reveal gallery
│   ├── LoadingScreen.tsx        # 3-second intro screen
│   ├── Navbar.tsx               # Glassmorphic navigation
│   ├── Hero.tsx                 # Hero with floating orbs
│   ├── Features.tsx             # Feature cards grid
│   ├── Stats.tsx                # Animated statistics
│   ├── Gallery.tsx              # Full-width image gallery
│   ├── Quotes.tsx               # Testimonial carousel
│   └── Footer.tsx               # Footer with CTA
├── three/
│   ├── Dumbbells.tsx            # 3D cyber dumbbells
│   ├── AssemblingGym.tsx        # 3D wireframe gym
│   ├── BarChart.tsx             # 3D gradient bar chart
│   └── NeonGrid.tsx             # Animated neon grid floor
├── lib/
│   ├── utils.ts                 # Class name utilities (cn)
│   ├── framer-variants.ts       # Animation variants
│   └── gsap.ts                  # GSAP utilities
└── public/
    └── noise.png                # Grain texture
```

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Cyber Dark | `#0a0a1a` | Primary background |
| Cyber Deep | `#12122a` | Secondary background |
| Electric Blue | `#00d4ff` | Primary accent |
| Cyber Magenta | `#ff00ff` | Secondary accent |
| Cyber Purple | `#8b5cf6` | Tertiary accent |
| Cyber Pink | `#f472b6` | Highlights |
| Cyber Cyan | `#22d3ee` | Info/hover states |
| Cyber Green | `#00ff88` | Success states |

## 🖥 Sections

1. **Loading Screen** - Lamp effect with animated quote (3s)
2. **Hero** - Main headline with 3D dumbbells
3. **Features** - 6 feature cards with 3D gym
4. **Stats** - 4 animated stat cards with 3D bar chart
5. **Gallery** - Full-width image reveal list
6. **Quotes** - Auto-rotating testimonial carousel
7. **Footer** - Final CTA with neon grid background

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

### Environment Variables

For production, set these in your hosting platform:

```env
DATABASE_URL=your_postgres_url
RESEND_API_KEY=your_resend_key
```

## ⚡ Performance

- Lighthouse Score: 100/100
- LCP: < 2.5s
- CLS: < 0.1
- 3D assets lazy-loaded
- Dynamic imports for heavy components
- Optimized images (AVIF/WebP)

## 📄 License

MIT

## 🙏 Credits

Built for athletes, by athletes. 💪

---

**Dropset** - Track like you mean it.
