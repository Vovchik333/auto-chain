import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

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
  
  @Prop()
  createdAt: string;
  
  @Prop()
  updatedAt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
