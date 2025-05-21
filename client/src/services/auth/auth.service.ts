import { User } from '@/common/types/user/user.type';
import { UserWithToken } from "@/common/types/user/user-with-token.type";
import { HttpApi, HttpMethod } from "../http";
import { ApiPath } from "@/common/enums/api/api-path.enum";
import { UnregisteredUserRequestBody } from '@/common/types/user/unregistered-user-request-body.type';
import { RegisteredUserRequestBody } from '@/common/types/user/registered-user-request-body.type';
import { UpdateProfileData } from '@/stores/user/types';

type Constructor = {
  apiPath: string;
  httpApi: HttpApi;
}

class AuthService {
  #apiPath: string;
  #httpApi: HttpApi;

  constructor({ apiPath, httpApi }: Constructor) {
    this.#apiPath = apiPath;
    this.#httpApi = httpApi;
  }

  public async signUp(payload: UnregisteredUserRequestBody): Promise<UserWithToken> {
    return this.#httpApi.load<UserWithToken>(
      `${this.#apiPath}${ApiPath.AUTH}${ApiPath.SIGN_UP}`,
      {
        method: HttpMethod.POST,
        payload: JSON.stringify(payload),
      }
    );
  }

  public async signIn(payload: RegisteredUserRequestBody): Promise<UserWithToken> {
    return this.#httpApi.load<UserWithToken>(
      `${this.#apiPath}${ApiPath.AUTH}${ApiPath.SIGN_IN}`,
      {
        method: HttpMethod.POST,
        payload: JSON.stringify(payload),
      }
    );
  }

  public async getCurrentUser(): Promise<User> {
    return this.#httpApi.load<User>(
      `${this.#apiPath}${ApiPath.AUTH}${ApiPath.USER}`,
      {
        hasAuth: true
      }
    );
  }

  public async updateProfile(data: UpdateProfileData): Promise<User> {
    return this.#httpApi.load<User>(
      `${this.#apiPath}${ApiPath.AUTH}${ApiPath.USER}`,
      {
        method: HttpMethod.PUT,
        payload: JSON.stringify(data),
        hasAuth: true
      }
    );
  }
}

export default AuthService;
