import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateNutritionistDto {
  @IsString()
  @IsNotEmpty()
  crn!: string;

  @IsString()
  @IsNotEmpty()
  especialidade!: string;

  @IsNumber()
  valor_consulta!: number;

  @IsString()
  @IsOptional()
  endereco_atendimento?: string;

  @IsNumber()
  @IsNotEmpty()
  userId!: number; // ID do usuário que acabou de ser criado
}