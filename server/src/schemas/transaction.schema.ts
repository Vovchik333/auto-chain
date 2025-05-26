import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema()
export class Transaction {
  readonly _id: string;

  @Prop({
    required: true,
  })
  walletId: string;

  @Prop()
  hash: string;

  @Prop()
  from: string;

  @Prop()
  to: string;

  @Prop()
  value: string;

  @Prop()
  date: string;

  @Prop()
  status: string;

  @Prop()
  txnFee: string;

  @Prop()
  category: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
