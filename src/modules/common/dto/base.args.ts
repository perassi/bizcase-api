import { Min, Max, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class BaseArgs {
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @Min(0)
  @Type(() => Number)
  skip?: number = 0;

  @IsOptional()
  @Min(1)
  @Max(1000)
  @Type(() => Number)
  limit?: number = 25;
}
