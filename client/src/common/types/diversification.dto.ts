import { TransferDto } from "./transfer-instruction.dto";

export type DiversificationDto = {
  total: string;
  target: string;
  wallets: {
    address: string;
    balance: string;
  }[];
  transfers: TransferDto[]
};
