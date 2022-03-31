import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { BcTemplate, Bizcase, ProcLut, TplProcess } from './entities';
import { BcTemplateService, BizcaseService, ProcLutService, TplProcessService } from './services';
import { BcTemplateController, BizcaseController, ProcLutController, TplProcessController } from './controllers';

@Module({
  imports: [
    TypeOrmModule.forFeature([BcTemplate, Bizcase, ProcLut, TplProcess]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [BizcaseService, BcTemplateService, ProcLutService, TplProcessService],
  controllers: [BcTemplateController, BizcaseController, ProcLutController, TplProcessController],

  exports: [BizcaseService, BcTemplateService, TypeOrmModule],
})
export class BizcasesModule {}
