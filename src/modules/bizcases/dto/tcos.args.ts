import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

import { BaseArgs } from 'modules/common/dto/base.args';

export class TcosArgs extends BaseArgs {
  @IsOptional()
  @Type(() => Number)
  userId?: number;
}
