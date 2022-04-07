import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class BizcaseCreationInput {
  @ApiProperty()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsOptional()
  readonly description?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly templateId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly userId?: number;

  @ApiProperty()
  @IsOptional()
  readonly roi?: string;

  @ApiProperty()
  @IsOptional()
  readonly summary?: string;
}
