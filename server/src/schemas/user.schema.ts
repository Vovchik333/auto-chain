import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  readonly _id: string;

  @Prop({ 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true 
  })
  email: string;

  @Prop({ 
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50 
  })
  username: string;

  @Prop({ 
    required: true,
    minlength: 6,
  })
  password: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
