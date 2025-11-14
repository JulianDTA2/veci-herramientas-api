// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Este método es llamado por LocalStrategy.
   * Compara el email y la contraseña.
   */
  async validateUser(email: string, pass: string): Promise<any> {
    // 1. Busca al usuario por email
    const user = await this.usersService.findOneByEmail(email);

    // 2. Si existe el usuario Y la contraseña coincide
    if (user && (await bcrypt.compare(pass, user.password))) {
      // 3. Devuelve el usuario sin la contraseña
      const { password, ...result } = user;
      return result;
    }
    
    // 4. Si no, devuelve null (la LocalStrategy lanzará un error)
    return null;
  }

  /**
   * Este método se llama desde el controlador cuando validateUser tiene éxito.
   * Crea el token JWT.
   */
  async login(user: any) {
    // El 'payload' es la información que guardaremos dentro del token
    const payload = { email: user.email, sub: user.id, name: user.name };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}