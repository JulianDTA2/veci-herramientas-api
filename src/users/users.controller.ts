// src/users/users.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register') // Endpoint: POST /users/register
  register(@Body() createUserDto: CreateUserDto) {
    // Nest.js valida automáticamente el 'body' usando el CreateUserDto
    return this.usersService.create(createUserDto);
  }
}