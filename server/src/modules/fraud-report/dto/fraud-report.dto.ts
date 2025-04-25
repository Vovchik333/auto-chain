import { FraudCategory } from "src/common/enums/report/fraud-category.enum";
import { ValueOf } from "src/common/types/value-of.type";

export type FraudReportDto = {
  id: string;
  walletAddress: string; 
  reporterAddress: string;
  reason: string; 
  category: ValueOf<typeof FraudCategory>;
  evidenceLinks: string[]; 
  totalLossEstimatedUsd: number;
  confirmed: boolean;
}
