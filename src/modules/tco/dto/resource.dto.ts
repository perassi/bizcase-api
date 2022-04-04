import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class ResourceInput {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly id: number;

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
