import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDto } from './AuthResponseDto';

@Injectable()
export class AuthService {
  private jwrExpiration: number;

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwrExpiration =
      configService.get<number>('JWT_EXPIRATION_TIME') ?? 86400;
  }
  async singIn(username: string, password: string): Promise<AuthResponseDto> {
    const foundUser = await this.userService.findByUserName(username);    
    
    if (!foundUser || !compareSync(password, foundUser.password)) {
      throw new UnauthorizedException();
    }

    const peyload = {
      sub: foundUser.id,
      username: foundUser.username,
    };

    const token = this.jwtService.sign(peyload);
    
    return {
      token: token,
      expiresIn: this.jwrExpiration,
    };
  }
}
