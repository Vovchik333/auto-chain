import { User } from "./user.type";

type RegisteredUserRequestBody = Omit<User, 'id' | 'nickname' | 'isSyncWithBlockchain' | 'statistics'>;

export { type RegisteredUserRequestBody };
