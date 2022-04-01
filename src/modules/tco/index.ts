import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import {
  BcTemplate,
  Bizcase,
  ProcLut,
  TplProcess,
  Process,
  Tco,
} from './entities';
import {
  BcTemplateService,
  BizcaseService,
  ProcLutService,
  TplProcessService,
  ProcessService,
  TcoService,
} from './services';
import {
  BcTemplateController,
  BizcaseController,
  ProcLutController,
  TplProcessController,
  ProcessController,
  TcoController,
} from './controllers';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BcTemplate,
      Bizcase,
      ProcLut,
      TplProcess,
      Process,
      Tco,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [
    BizcaseService,
    BcTemplateService,
    ProcLutService,
    TplProcessService,
    ProcessService,
    TcoService,
  ],
  controllers: [
    BcTemplateController,
    BizcaseController,
    ProcLutController,
    TplProcessController,
    ProcessController,
    TcoController,
  ],

  exports: [BizcaseService, BcTemplateService, TypeOrmModule],
})
export class BizcasesModule {}
