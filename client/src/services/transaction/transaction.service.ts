import { HttpApi, HttpMethod } from "../http";
import { ApiPath } from "@/common/enums/api/api-path.enum";
import { TransactionDto } from '@/common/types/transaction.dto';
import { FileResponse } from '@/common/types/file-response.type';
import { UserWalletAddressDto } from "@/common/types/user-wallet-address.dto";
import { TransactionFilterDto } from "@/common/types/transaction-filter.dto";

type Constructor = {
  apiPath: string;
  httpApi: HttpApi;
}

class TransactionService {
  #apiPath: string;
  #httpApi: HttpApi;

  constructor({ apiPath, httpApi }: Constructor) {
    this.#apiPath = apiPath;
    this.#httpApi = httpApi;
  }

  public async getByFilter(filter: TransactionFilterDto): Promise<TransactionDto[]> {
    return this.#httpApi.load<TransactionDto[]>(
      `${this.#apiPath}${ApiPath.TRANSACTIONS}`,
      {
        hasAuth: true,
        query: {
          ...filter
        }
      }
    );
  }

  public async getById(id: string): Promise<TransactionDto> {
    return this.#httpApi.load<TransactionDto>(
      `${this.#apiPath}${ApiPath.TRANSACTIONS}/${id}`,
      {
        hasAuth: true
      }
    );
  }

  public async importFromCsv(payload: FormData): Promise<TransactionDto[]> {
    return this.#httpApi.load<TransactionDto[]>(
      `${this.#apiPath}${ApiPath.TRANSACTIONS}${ApiPath.IMPORT_FROM_CSV}`,
      {
        method: HttpMethod.POST,
        payload: payload,
        hasAuth: true,
        contentType: null
      }
    );
  }

  public async exportToCsv(payload: UserWalletAddressDto): Promise<FileResponse> {
    return this.#httpApi.load<FileResponse>(
      `${this.#apiPath}${ApiPath.TRANSACTIONS}${ApiPath.EXPORT_TO_CSV}`,
      {
        method: HttpMethod.POST,
        payload: JSON.stringify(payload),
        hasAuth: true,
        expectsBlob: true
      }
    );
  }
}

export default TransactionService;
