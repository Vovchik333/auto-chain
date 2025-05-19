import { IsOptional, IsString } from "class-validator";

export class UserIdAndWalletIdDto {
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  walletId?: string;
}
