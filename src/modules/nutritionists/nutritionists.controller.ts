import { Controller, Get, Post, Body, Param, UseGuards, Patch, Delete } from '@nestjs/common';
import { NutritionistsService } from './nutritionists.service';
import { CreateNutritionistDto } from './dto/create-nutritionist.dto';
import { UpdateNutritionistDto } from './dto/update-nutritionist.dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';

@Controller('nutritionists')
export class NutritionistsController {
  constructor(private readonly nutritionistsService: NutritionistsService) {}

  @Post()
  create(@Body() dto: CreateNutritionistDto) {
    return this.nutritionistsService.create(dto);
  }

  @UseGuards(JwtAuthGuard) // Só logados podem ver a lista completa
  @Get()
  findAll() {
    return this.nutritionistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nutritionistsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateNutritionistDto) {
    return this.nutritionistsService.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.nutritionistsService.remove(+id);
  }
}