import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import {
  Tco,
  License,
  LicenseDetail,
  Resource,
  ResourceDetail,
  OtherCostOpt,
} from './entities';
import {
  TcoService,
  LicenseService,
  LicenseDetailService,
  ResourceService,
  ResourceDetailService,
  OtherCostOptService,
} from './services';
import {
  TcoController,
  LicenseController,
  LicenseDetailController,
  ResourceController,
  ResourceDetailController,
  OtherCostOptController,
} from './controllers';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Tco,
      License,
      LicenseDetail,
      Resource,
      ResourceDetail,
      OtherCostOpt,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [
    TcoService,
    LicenseService,
    LicenseDetailService,
    ResourceService,
    ResourceDetailService,
    OtherCostOptService,
  ],
  controllers: [
    TcoController,
    LicenseController,
    LicenseDetailController,
    ResourceController,
    ResourceDetailController,
    OtherCostOptController,
  ],

  exports: [TypeOrmModule],
})
export class TcoModule {}
