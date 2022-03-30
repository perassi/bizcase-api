import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class ProcLutCreationInput {
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  readonly poc?: string;

  @IsOptional()
  readonly comment?: string;
}
