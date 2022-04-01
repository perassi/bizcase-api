import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class TcoInput {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly id: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly bcId?: number;

  @IsOptional()
  readonly optNumber?: number;

  @IsOptional()
  readonly parmIntRate?: number;

  @IsOptional()
  readonly parmTaxRate?: number;

  @IsOptional()
  readonly parmPrepaidAssetYrs?: number;

  @IsOptional()
  readonly parmFixedAssetYrs?: number;

  @IsOptional()
  readonly parmCcy?: string;

  @IsOptional()
  readonly parmClientCcy?: string;

  @IsOptional()
  readonly parmCcyRate?: number;
}
