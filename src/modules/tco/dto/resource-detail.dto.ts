import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResourceDetailInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly id: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  resourceId: number;

  @ApiPropertyOptional()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  costRate?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  estHrs?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  tot?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  yr1Hrs?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  yr2Hrs?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  yr3Hrs?: number;
}
