import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";

export type WalletDocument = HydratedDocument<Wallet>;

@Schema()
export class Wallet {
  readonly _id: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ 
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100 
  })
  name: string;

  @Prop({
    trim: true,
  })
  address?: string;

  @Prop({default: false})
  isSyncWithBlockchain: boolean;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
