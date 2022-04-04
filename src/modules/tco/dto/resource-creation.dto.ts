import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class ResourceCreationInput {
  @IsNotEmpty()
  opt: string;

  @IsOptional()
  expPectFees?: number;

  @IsOptional()
  projStartDt?: Date;

  @IsOptional()
  projEndDt?: Date;

  @IsOptional()
  resType?: string;

  @IsNumber()
  @Type(() => Number)
  tcoId: number;
}
