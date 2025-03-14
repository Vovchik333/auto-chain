import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiPath } from 'src/common/enums/api/api-path.enum';
import { HttpStatusCode } from 'src/common/enums/http/http-status-code.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(ApiPath.SIGN_UP)
  @HttpCode(HttpStatusCode.CREATED)
  signUp(@Body() payload: object) {
    const userWithToken = this.authService.signUp(payload);

    return userWithToken;
  }

  @Post(ApiPath.SIGN_IN)
  signIn(@Body() payload: object) {
    const userWithToken = this.authService.signIn(payload);

    return userWithToken;
  }
}
