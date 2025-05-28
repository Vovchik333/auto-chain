import { TransferDto } from "./transfer-instruction.dto";

export type DiversificationDto = {
  total: number;
  target: number;
  transfers: TransferDto[]
};
