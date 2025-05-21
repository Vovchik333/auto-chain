import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { Transaction } from "./transaction.schema";
import { Statistics } from "./statistics.schema";

export type WalletDocument = HydratedDocument<Wallet>;

@Schema()
export class Wallet {
  readonly _id: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ 
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100 
  })
  name: string;

  @Prop({
    trim: true,
  })
  address?: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Statistics',
    required: true
  })
  statistics: Statistics;

  @Prop({default: false})
  isSyncWithBlockchain: boolean;

  @Prop({ 
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Transaction' }],
    default: [] 
  })
  transactions: Transaction[]
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
