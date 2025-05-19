import { API_PATH } from "@/config";
import AuthService from "./auth.service";
import { httpApi } from "../http";

export const authService = new AuthService({
  apiPath: API_PATH,
  httpApi: httpApi
});
