import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async getById(id: string): Promise<User> {
    const user = await this.userModel
      .findById(id)
      .exec();

    if (user === null) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateById(id: string, payload: Partial<User>): Promise<User> {
    const user = await this.userModel
      .findByIdAndUpdate(
        id,
        payload,
        {new: true}
      )
      .exec();
    
    if (user === null) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async deleteById(id: string): Promise<User | null> {
    const user = await this.userModel
      .findByIdAndDelete(id)
      .exec();
    
    if (user === null) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
