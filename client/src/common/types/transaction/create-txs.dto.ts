import { CreateTxDto } from "./create-tx.dto";

export type CreateTxsDto = Omit<CreateTxDto, 'hash'> & { files: File[] };
