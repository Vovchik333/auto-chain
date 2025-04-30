import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema()
export class Transaction {
  readonly _id: string;

  @Prop()
  ownerAddress: string;

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
  gasUsed: string;

  @Prop()
  block: string;

  @Prop()
  method: string;

  @Prop()
  confirmations: string;

  @Prop()
  txnFee: number;

  @Prop()
  category: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
