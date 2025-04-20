import { type EtherscanNormalTransactionDto } from "./etherscan-normal-transaction.dto"

type EtherscanResponseDto = {
  status: string,
  message:  string,
  result: string | EtherscanNormalTransactionDto[]
}

export { type EtherscanResponseDto };
