import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { v4 } from 'uuid';
import { UsersDtop as UsersDto } from './UsersDto';

@Injectable()
export class UsersService {
  private readonly users: UsersDto[] = [];
  create(newUser: UsersDto) {
    if (this.users.find((u) => u.username === newUser.username)) {
      throw new HttpException(
        'Algo errado, tente outros username e password',
        HttpStatus.CONFLICT,
      );
    }
    newUser.id = v4();
    newUser.password = hashSync(newUser.password, 10);
    this.users.push(newUser);
  }
  findByUserName(username: string): UsersDto | null {
    return this.users.find((u) => u.username === username)|| null;
  }
}
