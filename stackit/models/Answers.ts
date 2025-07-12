import mongoose, { Document, Schema } from 'mongoose';

export interface IAnswer extends Document {
  questionId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  solution: string;
}

const AnswerSchema = new Schema<IAnswer>(
  {
    questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    solution: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Answer || mongoose.model<IAnswer>('Answer', AnswerSchema);