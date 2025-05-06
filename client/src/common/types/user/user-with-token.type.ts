import { User } from "./user.type";

type UserWithToken = {
    user: User;
    token: string;
};

export { type UserWithToken };