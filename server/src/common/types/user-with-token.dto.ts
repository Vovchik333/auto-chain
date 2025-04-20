import { UserDto } from "./user.dto";

type UserWithTokenDto = {
  user: UserDto;
  token: string;
}

export { type UserWithTokenDto };
