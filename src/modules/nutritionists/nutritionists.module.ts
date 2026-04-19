import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Nutritionist } from './nutritionist.model';
import { NutritionistsService } from './nutritionists.service';
import { NutritionistsController } from './nutritionists.controller';

@Module({
  imports: [SequelizeModule.forFeature([Nutritionist])],
  providers: [NutritionistsService],
  controllers: [NutritionistsController],
  exports: [NutritionistsService],
})
export class NutritionistsModule {}