import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class TplProcessCreationInput {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly bcTemplateId: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly procLutId: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly kpiId: number;

  @IsOptional()
  readonly meta?: object;
}
