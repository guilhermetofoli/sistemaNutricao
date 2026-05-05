import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { NutritionistsModule } from './modules/nutritionists/nutritionists.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SequelizeModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
  const dbConfig = {
    dialect: 'mysql' as const,
    host: configService.get<string>('DB_HOST') || '127.0.0.1',
    port: configService.get<number>('DB_PORT') || 3306,
    username: configService.get<string>('DB_USERNAME') || 'root', // Garante 'root' se falhar
    password: configService.get<string>('DB_PASSWORD') || '',     // Garante vazio se falhar
    database: configService.get<string>('DB_DATABASE') || 'sistema_nutricao',
    autoLoadModels: true,
    synchronize: true,
  };
  
  console.log('Tentando conectar com o usuário:', dbConfig.username); // Isso vai nos mostrar a verdade no log
  return dbConfig;
},
}),
    AuthModule,
    UsersModule,
    NutritionistsModule,
  ],
})
export class AppModule {}