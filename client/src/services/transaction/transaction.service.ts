import { HttpApi, HttpMethod } from "../http";
import { ApiPath } from "@/common/enums/api/api-path.enum";
import { TransactionDto } from '@/common/types/transaction/transaction.dto';
import { FileResponse } from '@/common/types/file-response.type';
import { UserWalletAddressDto } from "@/common/types/user-wallet-address.dto";
import { TransactionFilterDto } from "@/common/types/transaction/transaction-filter.dto";
import { CreateTxDto } from "@/common/types/transaction/create-tx.dto";

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

  public async create(payload: CreateTxDto): Promise<TransactionDto> {
    return this.#httpApi.load<TransactionDto>(
      `${this.#apiPath}${ApiPath.TRANSACTIONS}`,
      {
        method: HttpMethod.POST,
        payload: JSON.stringify(payload),
        hasAuth: true,
      }
    );
  }

  public async getByFilter(filter: TransactionFilterDto): Promise<TransactionDto[]> {
    return this.#httpApi.load<TransactionDto[]>(
      `${this.#apiPath}${ApiPath.TRANSACTIONS}`,
      {
        hasAuth: true,
        query: filter
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

  public async exportToCsv(filter: TransactionFilterDto): Promise<FileResponse> {
    return this.#httpApi.load<FileResponse>(
      `${this.#apiPath}${ApiPath.TRANSACTIONS}${ApiPath.EXPORT_TO_CSV}`,
      {
        query: filter,
        hasAuth: true,
        expectsBlob: true
      }
    );
  }

  public async update(id: string, payload: Partial<CreateTxDto>): Promise<TransactionDto> {
    return this.#httpApi.load<TransactionDto>(
      `${this.#apiPath}${ApiPath.TRANSACTIONS}/${id}`,
      {
        method: HttpMethod.PATCH,
        payload: JSON.stringify(payload),
        hasAuth: true,
      }
    );
  }

  public async delete(id: string): Promise<void> {
    return this.#httpApi.load<void>(
      `${this.#apiPath}${ApiPath.TRANSACTIONS}/${id}`,
      {
        method: HttpMethod.DELETE,
        hasAuth: true,
      }
    );
  }
}

export default TransactionService;
