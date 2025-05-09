import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";

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
  statisticsId: string;

  @Prop({default: false})
  isSyncWithBlockchain: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
