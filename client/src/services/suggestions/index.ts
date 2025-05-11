import { API_PATH } from "@/config";
import { httpApi } from "../http";
import SuggestionsService from "./suggestions.service";

export const suggestionsService = new SuggestionsService({
  apiPath: API_PATH,
  httpApi: httpApi
});
