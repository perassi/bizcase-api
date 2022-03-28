import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from 'modules/users';

import { AuthController } from './controllers';
import { PasswordHasherService, AuthService } from './services';
import { LocalStrategy, JwtStrategy } from './strategies';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: {
          expiresIn: configService.get('jwt.expire'),
        },
      }),
    }),
    PassportModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [PasswordHasherService, AuthService, LocalStrategy, JwtStrategy],
  exports: [
    AuthService,
    PasswordHasherService,
    LocalStrategy,
    JwtStrategy,
    JwtModule,
    PassportModule,
  ],
})
export class AuthModule {}
