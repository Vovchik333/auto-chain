import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UserWithTokenDto } from 'src/common/types/user-with-token.dto';
import { HashService } from 'src/shared/hash/hash.service';
import { JwtService } from 'src/shared/jwt/jwt.service';
import { ErrorMessage } from 'src/common/enums/error-message/error-mesage.enum';
import { HttpStatusCode } from 'src/common/enums/http/http-status-code.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService
  ) {}

  async signUp(payload: SignUpUserDto): Promise<UserWithTokenDto> {
    const isUserExists = await this.userModel.findOne({email: payload.email}) !== null;

    if (isUserExists) {
      throw new HttpException(ErrorMessage.USER_WITH_EXISTING_EMAIL, HttpStatusCode.BAD_REQUEST);
    }

    payload.password = await this.hashService.hashData(payload.password);
    const user = await this.userModel.create(payload);

    return {
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        },
        token: this.jwtService.signJwt({ id: user._id })
    };
  }

  async signIn(payload: SignInUserDto): Promise<UserWithTokenDto | null>  {
    const user = await this.userModel.findOne({email: payload.email});

    const isMatch = this.hashService.compare(payload.password, user.password);

    if(!isMatch) {
      throw new HttpException(ErrorMessage.INCORRECT_PASSWORD, HttpStatusCode.BAD_REQUEST);
    }

    return {
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        },
        token: this.jwtService.signJwt({ id: user._id })
    };
  }
}
