import { User } from "./user.type";

type UnregisteredUserRequestBody = Omit<User, 'id' | 'isSyncWithBlockchain' | 'statisticsId'>;

export { type UnregisteredUserRequestBody };
