import { WalletDto } from "./wallet.dto";

export type CreateWalletDto = Pick<WalletDto, 'name' | 'userId'>;
