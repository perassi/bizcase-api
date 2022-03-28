import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class BizcaseInput {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly id: number;

  @IsOptional()
  readonly title?: string;

  @IsOptional()
  readonly description?: string;

  @IsOptional()
  readonly roi?: string;

  @IsOptional()
  readonly summary?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly templateId?: number;
}
