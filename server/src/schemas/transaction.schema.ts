import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema()
export class Transaction {
  readonly _id: string;

  @Prop()
  userId: string;

  @Prop()
  walletAddress: string;

  @Prop()
  hash: string;

  @Prop()
  from: string;

  @Prop()
  to: string;

  @Prop()
  value: number;

  @Prop()
  date: string;

  @Prop()
  status: string;

  @Prop()
  method: string;

  @Prop()
  txnFee: number;

  @Prop()
  category: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
