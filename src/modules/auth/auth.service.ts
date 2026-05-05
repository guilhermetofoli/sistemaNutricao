import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    
    // Compara senha enviada com o hash salvo no Sequelize
    if (user && await bcrypt.compare(pass, user.senha)) {
      const { senha, ...result } = user.get({ plain: true });
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id, tipo: user.tipo };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}