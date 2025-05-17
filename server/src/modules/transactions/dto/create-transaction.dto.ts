import { IsString } from "class-validator";
import { IsEthAddress } from "src/decorators/is-eth-address.decorator";

export class CreateTransactionDto {
  @IsString()
  hash: string;

  @IsString()
  walletId: string;

  @IsString()
  userId: string;
}
