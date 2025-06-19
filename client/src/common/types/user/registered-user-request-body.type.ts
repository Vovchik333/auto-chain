import { User } from "./user.type";

type RegisteredUserRequestBody = Omit<User, 'id' | 'username'>;

export { type RegisteredUserRequestBody };
