import { API_PATH } from "@/config";
import { httpApi } from "../http";
import WalletService from "./wallet.service";

export const walletService = new WalletService({
  apiPath: API_PATH,
  httpApi: httpApi
});
