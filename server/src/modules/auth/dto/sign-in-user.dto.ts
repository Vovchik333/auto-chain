import { IsEmail, IsString, Length } from "class-validator";

export class SignInUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @Length(8, 50, { message: 'Password must be between 8 and 50 characters' })
  public password: string;
}
