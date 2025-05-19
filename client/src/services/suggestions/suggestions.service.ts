import { HttpApi, HttpMethod } from "../http";
import { ApiPath } from "@/common/enums/api/api-path.enum";
import { DiversificationDto } from "@/common/types/diversification.dto";
import { TransferInstruction } from "@/common/types/transfer-instruction.dto";

type Constructor = {
  apiPath: string;
  httpApi: HttpApi;
}

class SuggestionsService {
  #apiPath: string;
  #httpApi: HttpApi;

  constructor({ apiPath, httpApi }: Constructor) {
    this.#apiPath = apiPath;
    this.#httpApi = httpApi;
  }

  public async getDiversification(walletIds: string[]): Promise<DiversificationDto> {
    return this.#httpApi.load<DiversificationDto>(
      `${this.#apiPath}${ApiPath.WALLETS}${ApiPath.DIVERSIFICATION}`,
      {
        method: HttpMethod.POST,
        hasAuth: true,
        payload: JSON.stringify(walletIds)
      }
    );
  }
}

export default SuggestionsService;
