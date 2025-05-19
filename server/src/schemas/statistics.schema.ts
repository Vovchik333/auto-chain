import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { Transaction } from "./transaction.schema";

export type StatisticsDocument = HydratedDocument<Statistics>;

@Schema()
export class Statistics {
  readonly _id: string;

  @Prop({ default: '0' })
  balance: string;

  @Prop({ default: '0' })
  totalSent: string;

  @Prop({ default: '0' })
  totalReceived: string;

  @Prop({ default: 0 })
  totalTxCount: number;

  @Prop({ default: undefined, type: MongooseSchema.Types.ObjectId, ref: 'Transaction' })
  largestAmountTransaction?: Transaction;

  @Prop({ default: '0' })
  totalFeeUsed: string;
}

export const StatisticsSchema = SchemaFactory.createForClass(Statistics);
