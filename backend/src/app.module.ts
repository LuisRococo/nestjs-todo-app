import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { Task } from './tasks/task.identity';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.getOrThrow('DB_HOST'),
          port: configService.getOrThrow('DB_PORT'),
          username: configService.getOrThrow('DB_USER'),
          password: configService.getOrThrow('DB_PASSWORD'),
          database: configService.getOrThrow('DB_NAME'),
          entities: [User, Task],
          synchronize: true,
        };
      },
    }),
    JwtModule.register({
      secretOrPrivateKey: process.env.SECRET,
      global: true,
      signOptions: { expiresIn: '7d' },
    }),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
