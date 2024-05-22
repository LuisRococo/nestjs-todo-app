import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from 'src/auth/dtos/signup.dto';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SignInDto } from 'src/auth/dtos/signIn.dto';

@Injectable()
export class AuthService {
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
