import { RegisteredUserRequestBody } from "@/common/types/user/registered-user-request-body.type";
import { UnregisteredUserRequestBody } from "@/common/types/user/unregistered-user-request-body.type";
import { User } from "@/common/types/user/user.type";

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export type AuthActions = {
  loadCurrentUser: () => Promise<void>;
  signUp: (payload: UnregisteredUserRequestBody) => Promise<void>;
  signIn: (payload: RegisteredUserRequestBody) => Promise<void>;
  signOut: () => Promise<void>;
}

export type AuthStore = AuthState & AuthActions;
