
import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LicenseInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly id: number;

  @ApiPropertyOptional()
  @IsOptional()
  vendor?: string;

  @ApiPropertyOptional()
  @IsOptional()
  vendorSol?: string;

  @ApiPropertyOptional()
  @IsOptional()
  opt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  discountPct?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  annuIncrPct?: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  tcoId: number;
}
