import { Body, Controller, Delete, Get, HttpCode, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiPath } from 'src/common/enums/api/api-path.enum';
import { UsersService } from './users.service';
import { HttpStatusCode } from 'src/common/enums/http/http-status-code.enum';
import { UserDto } from 'src/common/types/user.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller(ApiPath.USERS)
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {};

  @Get(ApiPath.ID)
  async getById(
    @Param('id') id: string
  ): Promise<UserDto> {
    const user = await this.usersService.getById(id);

    return {
      id: user._id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  @Patch(ApiPath.ID)
  async updateById(
    @Param('id') id: string,
    @Body() payload: object
  ): Promise<UserDto> {
    const user = await this.usersService.updateById(id, payload);

    return {
      id: user._id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  @Delete(ApiPath.ID)
  @HttpCode(HttpStatusCode.NO_CONTENT)
  async deleteById(
    @Param('id') id: string
  ): Promise<void> {
    this.usersService.deleteById(id);
  }
}
