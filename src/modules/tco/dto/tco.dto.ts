import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TcoInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly id: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly bcId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly optNumber?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly parmIntRate?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly parmTaxRate?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly parmPrepaidAssetYrs?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly parmFixedAssetYrs?: number;

  @ApiPropertyOptional()
  @IsOptional()
  readonly parmCcy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly parmClientCcy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly parmCcyRate?: number;
}
