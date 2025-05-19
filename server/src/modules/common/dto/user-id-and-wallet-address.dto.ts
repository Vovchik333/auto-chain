import { IsOptional, IsString } from "class-validator";
import { IsEthAddress } from "src/decorators/is-eth-address.decorator";

export class UserIdAndWalletAddressDto {
  @IsString()
  userId: string;

  @IsOptional()
  @IsEthAddress({ message: 'Invalid wallet address' })
  address?: string;
}
