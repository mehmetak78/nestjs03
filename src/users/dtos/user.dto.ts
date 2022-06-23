import { Expose, Exclude } from 'class-transformer';

export default class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}
