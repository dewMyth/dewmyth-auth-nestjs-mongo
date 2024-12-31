import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './entities/create-user-dto.entity';
import { User } from './schemas/user.schema';
import { LoginUserDTO } from './entities/login-user-dto.entity';
import { LoginUserResponse } from './types/login-user-response.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Create the user
  @Post('create')
  async createUser(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return this.authService.createUser(createUserDTO);
  }

  // Login the user
  @Post('login')
  async loginUser(
    @Body() loginCredentials: LoginUserDTO,
  ): Promise<LoginUserResponse> {
    return this.authService.loginUser(loginCredentials, 'mySecret', '1d');
  }
}
