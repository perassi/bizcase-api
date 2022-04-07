import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BizcaseInput {
  @ApiProperty({})
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly id: number;

  @ApiPropertyOptional()
  @IsOptional()
  readonly title?: string;

  @ApiProperty()
  @IsOptional()
  readonly description?: string;

  @ApiProperty()
  @IsOptional()
  readonly roi?: string;

  @ApiProperty()
  @IsOptional()
  readonly summary?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly templateId: number;
}
