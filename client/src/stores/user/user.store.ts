import { StorageKey } from "@/common/enums/storage-key.enum";
import { RegisteredUserRequestBody } from "@/common/types/user/registered-user-request-body.type";
import { UnregisteredUserRequestBody } from "@/common/types/user/unregistered-user-request-body.type";
import { authService } from "@/services/auth";
import { create } from "zustand";
import { UserState, UserStore } from "./types";

const initState: UserState = {
  user: null,
  isLoading: false,
  error: null
}

export const useUserStore = create<UserStore>((set) => ({
  ...initState,
  loadCurrentUser: async () => {
    set({ isLoading: true, error: null });

    try {
      const user = await authService.getCurrentUser();
      set({ user: user, isLoading: false })
    } catch (err: any) {
      set({ error: err.message ?? 'Unknown error', isLoading: false })
    }
  },
  signUp: async (payload: UnregisteredUserRequestBody) => {
    set({ isLoading: true, error: null });

    try {
      const { user, token } = await authService.signUp(payload);

      localStorage.setItem(StorageKey.TOKEN, token);

      set({ user: user, isLoading: false })
    } catch (err: any) {
      set({ error: err.message ?? 'Unknown error', isLoading: false })
    }
  },
  signIn: async (payload: RegisteredUserRequestBody) => {
    set({ isLoading: true, error: null });

    try {
      const { user, token } = await authService.signIn(payload);

      localStorage.setItem(StorageKey.TOKEN, token);

      set({ user: user, isLoading: false })
    } catch (err: any) {
      set({ error: err.message ?? 'Unknown error', isLoading: false })
    }
  },
  signOut: async () => {
    set({ isLoading: true, error: null });

    try {
      localStorage.removeItem(StorageKey.TOKEN);

      set({ user: null, isLoading: false })
    } catch (err: any) {
      set({ error: err.message ?? 'Unknown error', isLoading: false })
    }
  }
}))
