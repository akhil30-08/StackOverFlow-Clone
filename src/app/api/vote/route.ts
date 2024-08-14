import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const {} = await request.json();
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || 'Error in voting',
      },
      { status: error?.status || error?.code || 500 }
    );
  }
}
