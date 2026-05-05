import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 1. Extrai o token do Header "Authorization: Bearer <TOKEN>"
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 2. Não ignora a expiração (se o token venceu, ele barra)
      ignoreExpiration: false,
      // 3. A chave secreta para descriptografar o token
      secretOrKey: 'SUA_CHAVE_SECRETA_AQUI', 
    });
  }

  // O Nest chama este método automaticamente após validar a assinatura do token
  async validate(payload: any) {
    // O que você retornar aqui será injetado no 'req.user'
    // No seu caso, o payload tem o ID, Email e o Tipo (Nutri/Paciente)
    return { 
      userId: payload.sub, 
      email: payload.username, 
      tipo: payload.tipo 
    };
  }
}