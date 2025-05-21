import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { Transaction } from "./transaction.schema";

export type StatisticsDocument = HydratedDocument<Statistics>;

@Schema()
export class Statistics {
  readonly _id: string;

  @Prop({ 
    default: '0',
    validate: {
      validator: (v: string) => /^-?\d*\.?\d*$/.test(v),
      message: 'Balance must be a valid number string'
    }
  })
  balance: string;

  @Prop({ 
    default: '0',
    validate: {
      validator: (v: string) => /^\d*\.?\d*$/.test(v),
      message: 'Total sent must be a positive number string'
    }
  })
  totalSent: string;

  @Prop({ 
    default: '0',
    validate: {
      validator: (v: string) => /^\d*\.?\d*$/.test(v),
      message: 'Total received must be a positive number string'
    }
  })
  totalReceived: string;

  @Prop({ 
    default: 0,
    min: 0
  })
  totalTxCount: number;
  
  @Prop({ 
    type: MongooseSchema.Types.ObjectId, 
    ref: 'Transaction',
    required: false
  })
  largestAmountTransaction?: Transaction;

  @Prop({ 
    default: '0',
    validate: {
      validator: (v: string) => /^\d*\.?\d*$/.test(v),
      message: 'Total fee must be a positive number string'
    }
  })
  totalFeeUsed: string;
}

export const StatisticsSchema = SchemaFactory.createForClass(Statistics);
