import { User } from "./user.type";

type RegisteredUserRequestBody = Omit<User, 'id' | 'nickname' | 'isSyncWithBlockchain' | 'statisticsId'>;

export { type RegisteredUserRequestBody };
