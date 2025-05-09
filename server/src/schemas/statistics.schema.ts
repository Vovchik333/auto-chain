import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { Transaction } from "./transaction.schema";

export type StatisticsDocument = HydratedDocument<Statistics>;

@Schema()
export class Statistics {
  readonly _id: string;

  @Prop({ default: 0 })
  totalSent: number;

  @Prop({ default: 0 })
  totalReceived: number;

  @Prop({ default: 0 })
  totalTxCount: number;

  @Prop({ default: '' })
  largestAmountTransactionHash: string;

  @Prop({ default: 0 })
  totalFeeUsed: number;
}

export const StatisticsSchema = SchemaFactory.createForClass(Statistics);
