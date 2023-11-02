import { Schema, model, models, Document } from "mongoose";
import { Question } from "./question.model";
import { User } from "./user.model";

export interface Tag extends Document {
  _id: string;
  name: string;
  description: string;
  questions: Question[];
  followers: User[];
  createdOn: Date;
}

const TagSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdOn: { type: Date, default: Date.now }
});

const TagModel = models.Tag || model<Tag>("Tag", TagSchema);

export default TagModel;
