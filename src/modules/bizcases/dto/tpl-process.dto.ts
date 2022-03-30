import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class TplProcessInput {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly id: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly bcTemplateId: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly procLutId: number;

  @IsOptional()
  readonly kpis?: object;
}
