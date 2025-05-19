import { API_PATH } from "@/config";
import { httpApi } from "../http";
import TransactionService from "./transaction.service";

export const transactionService = new TransactionService({
  apiPath: API_PATH,
  httpApi: httpApi
});
