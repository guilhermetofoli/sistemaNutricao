import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Nutritionist } from './nutritionist.model';
import { CreateNutritionistDto } from './dto/create-nutritionist.dto';
import { User } from '../users/user.model';

@Injectable()
export class NutritionistsService {
  constructor(
    @InjectModel(Nutritionist)
    private nutritionistModel: typeof Nutritionist,
  ) {}

  async create(dto: CreateNutritionistDto): Promise<Nutritionist> {
    return this.nutritionistModel.create(dto as any);
  }

  async findAll(): Promise<Nutritionist[]> {
    // Retorna nutricionistas incluindo os dados básicos do Usuário (nome, email)
    return this.nutritionistModel.findAll({ include: [User] });
  }

  async findOne(id: number): Promise<Nutritionist | null> {
  return this.nutritionistModel.findByPk(id, { include: [User] });
  }
}