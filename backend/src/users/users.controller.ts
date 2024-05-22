import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignUpDto } from './dtos/signup.dto';
import { UserService } from './user.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() user: SignUpDto) {
    return this.userService.signUp(user);
  }
}
