import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

import { BaseArgs } from 'modules/common/dto/base.args';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResourceDetailsArgs extends BaseArgs {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  resourceId?: number;
}
