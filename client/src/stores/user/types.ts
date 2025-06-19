import { RegisteredUserRequestBody } from "@/common/types/user/registered-user-request-body.type";
import { UnregisteredUserRequestBody } from "@/common/types/user/unregistered-user-request-body.type";
import { User } from "@/common/types/user/user.type";

export type UserState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export type UpdateProfileData = {
  email: string;
  username: string;
  currentPassword?: string;
  newPassword?: string;
}

export type UserActions = {
  resetError: () => void;
  loadCurrentUser: () => Promise<void>;
  signUp: (payload: UnregisteredUserRequestBody) => Promise<void>;
  signIn: (payload: RegisteredUserRequestBody) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
}

export type UserStore = UserState & UserActions;
