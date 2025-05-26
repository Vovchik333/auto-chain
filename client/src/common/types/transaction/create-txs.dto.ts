import { CreateTxDto } from "./create-tx.dto";

export type CreateTxsDto = Pick<CreateTxDto, 'walletId'> & { files: File[] };
