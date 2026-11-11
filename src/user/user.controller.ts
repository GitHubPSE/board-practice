import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dto/sign-up.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { LoginDto } from './dto/login.dto';
import type { Response } from 'express';

@Controller('users')
export class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  @Post('signup')
  async add(@Body() dto: SignUpDto): Promise<UserResponseDto> {
    return this.userService.signUp(dto);
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    const { accessToken } = await this.userService.login(dto);
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000,
    });
    return { message: '로그인 성공' };
  }
}
