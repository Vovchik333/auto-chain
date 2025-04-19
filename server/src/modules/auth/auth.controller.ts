import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiPath } from 'src/common/enums/api/api-path.enum';
import { HttpStatusCode } from 'src/common/enums/http/http-status-code.enum';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';

@Controller(ApiPath.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(ApiPath.SIGN_UP)
  @HttpCode(HttpStatusCode.CREATED)
  async signUp(
    @Body() payload: SignUpUserDto
  ) {
    const userWithToken = this.authService.signUp(payload);

    return userWithToken;
  }

  @Post(ApiPath.SIGN_IN)
  async signIn(
    @Body() payload: SignInUserDto
  ) {
    const userWithToken = this.authService.signIn(payload);

    return userWithToken;
  }
}
