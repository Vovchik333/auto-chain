import { TransferDto } from "./transfer-instruction.dto";

export type DiversificationDto = {
  total: number;
  target: number;
  wallets: {
    address: string;
    balance: string;
  }[];
  transfers: TransferDto[]
};
