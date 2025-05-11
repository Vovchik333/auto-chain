import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { Statistics } from "./statistics.schema";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  readonly _id: string;

  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({type: MongooseSchema.Types.ObjectId, ref: 'Statistics'})
  statistics?: Statistics;
}

export const UserSchema = SchemaFactory.createForClass(User);
