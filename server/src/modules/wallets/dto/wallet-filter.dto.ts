import { Type } from "class-transformer";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class WalletFilterDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isSyncWithBlockchain?: string;

  @IsOptional()
  @IsString()
  statisticsId?: string;
}
