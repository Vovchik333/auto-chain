import { CreateWalletDto } from "./create-wallet.dto";
import { IsBoolean, IsOptional, IsString } from "class-validator";
import { IsEthAddress } from "src/decorators/is-eth-address.decorator";

export class CreateWalletFromBlockchainDto extends CreateWalletDto {
  @IsString()
  userId: string;

  @IsString({ message: 'Name must be a string' })
  name: string;
  
  @IsOptional()
  @IsEthAddress({ message: 'Invalid wallet address' })
  address?: string;

  @IsOptional()
  @IsBoolean({ message: 'isSyncWithBlockchain must be a boolean' })
  isSyncWithBlockchain?: boolean;
}
