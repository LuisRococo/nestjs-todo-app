import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { SignInDto } from 'src/auth/dtos/signIn.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/auth/dtos/signup.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() user: SignUpDto) {
    return this.authService.signUp(user);
  }

  @Post('/signin')
  @HttpCode(200)
  signIn(@Body() data: SignInDto) {
    return this.authService.signIn(data);
  }

  @Get('/current-user')
  @HttpCode(200)
  getCurrentUser(@Headers('Authorization') token: string) {
    return this.authService.getCurrentUser(token);
  }
}
