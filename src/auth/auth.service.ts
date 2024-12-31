import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './entities/create-user-dto.entity';
import { LoginUserDTO } from './entities/login-user-dto.entity';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // Create a user in the database
  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const createdUser = new this.userModel(createUserDTO);
    return createdUser.save();
  }

  // Login a user
  async loginUser(loginCredentials: LoginUserDTO): Promise<User> {
    const { email, password } = loginCredentials;
    return this.userModel.findOne({ email }).exec();
  }
}
