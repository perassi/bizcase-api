import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TcoCreationInput {
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
  @IsNumber()
  readonly parmCcy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly parmClientCcy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly parmCcyRate?: number;
}
