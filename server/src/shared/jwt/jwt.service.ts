import { HttpException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { HttpStatusCode } from "src/common/enums/http/http-status-code.enum";

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  public signJwt(payload: string | object | Buffer): string {
    return sign(payload, this.configService.get<string>('JWT_SECRET'));
  }

  public verifyJwt(token: string): string | JwtPayload {
    try {
      return verify(token, this.configService.get<string>('JWT_SECRET'));
    } catch (err) {
      throw new HttpException('Not Authorized', HttpStatusCode.UNAUTHORIZED);
    }
  }
}
