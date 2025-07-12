import dbConnect from '@/lib/dbConnect';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ 
      message: 'Database connected successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { 
        message: 'Database connection failed', 
        error: error.message 
      },
      { status: 500 }
    );
  }
} 