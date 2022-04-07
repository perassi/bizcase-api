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
  BizcaseSubscriber,
} from './subscribers';

import { KpiModule } from 'modules/kpi';
import { BizcaseGuard } from './guards';

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
    BizcaseSubscriber,

    BizcaseGuard,
  ],
  controllers: [
    BcTemplateController,
    BizcaseController,
    ProcLutController,
    TplProcessController,
    ProcessController,
  ],

  exports: [BizcaseService, BcTemplateService, TypeOrmModule, BizcaseGuard],
})
export class BizcasesModule {}
