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
  Session,
} from '@nestjs/common';
import CreateUserDto from './dtos/create-user.dto';
import { UsersService } from './users.service';
import UpdateUserDto from './dtos/update-user.dto';

import UserDto from './dtos/user.dto';
import UseSerializeInterceptor from '../interceptors/serialize.interceptor';
import AuthService from './auth.service';

@Controller('auth')
@UseSerializeInterceptor(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // GET http://localhost:3000/auth/getCurrentUser
  @Get('/getCurrentUser')
  getCurrentUser(@Session() session: any) {
    return this.usersService.findOneBy(session.userId);
  }

  @Post('/signout')
  signout(@Session() session: any) {
    session.userId = null;
  }

  // POST http://localhost:3000/auth/signup
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  // POST http://localhost:3000/auth/signin
  @Post('/signin')
  async signIn(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
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
