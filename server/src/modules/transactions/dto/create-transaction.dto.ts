import { IsNumber, IsString } from "class-validator";
import { IsEthAddress } from "src/decorators/is-eth-address.decorator";

export class CreateTransactionDto {
  @IsEthAddress()
  from: string;

  @IsEthAddress()
  to: string;

  @IsNumber()
  value: number;

  @IsString()
  date: string;

  @IsString()
  method: string;

  @IsNumber()
  txnFee: number;

  @IsString()
  category: string;

  @IsString()
  walletAddress: string;
}
