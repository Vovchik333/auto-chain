import { WalletDto } from "./wallet.dto";

export type CreateWalletFromBlockchainDto = Pick<WalletDto, 'name' | 'userId' | 'address'>;
