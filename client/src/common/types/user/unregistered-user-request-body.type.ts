import { User } from "./user.type";

type UnregisteredUserRequestBody = Omit<User, 'id'>;

export { type UnregisteredUserRequestBody };
