import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type WalletAnalyticsDocument = HydratedDocument<WalletAnalytics>;

@Schema()
export class WalletAnalytics {
  readonly _id: string;

  @Prop({ required: true })
  address: string;

  @Prop({ default: 0 })
  totalSent: number;

  @Prop({ default: 0 })
  totalReceived: number;

  @Prop({ default: 0 })
  totalTxCount: number;

  @Prop({ default: '' })
  largestAmountTransaction: string;

  @Prop({ default: 0 })
  totalFeeUsed: number;
}

export const WalletAnalyticsSchema = SchemaFactory.createForClass(WalletAnalytics);
