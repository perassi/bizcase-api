import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from 'modules/users/services';
import { UserCreationInput } from 'modules/users/dto';

import { AuthService } from '../services';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  async signup(@Body() data: UserCreationInput) {
    return this.userService.create(data);
  }
}
