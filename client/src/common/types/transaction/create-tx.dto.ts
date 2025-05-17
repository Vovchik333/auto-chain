import { TransactionDto } from "./transaction.dto";

export type CreateTxDto = Pick<TransactionDto, 'userId' | 'hash' | 'walletId'>;
