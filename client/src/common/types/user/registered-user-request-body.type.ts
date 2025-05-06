import { User } from "./user.type";

type RegisteredUserRequestBody = Omit<User, 'id' | 'nickname'>;

export { type RegisteredUserRequestBody };
