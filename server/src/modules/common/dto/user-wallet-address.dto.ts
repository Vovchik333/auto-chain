import { IsOptional, IsString } from "class-validator";
import { IsEthAddress } from "src/decorators/is-eth-address.decorator";

export class UserWalletAddressDto {
  @IsOptional()
  @IsEthAddress({ message: 'Invalid wallet address' })
  address?: string;

  @IsString()
  userId: string;
}
