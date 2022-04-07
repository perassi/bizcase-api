import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'modules/users/services';

import { PasswordHasherService } from './passwordHasher.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly passwordHasher: PasswordHasherService,
  ) {}

  async validateUser(email: string, candidatePassword: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && this.passwordHasher.verify(candidatePassword, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = await this.getJwtPayload(user);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getJwtPayload(user: any) {
    return { userId: user.id, email: user.email, roles: ['client'] };
  }
}
