import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from 'modules/users';
import { AuthModule } from 'modules/auth';
import { BizcasesModule } from 'modules/bizcases';
import { TcoModule } from 'modules/tco';
import { KpiModule } from 'modules/kpi';

import { User } from 'modules/users/entities';
import { BcTemplate, Bizcase, ProcLut, TplProcess, Process } from 'modules/bizcases/entities';
import {
  Tco,
  License,
  LicenseDetail,
  Resource,
  ResourceDetail,
  OtherCostOpt,
} from 'modules/tco/entities';
import { KpiLib } from 'modules/kpi/entities';

import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: Object.values(require('./config')),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database').default,
        entities: [
          User,
          BcTemplate,
          Bizcase,
          ProcLut,
          TplProcess,
          Process,
          Tco,
          License,
          LicenseDetail,
          Resource,
          ResourceDetail,
          OtherCostOpt,
        ],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      name: 'kpiConnection',
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database').kpi,
        entities: [
          KpiLib,
        ],
        name: 'kpiConnection',
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    AuthModule,
    BizcasesModule,
    TcoModule,
    KpiModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
