import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '', // Sua senha do MySQL aqui
      database: 'sistema_nutricao',
      autoLoadModels: true,
      synchronize: true, // Cria as tabelas automaticamente baseado nos seus .model.ts
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}