import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { Task } from './tasks/task.identity';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number.parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Task],
      synchronize: true,
    }),
    JwtModule.register({
      secretOrPrivateKey: process.env.SECRET,
      global: true,
      signOptions: { expiresIn: '7d' },
    }),
    UsersModule,
    AuthModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
