import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { SharedModule } from 'src/shared/shared.module';
import { Statistics, StatisticsSchema } from 'src/schemas/statistics.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Statistics.name, schema: StatisticsSchema }
    ]),
    SharedModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
