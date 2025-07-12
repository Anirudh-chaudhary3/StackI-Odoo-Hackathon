import dbConnect from '@/lib/dbConnect';
import Question from '@/models/Question';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    await dbConnect();

    try {
        const questions = await Question.find().populate('answers');
        return NextResponse.json(questions);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return NextResponse.json(
            { message: 'Error fetching questions', error: errorMessage },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    await dbConnect();

    try {
        const body = await request.json();
        const { title, description, tags } = body;
        
        if (!title || !description) {
            return NextResponse.json(
                { message: 'Title and description are required' },
                { status: 400 }
            );
        }

        const newQuestion = await Question.create({ 
            title, 
            description, 
            tags: tags || [] 
        });
        
        return NextResponse.json(newQuestion, { status: 201 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return NextResponse.json(
            { message: 'Error creating question', error: errorMessage },
            { status: 400 }
        );
    }
}