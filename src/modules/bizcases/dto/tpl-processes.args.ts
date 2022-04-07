import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

import { BaseArgs } from 'modules/common/dto/base.args';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TplProcessArgs extends BaseArgs {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  bcId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  kpiId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  procLutId?: number;
}
