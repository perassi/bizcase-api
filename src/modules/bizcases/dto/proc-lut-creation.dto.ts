import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProcLutCreationInput {
  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly poc?: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly comment?: string;
}
