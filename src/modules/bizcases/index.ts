import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { BcTemplate, Bizcase } from './entities';
import { BcTemplateService, BizcaseService } from './services';
import { BcTemplateController, BizcaseController } from './controllers';

@Module({
  imports: [
    TypeOrmModule.forFeature([BcTemplate, Bizcase]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [BizcaseService, BcTemplateService],
  controllers: [BcTemplateController, BizcaseController],
  exports: [BizcaseService, BcTemplateService, TypeOrmModule],
})
export class BizcasesModule {}
