import mongoose from "mongoose";
import { Question } from "./question.model";
import { User } from "./user.model";
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
    collection: "tags"
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})
class Tag {
  _id: mongoose.Types.ObjectId | string;
  id: string;

  @typegoose.prop({ required: true, unique: true })
  public name: string;

  @typegoose.prop({ required: true })
  public description: string;

  @typegoose.prop({ ref: "Question", default: [] })
  public questions: typegoose.Ref<Question>[];

  @typegoose.prop({ ref: "User", default: [] })
  public followers: typegoose.Ref<User>[];

  @typegoose.prop({ default: Date.now })
  public createdOn: Date;
}

const TagModel =
  typegoose.mongoose.models.Tag || typegoose.getModelForClass(Tag);

export { TagModel, Tag };

// export interface Tag extends Document {
//   _id: string;
//   name: string;
//   description: string;
//   questions: Question[];
//   followers: User[];
//   createdOn: Date;
// }

// const TagSchema = new Schema({
//   name: { type: String, required: true, unique: true },
//   description: { type: String, required: true },
//   questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
//   followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
//   createdOn: { type: Date, default: Date.now }
// });

// const TagModel = models.Tag || model<Tag>("Tag", TagSchema);

// export default TagModel;
