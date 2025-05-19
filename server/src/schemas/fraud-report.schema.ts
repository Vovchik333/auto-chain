import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type FraudReportDocument = HydratedDocument<FraudReport>;

@Schema()
export class FraudReport {
  readonly _id: string;

  @Prop()
  reason: string;

  @Prop()
  reporterAddress: string;

  @Prop()
  walletAddress: string;

  @Prop()
  totalLossEstimatedUsd: number;

  @Prop()
  category: string;

  @Prop({ default: [] })
  evidenceLinks: string[];

  @Prop({ default: false })
  confirmed: boolean;
}

export const FraudReportSchema = SchemaFactory.createForClass(FraudReport);
