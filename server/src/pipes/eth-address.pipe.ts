import {
  PipeTransform,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class EthAddressPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    try {
      return ethers.getAddress(value);
    } catch {
      throw new BadRequestException('Invalid Ethereum address');
    }
  }
}