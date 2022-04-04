
import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class LicenseDetailCreationInput {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  count?: number;

  @IsOptional()
  costType?: string;

  @IsOptional()
  cost?: number;

  @IsOptional()
  totCost?: number;

  @IsOptional()
  annuSptPect?: number;

  @IsOptional()
  annuSptCost?: number;

  @IsNumber()
  @Type(() => Number)
  licenseId: number;
}
