import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class ProcLutInput {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly id: number;

  @IsOptional()
  readonly name?: string;

  @IsOptional()
  readonly pos?: string;

  @IsOptional()
  readonly comment?: string;
}
