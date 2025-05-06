import { HttpCode, HttpHeader, HttpMethod } from "./enums";
import { HttpError } from "./errors";
import HttpApi from "./http-api.service";

const httpApi = new HttpApi();

export { httpApi };
export { HttpApi };
export {
    HttpCode, HttpHeader, HttpMethod, HttpError
};
