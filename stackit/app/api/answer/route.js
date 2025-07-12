import dbConnect from '@/lib/dbConnect';
import Answer from '@/models/Answer';
import Question from '@/models/Question';

export async function GET(request) {
  await dbConnect();

  try {
    const answers = await Answer.find();
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching answers', error });
  }
}
export async function POST() {
  await dbConnect();

  try {
    const { questionId, userId, solution } = req.body;
    const newAnswer = await Answer.create({ questionId, userId, solution });

    await Question.findByIdAndUpdate(questionId, {
      $push: { answers: newAnswer._id },
    });

    res.status(201).json(newAnswer);
  } catch (error) {
    res.status(400).json({ message: 'Error creating answer', error });
  }
}