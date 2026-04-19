import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateNutritionistDto {
  @IsOptional()
  @IsString()
  especialidade?: string;

  @IsOptional()
  @IsNumber()
  valor_consulta?: number;

  @IsOptional()
  @IsString()
  endereco_atendimento?: string;
}