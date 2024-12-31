import { DynamicModule, Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTION_URI } from '../constants';
import { UserSchema } from './schemas/user.schema';
import { AuthModuleOptions } from './auth-module-options';

// @Module({
//   imports: [
//     MongooseModule.forRoot(MONGO_CONNECTION_URI),
//     MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
//   ],
//   controllers: [AuthController],
//   providers: [AuthService],
// })
// export class AuthModule {}
@Global()
@Module({})
export class AuthModule {
  static forRoot(options: AuthModuleOptions): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        MongooseModule.forRoot(options.mongoUri),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
      ],
      controllers: [AuthController],
      providers: [AuthService],
      exports: [AuthService],
    };
  }
}
