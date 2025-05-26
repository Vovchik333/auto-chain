import { API_PATH } from "@/config";
import { httpApi } from "../http";
import { StatisticsService } from "./statistics.service";

export const statsService = new StatisticsService({
  apiPath: API_PATH,
  httpApi: httpApi
});
