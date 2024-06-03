import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async getUser(@Param('id') userId: number) {
    return this.userService.findOne(userId);
  }
}
