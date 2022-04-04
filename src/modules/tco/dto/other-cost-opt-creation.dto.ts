import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class OtherCostOptCreationInput {
  @IsNotEmpty()
  item: string;

  @IsOptional()
  costType?: string;

  @IsOptional()
  yr1Cost?: number;

  @IsOptional()
  yr2Cost?: number;

  @IsOptional()
  yr3Cost?: number;

  @IsOptional()
  yr4Cost?: number;

  @IsOptional()
  yr5Cost?: number;

  @IsNumber()
  @Type(() => Number)
  tcoId: number;
}
