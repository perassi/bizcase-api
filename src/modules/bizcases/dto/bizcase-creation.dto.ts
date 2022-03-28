import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class BizcaseCreationInput {
  @IsNotEmpty()
  readonly title: string;

  @IsOptional()
  readonly description?: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly templateId: number;

  @IsOptional()
  readonly roi?: string;

  @IsOptional()
  readonly summary?: string;
}
