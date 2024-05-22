import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dtos/signup.dto';
import { Repository } from 'typeorm';
import { SignInDto } from './dtos/signIn.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: SignUpDto) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);

    const newUser = await this.userRepository.save({
      ...user,
      password: hash,
    });

    return newUser;
  }

  async signIn(user: SignInDto) {
    const foundUser = await this.userRepository.findOneBy({
      email: user.email,
    });

    if (foundUser) {
      const { password, id } = foundUser;
      if (bcrypt.compare(user.password, password)) {
        const payload = { id };

        return {
          token: this.jwtService.sign(payload),
        };
      }
      return new HttpException(
        'Incorrect username or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return new HttpException(
      'Incorrect username or password',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
