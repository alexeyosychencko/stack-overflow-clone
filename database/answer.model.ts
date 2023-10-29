import { Schema, models, model, Document } from "mongoose";

export interface Answer extends Document {
  author: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId;
  content: string;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  createdAt: Date;
}

const AnswerSchema = new Schema<Answer>({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: "Question",
    required: true
  },
  content: {
    type: String,
    required: true
  },
  upvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  downvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const AnswerModel =
  models.Answer<Answer> || model<Answer>("Answer", AnswerSchema);

export default AnswerModel;
