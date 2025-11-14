// src/auth/local.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // Por defecto, passport-local espera 'username' y 'password'
    // Le decimos que use 'email' en lugar de 'username'
    super({ usernameField: 'email' });
  }

  // Esta función se llama automáticamente cuando usamos el 'LocalAuthGuard'
  async validate(email: string, password: string): Promise<any> {

    // authService.validateUser la crearemos en el siguiente paso
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    return user;
  }
}