import { WalletDto } from "./wallet.dto";

export type WalletFilterDto = Partial<Omit<WalletDto, 'id' | 'transactions' | 'statistics'>>;
