import { UserIdAndWalletAddressDto } from "src/modules/common/dto/user-id-and-wallet-address.dto";
import { CreateWalletDto } from "./create-wallet.dto";
import { IsOptional, IsString } from "class-validator";
import { IsEthAddress } from "src/decorators/is-eth-address.decorator";

export class CreateWalletFromBlockchainDto extends CreateWalletDto {
  @IsString()
  userId: string;
  
  @IsOptional()
  @IsEthAddress({ message: 'Invalid wallet address' })
  address?: string;
}
