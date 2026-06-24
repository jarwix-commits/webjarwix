import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
 
export const alt = 'Jarwix — AI-Powered Growth Agency';
export const size = {
  width: 1200,
  height: 630,
};
 
export const contentType = 'image/png';
 
export default async function Image() {
  const fontData = await fetch(
    new URL('../public/Hanson-Bold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  const logoData = await fetch(
    new URL('../public/logo.png', import.meta.url)
  ).then((res) => res.arrayBuffer());

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
          background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)',
          color: '#FFF5F0',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 50% -20%, rgba(255,90,31,0.2) 0%, transparent 70%)',
          }}
        />
        
        {/* Logo Mark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '50px',
          }}
        >
          {/* @ts-ignore */}
          <img src={logoData} alt="Jarwix" style={{ width: 423, height: 82 }} />
        </div>

        <div
          style={{
            fontFamily: '"Hanson Bold"',
            fontSize: 54,
            textAlign: 'center',
            padding: '0 100px',
            lineHeight: 1.15,
            letterSpacing: '-1px',
          }}
        >
          AI-Powered Growth Agency for Ambitious Businesses
        </div>
        
        <div
          style={{
            marginTop: '40px',
            fontSize: 24,
            color: 'rgba(255,245,240,0.6)',
            textAlign: 'center',
            letterSpacing: '4px',
            textTransform: 'uppercase',
          }}
        >
          Marketing • Web • Automation
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Hanson Bold',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  );
}
