import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import {
  BcTemplate,
  Bizcase,
  ProcLut,
  TplProcess,
  Process,
} from './entities';
import {
  BcTemplateService,
  BizcaseService,
  ProcLutService,
  TplProcessService,
  ProcessService,
} from './services';
import {
  BcTemplateController,
  BizcaseController,
  ProcLutController,
  TplProcessController,
  ProcessController,
} from './controllers';
import {
  ProcessSubscriber,
} from './subscribers';

import { KpiModule } from 'modules/kpi';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BcTemplate,
      Bizcase,
      ProcLut,
      TplProcess,
      Process,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    KpiModule,
  ],
  providers: [
    BizcaseService,
    BcTemplateService,
    ProcLutService,
    TplProcessService,
    ProcessService,
    ProcessSubscriber,
  ],
  controllers: [
    BcTemplateController,
    BizcaseController,
    ProcLutController,
    TplProcessController,
    ProcessController,
  ],

  exports: [BizcaseService, BcTemplateService, TypeOrmModule],
})
export class BizcasesModule {}
