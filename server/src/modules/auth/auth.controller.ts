import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiPath } from 'src/common/enums/api/api-path.enum';
import { HttpStatusCode } from 'src/common/enums/http/http-status-code.enum';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';

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

  @Get(ApiPath.USER)
  @UseGuards(AuthGuard)
  async getCurrentUser(
    @Req() request: App.Request
  ) {
    const userWithToken = this.authService.getCurrentUser(request.user.id);

    return userWithToken;
  }
}
