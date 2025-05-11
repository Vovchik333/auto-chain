import { User } from "./user.type";

type UnregisteredUserRequestBody = Omit<User, 'id' | 'isSyncWithBlockchain' | 'statistics'>;

export { type UnregisteredUserRequestBody };
