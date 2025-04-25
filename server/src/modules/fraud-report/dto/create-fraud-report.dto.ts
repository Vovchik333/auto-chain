import { IsArray, IsEnum, IsNumber, IsString } from "class-validator";
import { FraudCategory } from "src/common/enums/report/fraud-category.enum";
import { ValueOf } from "src/common/types/value-of.type";
import { IsEthAddress } from "src/decorators/is-eth-address.decorator";

export class CreateFraudReportDto {
  @IsEthAddress()
  reporterAddress: string;

  @IsEthAddress()
  walletAddress: string;

  @IsString()
  reason: string;

  @IsEnum(FraudCategory)
  category: ValueOf<typeof FraudCategory>;

  @IsArray()
  @IsString({ each: true })
  evidenceLinks: string[]; 

  @IsNumber()
  totalLossEstimatedUsd: string;
  
  @IsString()
  signature: string;
}
