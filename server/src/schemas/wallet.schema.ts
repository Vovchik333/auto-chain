import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type WalletDocument = HydratedDocument<Wallet>;

@Schema({ timestamps: true })
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

  @Prop({default: false})
  isSyncWithBlockchain: boolean;

  // @Prop({ type: Number })
  // lastSyncedBlock: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
