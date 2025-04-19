import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async getById(id: string): Promise<User | null> {
    return this.userModel
      .findById(id)
      .exec();
  }

  async updateById(id: string, payload: Partial<User>): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(
        id,
        payload,
        {new: true}
      )
      .exec();
  }

  async deleteById(id: string): Promise<User | null> {
    return this.userModel
      .findByIdAndDelete(id)
      .exec();
  }
}
