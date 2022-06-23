import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import CreateUserDto from './dtos/create-user.dto';
import { UsersService } from './users.service';
import UpdateUserDto from './dtos/update-user.dto';

import UserDto from './dtos/user.dto';
import UseSerializeInterceptor from '../interceptors/serialize.interceptor';

@Controller('auth')
@UseSerializeInterceptor(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

  // POST http://localhost:3000/auth/signup
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
  }

  // GET http://localhost:3000/auth/1
  // @UseSerializeInterceptor(UserDto) (Can be applied in method level)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOneBy(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  // GET http://localhost:3000/auth?email=mehmet@mehmet.com
  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.findBy(email);
  }

  // DELETE http://localhost:3000/auth/2
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  // PATCH http://localhost:3000/auth/2
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
