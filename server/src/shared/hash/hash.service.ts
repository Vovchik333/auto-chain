import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { compareSync, hash, genSalt } from "bcrypt";

@Injectable()
export class HashService {
  constructor(private readonly configService: ConfigService) {}

  public async hashData(data: string): Promise<string> {
    const salt = await genSalt(this.configService.get<number>('CRYPTO_SALT'));
    return await hash(data, salt);
  }

  public compare(data: string, encryptedData: string): boolean {
    return compareSync(data, encryptedData);
  }
}
