import { TransactionDto } from "./transaction.dto";

export type TransactionFilterDto = Partial<Omit<TransactionDto, 'id' | 'hash' | 'value' | 'date'>>;
