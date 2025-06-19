import { ApiPath } from "@/common/enums/api/api-path.enum";
import { HttpApi } from "../http";
import { StatisticsDto } from "@/common/types/stats/statistics.dto";
import { StatsFilterDto } from "@/common/types/stats/stats-filter.dto";

type Constructor = {
  apiPath: string;
  httpApi: HttpApi;
}

class StatisticsService {
  #apiPath: string;
  #httpApi: HttpApi;

  constructor({ apiPath, httpApi }: Constructor) {
    this.#apiPath = apiPath;
    this.#httpApi = httpApi;
  }

  public async getStatsByFilter(filter: StatsFilterDto): Promise<StatisticsDto> {
    return this.#httpApi.load<StatisticsDto>(
      `${this.#apiPath}${ApiPath.STATISTICS}`,
      {
        hasAuth: true,
        query: filter
      }
    );
  }
}

export { StatisticsService }; 