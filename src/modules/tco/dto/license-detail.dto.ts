
import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LicenseDetailInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly id: number;

  @ApiPropertyOptional()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  count?: number;

  @ApiPropertyOptional()
  @IsOptional()
  costType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  cost?: number;

  @ApiPropertyOptional()
  @IsOptional()
  totCost?: number;

  @ApiPropertyOptional()
  @IsOptional()
  annuSptPect?: number;

  @ApiPropertyOptional()
  @IsOptional()
  annuSptCost?: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  licenseId: number;
}
