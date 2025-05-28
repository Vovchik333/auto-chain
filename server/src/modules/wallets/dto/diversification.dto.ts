import { TransferDto } from "./transfer.dto";

export type DiversificationDto = {
  total: string;
  target: string;
  transfers: TransferDto[]
};
