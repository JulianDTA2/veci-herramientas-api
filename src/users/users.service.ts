import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  // Pedimos a Nest.js que nos inyecte el "Repositorio" de User
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Método para crear un usuario
  async create(createUserDto: CreateUserDto): Promise<any> {
    const { email, password, name } = createUserDto;

    // 1. Revisa si el email ya existe
    const userExists = await this.userRepository.findOneBy({ email });
    if (userExists) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    // 2. Encripta la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 3. Crea el objeto de usuario
    const newUser = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    // 4. Guarda el usuario en la base de datos
    const savedUser = await this.userRepository.save(newUser);

    // 5. No devuelvas la contraseña en la respuesta
    // Usamos desestructuración para excluir 'password'
    const { password: _, ...result } = savedUser;

    return result;
  }
}