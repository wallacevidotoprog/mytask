import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDtop } from './UsersDto';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  create(@Body() user: UsersDtop) {
    this.service.create(user);
  }
}
