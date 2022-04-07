import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

import { BaseArgs } from 'modules/common/dto/base.args';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProcessArgs extends BaseArgs {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  kpiId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  procLutId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  bcId?: number;
}
