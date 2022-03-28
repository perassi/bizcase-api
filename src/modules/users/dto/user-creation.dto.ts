import { IsEmail, Length, IsOptional } from 'class-validator';

export class UserCreationInput {
  @IsEmail()
  readonly email: string;

  @Length(8)
  readonly password: string;

  @IsOptional()
  readonly fullName?: string;
}
