import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiPath } from 'src/common/enums/api/api-path.enum';
import { UsersService } from './users.service';

@Controller(ApiPath.USERS)
export class UsersController {
  constructor(private readonly usersService: UsersService) {};

  @Get(ApiPath.ID)
  async getById(
    @Param(':id') id: string,

  ): Promise<void> {
      const user = this.usersService.getById(id);

      return user;
  }

  @Patch(ApiPath.ID)
  async updateById(
    @Param(':id') id: string,
    @Body() payload: object
  ): Promise<void> {
    const user = this.usersService.updateById(id, payload);

    return user
  }

  @Delete(ApiPath.ID)
  async deleteById(
    @Param(':id') id: string
  ): Promise<void> {
    const user = this.usersService.deleteById(id);

    return user;
  }

}
