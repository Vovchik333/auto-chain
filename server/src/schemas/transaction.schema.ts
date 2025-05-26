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

  @Prop({default: 'Success'})
  status: string;

  @Prop()
  txnFee: string;

  @Prop()
  category: string;

  @Prop()
  type: 'deposit' | 'withdraw';
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
