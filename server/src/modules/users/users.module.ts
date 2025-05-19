import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
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
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
