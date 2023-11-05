import mongoose from "mongoose";
import { User } from "./user.model";
import { Question } from "./question.model";
import * as typegoose from "@typegoose/typegoose";
import { Severity } from "@typegoose/typegoose";

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
    collection: "answers"
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})
class Answer {
  _id: mongoose.Types.ObjectId | string;
  public id: string;

  @typegoose.prop({ required: true, ref: () => User })
  public author: typegoose.Ref<User>;

  @typegoose.prop({ required: true, ref: () => Question })
  public question: typegoose.Ref<Question>;

  @typegoose.prop({ required: true })
  public content: string;

  @typegoose.prop({ default: [] })
  public upvotes: string[];

  @typegoose.prop({ default: [] })
  public downvotes: string[];

  @typegoose.prop({ default: Date.now })
  public createdAt: Date;
}

const AnswerModel =
  typegoose.mongoose.models.Answer || typegoose.getModelForClass(Answer);

export { AnswerModel, Answer };

// export interface Answer extends Document {
//   _id: string;
//   author: User;
//   question: Question;
//   content: string;
//   upvotes: any[];
//   downvotes: any[];
//   createdAt: Date;
// }

// const AnswerSchema = new Schema<Answer>({
//   author: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//     required: true
//   },
//   question: {
//     type: Schema.Types.ObjectId,
//     ref: "Question",
//     required: true
//   },
//   content: {
//     type: String,
//     required: true
//   },
//   upvotes: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "User"
//     }
//   ],
//   downvotes: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "User"
//     }
//   ],
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// const AnswerModel = models.Answer || model<Answer>("Answer", AnswerSchema);

// export default AnswerModel;
