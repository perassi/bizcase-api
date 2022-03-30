import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { BcTemplate, Bizcase, ProcLut } from './entities';
import { BcTemplateService, BizcaseService, ProcLutService } from './services';
import { BcTemplateController, BizcaseController, ProcLutController } from './controllers';

@Module({
  imports: [
    TypeOrmModule.forFeature([BcTemplate, Bizcase, ProcLut]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [BizcaseService, BcTemplateService, ProcLutService],
  controllers: [BcTemplateController, BizcaseController, ProcLutController],
  exports: [BizcaseService, BcTemplateService, TypeOrmModule],
})
export class BizcasesModule {}
