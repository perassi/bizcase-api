import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class BcTemplateCreationInput {
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  readonly description?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly userId?: number;
}
