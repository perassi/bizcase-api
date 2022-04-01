import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import {
  Tco,
} from './entities';
import {
  TcoService,
} from './services';
import {
  TcoController,
} from './controllers';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Tco,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [
    TcoService,
  ],
  controllers: [
    TcoController,
  ],

  exports: [TypeOrmModule],
})
export class TcoModule {}
