import AuthService from './auth.service';
import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import User from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    fakeUsersService = {
      findBy: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();
    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('asdf@asdf.com', 'asdf');
    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user isgns up with email that is in user', async () => {
    fakeUsersService.findBy = () =>
      Promise.resolve([{ id: 1, email: 'a', password: 'a' } as User]);
    await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throws if signin is called with an unused email', async () => {
    await expect(service.signin('asdf@asdf.com', 'asdf')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('throws if an invalid password is provided', async () => {
    fakeUsersService.findBy = () =>
      Promise.resolve([{ id: 1, email: 'a', password: 'a' } as User]);
    await expect(service.signin('asdf@asdf.com', 'asdf')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('returns a user if correct password is provided.', async () => {
    fakeUsersService.findBy = () =>
      Promise.resolve([
        {
          id: 1,
          email: 'a',
          password:
            '7e8f2f3341279371.d8bdf3ea11a499ce8dbe8a83e3129f5c214b703e77559f9442e4c330906e9d59',
        } as User,
      ]);
    const user = await service.signin('asdf@asdf.com', 'asdf');
    expect(user).toBeDefined();
  });

});
