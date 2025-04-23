import { Controller, Get, Param } from '@nestjs/common';
import { ApiPath } from 'src/common/enums/api/api-path.enum';
import { CheckUserAddressService } from './check-user-address.service';
import { ReportItemDto } from './dto/report-item.dto';
import { EthAddressPipe } from 'src/pipes/eth-address.pipe';

@Controller(ApiPath.CHECK_USER_ADDRESS)
export class CheckUserAddressController {
  constructor(private readonly checkUserAddressService: CheckUserAddressService) {}

  @Get(':address')
  async checkUserAddress(
    @Param('address', EthAddressPipe) address: string
  ): Promise<ReportItemDto[]> {
    const report = await this.checkUserAddressService.checkUserAddress(address);

    return report;
  }
}
