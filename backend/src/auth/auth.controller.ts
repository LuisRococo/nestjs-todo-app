import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SignInDto } from 'src/auth/dtos/signIn.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/auth/dtos/signup.dto';
import { AuthGuard } from './auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() user: SignUpDto) {
    return this.authService.signUp(user);
  }

  @Post('/signin')
  @HttpCode(200)
  async signIn(@Body() data: SignInDto) {
    return this.authService.signIn(data);
  }

  @UseGuards(AuthGuard)
  @Get('/current-user')
  @HttpCode(200)
  async getCurrentUser(@Headers('Authorization') token: string) {
    return this.authService.getCurrentUser(token);
  }
}
