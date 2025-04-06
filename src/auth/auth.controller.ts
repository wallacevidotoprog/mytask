import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthResponseDto } from './AuthResponseDto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async singIn(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res({passthrough:true}) res:Response
  ): Promise<AuthResponseDto> {
    const respAuth =  await this.service.singIn(username, password);

    res.cookie('Authorization', respAuth.token, {
      httpOnly: true,     
      maxAge: respAuth.expiresIn * 1000, 
      sameSite: 'lax', 
    });

    return respAuth;
  }
}
