import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync } from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { UsersDtop as UsersDto } from './UsersDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepositoy: Repository<UserEntity>,
  ) {}
  private readonly users: UsersDto[] = [];
  async create(newUser: UsersDto) {
    if (await this.findByUserName(newUser.username)) {
      throw new ConflictException('User username exist');
    }
    const dbUser = new UserEntity();
    dbUser.id = v4();
    dbUser.username = newUser.username;
    dbUser.passwordHash = hashSync(newUser.password, 10);

    const { id, username } = await this.userRepositoy.save(dbUser);
    return { id, username };
  }
  async findByUserName(username: string): Promise<UsersDto | null> {
    const userFound = await this.userRepositoy.findOne({
      where: { username },
    });

    if (!userFound) {
      return null;
    }

    const userDto = plainToInstance(UsersDto, userFound);
    userDto.password = userFound.passwordHash;
    return userDto;
    return userFound ? plainToInstance(UsersDto, userFound) : null;
  }
}
