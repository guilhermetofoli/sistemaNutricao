import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule, // Permite usar o UsersService aqui dentro
    PassportModule,
    JwtModule.register({
      secret: 'CHAVE_SECRETA_SISTEMA', // Substitua por uma chave secreta forte e segura
      signOptions: { expiresIn: '1h' },    // Token dura 1 hora
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}