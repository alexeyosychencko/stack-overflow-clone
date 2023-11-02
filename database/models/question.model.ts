import { Schema, model, Document, models } from "mongoose";
import { Tag } from "./tag.model";
import { User } from "./user.model";
import { Answer } from "./answer.model";

export interface Question extends Document {
  _id: string;
  title: string;
  explanation: string;
  tags: Tag[];
  views: number;
  upvotes: any[];
  downvotes: any[];
  author: User;
  answers: Answer[];
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
