
import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class LicenseInput {

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly id: number;

  @IsOptional()
  vendor?: string;

  @IsOptional()
  vendorSol?: string;

  @IsOptional()
  opt?: string;

  @IsOptional()
  discountPct?: number;

  @IsOptional()
  annuIncrPct?: number;

  @IsNumber()
  @Type(() => Number)
  tcoId: number;
}
