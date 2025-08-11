import { NextRequest, NextResponse } from 'next/server';
import { ImageResponse } from 'next/og'

export async function GET (request: NextRequest) {
    const title = request.nextUrl.searchParams.get('title');
    if (!title) {
        return NextResponse.json('Missing title', { status: 400 });
    }

    console.error('OG Image requested with params:', request.nextUrl.searchParams.toString());
    console.error('Request URL:', request.url);

    return new ImageResponse(
        (
            <div

                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 96,
                    background: 'white',
                }}
            >
                {title}
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
