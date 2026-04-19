import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email } });
  }

  async findOne(id: number): Promise<User | null> {
    return this.userModel.findByPk(id);
  }

  async create(userData: any): Promise<User> {
    // Debug de Admin: Veja o que está chegando no terminal
    console.log('--- INSPECIONANDO PAYLOAD ---');
    console.log(userData);

    // Validação de segurança: Se não houver senha, breca o processo aqui
    if (!userData.senha) {
      throw new BadRequestException('Campo "senha" não encontrado no JSON enviado.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.senha, salt);
    
    return this.userModel.create({
      ...userData,
      senha: hashedPassword,
    });
  }
}