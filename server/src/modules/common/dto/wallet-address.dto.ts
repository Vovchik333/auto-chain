import { IsEthAddress } from "src/decorators/is-eth-address.decorator";

export class WalletAddressDto {
  @IsEthAddress({ message: 'Invalid wallet address' })
  address: string;
}
