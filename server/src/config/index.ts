import { EnvironmentType } from "src/common/enums/environment/environment-type.enum";
import { DevelopmentConfig } from "./config.type";
import { developmentConfig } from "./envs/development";

let config: DevelopmentConfig;
const environment = process.env.NODE_ENV;

switch(environment) {
  case EnvironmentType.DEVELOP:
    config = developmentConfig;
    break;
  default:
    config = developmentConfig;
}

export { config };