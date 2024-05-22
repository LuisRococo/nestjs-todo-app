import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignUpDto } from './dtos/signup.dto';
import { UserService } from './user.service';
import { SignInDto } from './dtos/signIn.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() user: SignUpDto) {
    return this.userService.signUp(user);
  }

  @Post('/signin')
  signIn(@Body() data: SignInDto) {
    return this.userService.signIn(data);
  }
}
