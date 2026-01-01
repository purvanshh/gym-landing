import { NextRequest, NextResponse } from 'next/server'

// In-memory store for demo purposes
// In production, use a real database (Postgres, etc.)
const waitlistEmails = new Set<string>()

// Simple rate limiting
const rateLimitMap = new Map<string, number[]>()

function rateLimit(ip: string, maxRequests = 5, windowMs = 60000): boolean {
  const now = Date.now()
  const requests = rateLimitMap.get(ip) || []
  
  // Remove old requests outside the window
  const recentRequests = requests.filter(time => now - time < windowMs)
  
  if (recentRequests.length >= maxRequests) {
    return false
  }
  
  recentRequests.push(now)
  rateLimitMap.set(ip, recentRequests)
  
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    
    // Rate limiting check
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }
    
    // Parse request body
    const body = await request.json()
    const { email } = body
    
    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }
    
    // Check if email already exists
    if (waitlistEmails.has(email.toLowerCase())) {
      return NextResponse.json(
        { message: 'You are already on the waitlist!' },
        { status: 200 }
      )
    }
    
    // Add to waitlist
    waitlistEmails.add(email.toLowerCase())
    
    // In production, you would:
    // 1. Store in database
    // 2. Send welcome email via Resend/Nodemailer
    // 3. Add to marketing automation
    
    console.log(`New waitlist signup: ${email}`)
    console.log(`Total signups: ${waitlistEmails.size}`)
    
    return NextResponse.json(
      { 
        message: 'Successfully joined the waitlist!',
        count: waitlistEmails.size 
      },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Waitlist API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Optional: GET endpoint to check waitlist count
export async function GET() {
  return NextResponse.json({
    count: waitlistEmails.size,
    message: 'Waitlist is open!'
  })
}
