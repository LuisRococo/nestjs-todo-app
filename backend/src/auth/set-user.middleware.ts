import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UserService } from 'src/users/user.service';

@Injectable()
export class SetUserMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const tokenHeader = req.get('Authorization');

    if (tokenHeader) {
      const token = tokenHeader.split(' ')[1];
      const payload = this.authService.getJwtTokenPayload(token);
      const foundUser = await this.userService.findOne(payload.id);

      if (!foundUser) {
        throw new HttpException(
          'User does not exists',
          HttpStatus.UNAUTHORIZED,
        );
      }

      req['user'] = foundUser;
    }

    next();
  }
}
