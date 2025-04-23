import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type FraudReportDocument = HydratedDocument<FraudReport>;

@Schema()
export class FraudReport {
  readonly _id: string;

  @Prop()
  description: string;

  @Prop()
  fromAddress: string;

  @Prop()
  toAddress: string;

  @Prop()
  amount: string;

  @Prop()
  transactionHash: string;
}

export const FraudReportSchema = SchemaFactory.createForClass(FraudReport);
