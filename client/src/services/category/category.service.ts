import { HttpApi } from "../http";
import { ApiPath } from "@/common/enums/api/api-path.enum";
import { Category, DEFAULT_CATEGORIES } from "@/common/types/category";

type Constructor = {
  apiPath: string;
  httpApi: HttpApi;
}

class CategoryService {
  #apiPath: string;
  #httpApi: HttpApi;

  constructor({ apiPath, httpApi }: Constructor) {
    this.#apiPath = apiPath;
    this.#httpApi = httpApi;
  }

  public async getCategories(): Promise<Category[]> {
    try {
      return await this.#httpApi.load<Category[]>(
        `${this.#apiPath}${ApiPath.CATEGORIES}`,
        {
          hasAuth: true
        }
      );
    } catch (error) {
      // Fallback to default categories if API fails
      return DEFAULT_CATEGORIES;
    }
  }
}

export { CategoryService }; 