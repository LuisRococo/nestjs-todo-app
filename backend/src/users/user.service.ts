import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dtos/signup.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
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
}
