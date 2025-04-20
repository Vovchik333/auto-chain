import { IsString, Length } from "class-validator";
import { SignInUserDto } from "./sign-in-user.dto";

export class SignUpUserDto extends SignInUserDto {
  @IsString()
  @Length(3, 30, { message: 'Username must be between 3 and 30 characters' })
  public username: string;
}
