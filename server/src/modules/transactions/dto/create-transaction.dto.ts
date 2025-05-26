import { IsString, IsNotEmpty, IsEthereumAddress, IsOptional, IsNumber, Matches } from 'class-validator';
import { IsEthAddress } from 'src/decorators/is-eth-address.decorator';

export class CreateTransactionDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  hash: string;

  @IsEthAddress()
  from: string;

  @IsEthAddress()
  to: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9]+\.?[0-9]*$/, {
    message: 'Value must be a valid number string'
  })
  value: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9]+\.?[0-9]*$/, {
    message: 'Transaction fee must be a valid number string'
  })
  txnFee: string;

  @IsString()
  category: string;

  @IsString()
  @IsNotEmpty()
  walletId: string;
}
