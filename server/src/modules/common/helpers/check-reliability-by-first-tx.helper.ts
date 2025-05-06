import { ReliabilityLevel } from "src/common/enums/report/reliability-level.enum";
import { EtherscanNormalTransactionDto } from "../dto/etherscan-normal-transaction.dto";
import { ReportItemDto } from "../dto/report-item.dto";
import { getDaysAgo } from "./get-days-ago.helper";

const checkReliabilityByFirstTx = async (report: ReportItemDto[], txsList: EtherscanNormalTransactionDto[]) => {

  if (txsList.length === 0) {
    report.push({description: 'No transactions found', reliabilityLevel: ReliabilityLevel.LOW});

    return;
  } 

  const firstTx = txsList[0];
  const createdDaysAgo = getDaysAgo(parseInt(firstTx.timeStamp));

  if (createdDaysAgo < 30) {
    report.push({description: 'Created less than 30 days ago', reliabilityLevel: ReliabilityLevel.LOW});
  } else if (createdDaysAgo < 90) {
    report.push({description: 'Created less than 90 days ago', reliabilityLevel: ReliabilityLevel.MEDIUM});
  } else if (createdDaysAgo < 180) {
    report.push({description: 'Created less than 180 days ago', reliabilityLevel: ReliabilityLevel.HIGH});
  } else {
    report.push({description: 'Created more than 180 days ago', reliabilityLevel: ReliabilityLevel.HIGH});
  }
}

export { checkReliabilityByFirstTx }