import { NextResponse } from 'next/server';
import SamplePost from '@/lib/constants/sample-posts.json';

export async function GET() {
    return NextResponse.json(SamplePost, {
        status: 200
    });
}
