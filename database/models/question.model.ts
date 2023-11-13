import mongoose from "mongoose";
import { Tag } from "./tag.model";
import { User } from "./user.model";
import { Answer } from "./answer.model";
import * as typegoose from "@typegoose/typegoose";

@typegoose.post("save", function (doc) {
  if (doc) {
    doc.id = doc._id.toString();
    doc._id = doc.id;
  }
})
@typegoose.post(/^find/, function (docs) {
  // @ts-ignore
  if (this.op === "find") {
    docs.forEach((doc: any) => {
      doc.id = doc._id.toString();
      doc._id = doc.id;
    });
  }
})
@typegoose.ModelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "questions"
  },
  options: {
    allowMixed: typegoose.Severity.ALLOW
  }
})
class Question {
  _id: mongoose.Types.ObjectId | string;

  id: string;

  @typegoose.prop({ required: true })
  public title: string;

  @typegoose.prop({ required: true })
  public explanation: string;

  @typegoose.prop({ ref: "Tag", default: [] })
  public tags: typegoose.Ref<Tag>[];

  @typegoose.prop({ required: true, default: 0 })
  public views: number;

  @typegoose.prop({ default: [] })
  public upvotes: string[];

  @typegoose.prop({ default: [] })
  public downvotes: string[];

  @typegoose.prop({ ref: "User" })
  public author: typegoose.Ref<User>;

  @typegoose.prop({ ref: "Answer", default: [] })
  public answers: typegoose.Ref<Answer>[];

  @typegoose.prop({ required: true, default: Date.now })
  public createdAt: Date;
}

const QuestionModel =
  typegoose.mongoose.models.Question || typegoose.getModelForClass(Question);

export { QuestionModel, Question };
