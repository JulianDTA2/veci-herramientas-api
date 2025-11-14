// src/auth/auth.controller.ts
import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth') // URL base: /auth
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Endpoint de Login
   * POST /auth/login
   */
  @UseGuards(AuthGuard('local')) // 1. Activa la LocalStrategy
  @Post('login')
  async login(@Request() req: any) {
    // 2. Si el Guard tuvo éxito, req.user existe
    //    (gracias al trabajo que hizo la LocalStrategy)
    
    // 3. Llamamos al servicio para crear y devolver el token
    return this.authService.login(req.user);
  }
}