import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './entities/create-user-dto.entity';
import { LoginUserDTO } from './entities/login-user-dto.entity';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as brcypt from 'bcrypt';
import { LoginUserResponse } from './types/login-user-response.type';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // Create a user in the database
  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const { password } = createUserDTO;

    // Hash the password
    const hashedPassword = await brcypt.hash(password, 10);

    // Final payload
    const newUserPayload: CreateUserDTO = {
      ...createUserDTO,
      password: hashedPassword,
    };

    const createdUser = new this.userModel(newUserPayload);

    if (!createdUser) {
      throw new Error('User not created');
    }

    return createdUser.save();
  }

  // Login a user
  async loginUser(
    loginCredentials: LoginUserDTO,
    secret?: string,
    tokenTTL?: string, // 1h, 1d, 1w, 1m, 1y
  ): Promise<LoginUserResponse> {
    const { email, password } = loginCredentials;

    // Find the user by email
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new Error('User not found');
    }

    // Compare the password
    const isPasswordMatch = await brcypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new Error('Invalid credentials');
    }

    // Generate the token
    let secretKey = secret ? secret : 'secret';
    const token = jwt.sign({ email: user.email }, secretKey, {
      expiresIn: tokenTTL ? tokenTTL : '1h',
    });

    return {
      email: user.email,
      token,
      tokenTTL: tokenTTL ? tokenTTL : `3600 ms`,
    };
  }
}
