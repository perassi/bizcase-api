import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OtherCostOptInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly id: number;

  @ApiPropertyOptional()
  @IsOptional()
  item?: string;

  @ApiPropertyOptional()
  @IsOptional()
  costType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  yr1Cost?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  yr2Cost?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  yr3Cost?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  yr4Cost?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  yr5Cost?: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  tcoId: number;
}
