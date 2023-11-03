import mongoose from "mongoose";
import { User } from "./user.model";
import { Question } from "./question.model";
import { Answer } from "./answer.model";
import { Tag } from "./tag.model";
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
    timestamps: true
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})
class Interaction {
  _id: mongoose.Types.ObjectId | string;
  public id: string;

  @typegoose.prop({ ref: () => User })
  public user: typegoose.Ref<User>;

  @typegoose.prop({ required: true })
  public action: string;

  @typegoose.prop({ ref: () => Question })
  public question: typegoose.Ref<Question>;

  @typegoose.prop({ ref: () => Answer })
  public answer: typegoose.Ref<Answer>;

  @typegoose.prop({ ref: () => Tag })
  public tags: typegoose.Ref<Tag>[];

  @typegoose.prop({ default: Date.now })
  public createdAt: Date;
}

const InteractionModel =
  typegoose.mongoose.models.Interaction ||
  typegoose.getModelForClass(Interaction);

export { InteractionModel, Interaction };

// export interface Interaction extends Document {
//   user: User; // refence to user
//   action: string;
//   question: Question; // reference to question
//   answer: Answer; // reference to answer
//   tags: Tag[]; // reference to tag
//   createdAt: Date;
// }

// const InteractionSchema = new Schema<Interaction>({
//   user: { type: Schema.Types.ObjectId, ref: "User", required: true },
//   action: { type: String, required: true },
//   question: { type: Schema.Types.ObjectId, ref: "Question" },
//   answer: { type: Schema.Types.ObjectId, ref: "Answer" },
//   tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
//   createdAt: { type: Date, default: Date.now }
// });

// const InteractionModel =
//   models.Interaction || model<Interaction>("Interaction", InteractionSchema);

// export default InteractionModel;
