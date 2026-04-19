import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [SequelizeModule.forFeature([User])], // Registra o modelo User no Sequelize
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // Exporta para o AuthModule conseguir usar
})
export class UsersModule {}