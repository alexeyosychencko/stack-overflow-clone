import { Schema, model, models, Document } from "mongoose";
import { User } from "./user.model";
import { Question } from "./question.model";
import { Answer } from "./answer.model";
import { Tag } from "./tag.model";

export interface Interaction extends Document {
  user: User; // refence to user
  action: string;
  question: Question; // reference to question
  answer: Answer; // reference to answer
  tags: Tag[]; // reference to tag
  createdAt: Date;
}

const InteractionSchema = new Schema<Interaction>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true },
  question: { type: Schema.Types.ObjectId, ref: "Question" },
  answer: { type: Schema.Types.ObjectId, ref: "Answer" },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  createdAt: { type: Date, default: Date.now }
});

const InteractionModel =
  models.Interaction || model<Interaction>("Interaction", InteractionSchema);

export default InteractionModel;
