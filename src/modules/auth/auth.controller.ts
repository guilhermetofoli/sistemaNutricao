import { Controller, Post, Body, UnauthorizedException, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
@Post('login')
async login(@Body() loginDto: LoginDto) {
  // 1. Valida se o usuário existe e a senha bate
  const user = await this.authService.validateUser(loginDto.email, loginDto.senha);

  // 2. Se o check falhar (user for null), barra o acesso aqui (Erro 401)
  if (!user) {
    throw new UnauthorizedException('E-mail ou senha inválidos');
  }

  // 3. Se passou no check, aí sim gera o token
  return this.authService.login(user);
}
}