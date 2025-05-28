import { PartialType } from "@nestjs/mapped-types";
import { CreateWalletFromBlockchainDto } from "./create-wallet-from-blockchain.dto";

export class UpdateWalletDto extends PartialType(CreateWalletFromBlockchainDto) {}
