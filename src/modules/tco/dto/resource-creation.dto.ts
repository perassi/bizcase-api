import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResourceCreationInput {
  @ApiProperty()
  @IsNotEmpty()
  opt: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  expPectFees?: number;

  @ApiPropertyOptional()
  @IsOptional()
  projStartDt?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  projEndDt?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  resType?: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  tcoId: number;
}
