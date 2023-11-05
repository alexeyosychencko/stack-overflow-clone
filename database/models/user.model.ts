import {
  ModelOptions,
  Ref,
  Severity,
  post,
  prop,
  getModelForClass
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { Question } from "./question.model";

@post("save", function (doc) {
  if (doc) {
    doc.id = doc._id.toString();
    doc._id = doc.id;
  }
})
@post(/^find/, function (docs) {
  // @ts-ignore
  if (this.op === "find") {
    docs.forEach((doc: any) => {
      doc.id = doc._id.toString();
      doc._id = doc.id;
    });
  }
})
@ModelOptions({
  schemaOptions: {
    timestamps: true
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})
class User {
  _id: mongoose.Types.ObjectId | string;

  public id: string;

  @prop({ required: true })
  public clerkId: string;

  @prop({ required: true })
  public name: string;

  @prop({ required: true, unique: true })
  public username: string;

  @prop({ required: true, unique: true })
  public email: string;

  @prop()
  public password: string;

  @prop()
  public bio?: string;

  @prop({ required: true })
  public picture: string;

  @prop()
  public location?: string;

  @prop()
  public portfolioWebsite?: string;

  @prop({ default: 0 })
  public reputation?: number;

  @prop({ ref: "Question" })
  public saved?: Ref<Question>[];

  @prop({ default: Date.now })
  public joinedAt: Date;
}

const UserModel = mongoose.models.User || getModelForClass(User);

export { UserModel, User };

// export interface User extends Document {
//   _id: string;
//   clerkId: string;
//   name: string;
//   username: string;
//   email: string;
//   password?: string;
//   bio?: string;
//   picture: string;
//   location?: string;
//   portfolioWebsite?: string;
//   reputation?: number;
//   saved: any[];
//   joinedAt: Date;
// }

// const UserSchema = new Schema<User>({
//   clerkId: { type: String, required: true },
//   name: { type: String, required: true },
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String },
//   bio: { type: String },
//   picture: { type: String, required: true },
//   location: { type: String },
//   portfolioWebsite: { type: String },
//   reputation: { type: Number, default: 0 },
//   saved: [{ type: Schema.Types.ObjectId, ref: "Question" }],
//   joinedAt: { type: Date, default: Date.now }
// });

// const UserModel = models.User || model<User>("User", UserSchema);

// export default UserModel;
