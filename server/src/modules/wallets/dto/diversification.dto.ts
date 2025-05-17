import { TransferInstruction } from "./transfer-instruction.dto";

export type DiversificationDto = {
  total: string;
  target: string;
  transfers: TransferInstruction[]
};
