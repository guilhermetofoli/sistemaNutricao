import { Controller, Post, Body, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto'; // Você precisará criar esse DTO simples

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // 1. O controller recebe o email e senha via DTO
    // 2. Chama o serviço para validar se o usuário existe e a senha está correta
    const user = await this.authService.validateUser(loginDto.email, loginDto.senha);
    
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas. Verifique seu email e senha.');
    }

    // 3. Retorna o token JWT gerado
    return this.authService.login(user);
  }
}