import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { Transaction } from "./transaction.schema";

export type WalletDocument = HydratedDocument<Wallet>;

@Schema()
export class Wallet {
  readonly _id: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  statisticsId: string;

  @Prop()
  isSyncWithBlockchain: boolean;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Transaction' })
  transactions: Transaction[]
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
