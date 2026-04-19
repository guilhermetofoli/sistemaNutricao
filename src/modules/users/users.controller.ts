import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ROTA NOVA: Lista todos os usuários
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post()
  async create(@Body() createUserDto: any) {
    return this.usersService.create(createUserDto);
  }
}