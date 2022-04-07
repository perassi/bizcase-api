import { Min, Max, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BaseArgs {
  @ApiPropertyOptional()
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  skip?: number = 0;

  @ApiPropertyOptional()
  @IsOptional()
  @Min(1)
  @Max(1000)
  @Type(() => Number)
  limit?: number = 25;
}
