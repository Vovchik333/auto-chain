import { IsEthAddress } from "src/decorators/is-eth-address.decorator";

export class GenerateAuthCodeDto {
  @IsEthAddress({ message: 'Invalid wallet address' })
  address: string;
}
