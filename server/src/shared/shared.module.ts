import { Module } from '@nestjs/common';
import { HashService } from './hash/hash.service';
import { JwtService } from './jwt/jwt.service';

@Module({
  providers: [HashService, JwtService],
  exports: [HashService, JwtService]
})
export class SharedModule {}
