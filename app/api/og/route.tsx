import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          backgroundImage: 'radial-gradient(circle at 25px 25px, #00ff85 2%, transparent 0%), radial-gradient(circle at 75px 75px, #00ff85 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 40,
          }}
        >
          <h1
            style={{
              fontSize: 120,
              fontWeight: 900,
              color: '#fff',
              letterSpacing: '-0.05em',
              textTransform: 'uppercase',
              fontStyle: 'oblique',
            }}
          >
            DROPSET
          </h1>
          <p
            style={{
              fontSize: 40,
              color: '#00ff85',
              fontWeight: 700,
              textAlign: 'center',
              maxWidth: '80%',
            }}
          >
            Serious tracking for serious workouts
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
