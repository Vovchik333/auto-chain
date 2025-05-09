import { HttpApi, HttpMethod } from "../http";
import { ApiPath } from "@/common/enums/api/api-path.enum";
import { UserWalletAddressDto } from '@/common/types/user-wallet-address.dto';
import { TransactionDto } from '@/common/types/transaction.dto';
import { WalletDto } from "@/common/types/wallet.dto";
import { WalletFilterDto } from "@/common/types/wallet-filter.dto";

type Constructor = {
  apiPath: string;
  httpApi: HttpApi;
}

class WalletService {
  #apiPath: string;
  #httpApi: HttpApi;

  constructor({ apiPath, httpApi }: Constructor) {
    this.#apiPath = apiPath;
    this.#httpApi = httpApi;
  }

  public async getByFilter(filter: WalletFilterDto): Promise<WalletDto[]> {
    return this.#httpApi.load<WalletDto[]>(
      `${this.#apiPath}${ApiPath.WALLETS}`,
      {
        hasAuth: true,
        query: {
          ...filter
        }
      }
    );
  }

  public async importFromEtherscan(payload: UserWalletAddressDto): Promise<WalletDto[]> {
    return this.#httpApi.load<WalletDto[]>(
      `${this.#apiPath}${ApiPath.WALLETS}${ApiPath.IMPORT_FROM_ETHERSCAN}`,
      {
        method: HttpMethod.POST,
        payload: JSON.stringify(payload),
        hasAuth: true
      }
    );
  }
}

export default WalletService;
