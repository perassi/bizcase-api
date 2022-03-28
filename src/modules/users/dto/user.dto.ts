import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UserInput {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  public id: number;

  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsOptional()
  readonly fullName?: string;

  @IsOptional()
  @Type(() => Boolean)
  readonly isActive?: boolean;
}
