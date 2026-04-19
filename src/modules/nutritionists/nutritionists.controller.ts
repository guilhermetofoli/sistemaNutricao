import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { NutritionistsService } from './nutritionists.service';
import { CreateNutritionistDto } from './dto/create-nutritionist.dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard'; // Se você já criou o guard

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
}