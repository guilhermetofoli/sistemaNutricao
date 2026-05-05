import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional() // Permite que o campo não seja enviado
  @IsString()
  nome?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  senha?: string;

  @IsOptional()
  @IsEnum(['ADMIN', 'NUTRI', 'PACIENTE'])
  tipo?: string;
}