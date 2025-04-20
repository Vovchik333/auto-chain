import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './shared/shared.module';
import { readFileSync } from 'fs';
import { CheckUserAddressModule } from './modules/check-user-address/check-user-address.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => ({
          ETHERSCAN_API_KEY: readFileSync('.etherscan').toString().trim()
        })
      ]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('DB_HOST');
        const port = configService.get<number>('DB_PORT');
        const name = configService.get<string>('DB_NAME');
        const type = configService.get<string>('DB_TYPE');

        const uri = `${type}://${host}:${port}/${name}`;

        return {
          uri
        }
      }
    }),
    UsersModule, 
    AuthModule, 
    CheckUserAddressModule,
    SharedModule, 
  ],
  controllers: [],
})
export class AppModule {}
