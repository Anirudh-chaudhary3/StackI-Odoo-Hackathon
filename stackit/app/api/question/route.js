import dbConnect from '@/lib/dbConnect';
import Question from '@/models/Question';

export async function GET(request) {
    await dbConnect();

    try {
        const questions = await Question.find().populate('answers');
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching questions', error });
    }
}
export async function POST() {
    await dbConnect();

    try {
        const { title, description, tags } = req.body;
        const newQuestion = await Question.create({ title, description, tags: tags || [] });
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(400).json({ message: 'Error creating question', error });
    }
}