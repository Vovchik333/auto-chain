'use client';

import { StorageKey } from "@/common/enums/storage-key.enum";
import { useUserStore } from "@/stores/user/user.store";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export const ClientProvider: React.FC<Props> = ({ children }) => {
  const { user, loadCurrentUser } = useUserStore();

  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(StorageKey.TOKEN);
    setHasToken(Boolean(token));
  }, []);

  useEffect(() => {
    if (hasToken && user === null) {
      loadCurrentUser();
    }
  }, [hasToken, user]);

  if (hasToken && user === null) {
    return null;
  }

  return children;
};