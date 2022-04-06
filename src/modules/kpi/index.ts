import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { KpiLib } from './entities';
import { KpiLibService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      KpiLib,
    ], 'kpiConnection'),
  ],
  providers: [
    KpiLibService,
  ],
  controllers: [
  ],

  exports: [TypeOrmModule, KpiLibService],
})
export class KpiModule {}
