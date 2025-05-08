import { HttpApi, HttpMethod } from "../http";
import { ApiPath } from "@/common/enums/api/api-path.enum";
import { WalletAddressDto } from '@/common/types/wallet-address.dto';
import { TransactionDto } from '@/common/types/transaction.dto';
import { FileResponse } from '@/common/types/file-response.type';

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

  public async getTransactions(ownerAddress: string): Promise<TransactionDto[]> {
    return this.#httpApi.load<TransactionDto[]>(
      `${this.#apiPath}${ApiPath.WALLETS}/${ownerAddress}`,
      {
        hasAuth: true
      }
    );
  }

  public async importFromCsv(payload: FormData): Promise<TransactionDto[]> {
    return this.#httpApi.load<TransactionDto[]>(
      `${this.#apiPath}${ApiPath.WALLETS}${ApiPath.IMPORT_FROM_CSV}`,
      {
        method: HttpMethod.POST,
        payload: payload,
        hasAuth: true,
        contentType: null
      }
    );
  }

  public async importFromEtherscan(payload: WalletAddressDto): Promise<TransactionDto[]> {
    return this.#httpApi.load<TransactionDto[]>(
      `${this.#apiPath}${ApiPath.WALLETS}${ApiPath.IMPORT_FROM_ETHERSCAN}`,
      {
        method: HttpMethod.POST,
        payload: JSON.stringify(payload),
        hasAuth: true
      }
    );
  }

  public async exportToCsv(payload: WalletAddressDto): Promise<FileResponse> {
    return this.#httpApi.load<FileResponse>(
      `${this.#apiPath}${ApiPath.WALLETS}${ApiPath.EXPORT_TO_CSV}`,
      {
        method: HttpMethod.POST,
        payload: JSON.stringify(payload),
        hasAuth: true,
        expectsBlob: true
      }
    );
  }
}

export default WalletService;
