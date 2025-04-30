import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type WalletAnalyticsDocument = HydratedDocument<WalletAnalytics>;

@Schema()
export class WalletAnalytics {
  readonly _id: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  totalSent: string;

  @Prop()
  totalReceived: string;

  @Prop()
  totalTxCount: number;

  @Prop()
  lastTxDate: string;
}

export const WalletAnalyticsSchema = SchemaFactory.createForClass(WalletAnalytics);
