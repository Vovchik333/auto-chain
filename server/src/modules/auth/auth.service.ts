import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
import { mapUserFromDb } from '../common/helpers/map-user.helper';
import { Statistics, StatisticsDocument } from 'src/schemas/statistics.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Statistics.name) private readonly statisticsModel: Model<StatisticsDocument>,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService
  ) {}

  async signUp(payload: SignUpUserDto): Promise<UserWithTokenDto> {
    const isUserExists = await this.userModel.findOne({email: payload.email}) !== null;

    if (isUserExists) {
      throw new HttpException(ErrorMessage.USER_WITH_EXISTING_EMAIL, HttpStatusCode.BAD_REQUEST);
    }

    payload.password = await this.hashService.hashData(payload.password);
    const statistics = await this.statisticsModel.create({});
    const user = await this.userModel.create({...payload, statistics});
    console.log(user.toJSON());

    return {
        user: mapUserFromDb(user),
        token: this.jwtService.signJwt({ id: user._id })
    };
  }

  async signIn(payload: SignInUserDto): Promise<UserWithTokenDto | null>  {
    const user = await this.userModel.findOne({email: payload.email});

    if (user === null) {
      throw new NotFoundException(`User with ${payload.email} email not found`);
    }

    const isMatch = this.hashService.compare(payload.password, user.password);

    if(!isMatch) {
      throw new HttpException(ErrorMessage.INCORRECT_PASSWORD, HttpStatusCode.BAD_REQUEST);
    }

    return {
      user: mapUserFromDb(user),
      token: this.jwtService.signJwt({ id: user._id })
    };
  }

  async getCurrentUser(id: string) {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return mapUserFromDb(user);
  }
}
