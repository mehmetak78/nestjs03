import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export default class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    const users = await this.usersService.findBy(email);
    if (users.length) {
      throw new BadRequestException('Email in use');
    }

  }

  signin() {}
}
