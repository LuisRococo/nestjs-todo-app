import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { UserService } from 'src/users/user.service';
import { SetUserMiddleware } from './set-user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersModule],
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SetUserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
