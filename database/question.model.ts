import { Schema, model, Document, models } from "mongoose";

export interface Question extends Document {
  title: string;
  explanation: string;
  tags: Schema.Types.ObjectId[];
  views: number;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId;
  answers: Schema.Types.ObjectId[];
  createdAt: Date;
}

const questionSchema = new Schema<Question>({
  title: { type: String, required: true },
  explanation: { type: String, required: true },
  tags: { type: [Schema.Types.ObjectId], ref: "Tag" },
  views: { type: Number, default: 0 },
  upvotes: { type: [Schema.Types.ObjectId], ref: "User", default: [] },
  downvotes: { type: [Schema.Types.ObjectId], ref: "User", default: [] },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  answers: { type: [Schema.Types.ObjectId], ref: "Answer" },
  createdAt: { type: Date, default: Date.now }
});

const QuestionModel =
  models.Question || model<Question>("Question", questionSchema);

export default QuestionModel;
