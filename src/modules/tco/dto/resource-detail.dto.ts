import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class ResourceDetailInput {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly id: number;

  @IsNumber()
  @Type(() => Number)
  resourceId: number;

  @IsOptional()
  name?: string;

  @IsOptional()
  costRate?: number;

  @IsOptional()
  estHrs?: number;

  @IsOptional()
  tot?: number;

  @IsOptional()
  yr1Hrs?: number;

  @IsOptional()
  yr2Hrs?: number;

  @IsOptional()
  yr3Hrs?: number;
}
