// src/users/entities/user.entity.ts
import { Tool } from '../../tools/entities/tool.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity() // Le dice a TypeORM que esto es una tabla
export class User {
  @PrimaryGeneratedColumn('uuid') // ID automático como UUID (ej: a1b2c3d4-...)
  id: string;
  @OneToMany(() => Tool, (tool) => tool.owner)
  tools: Tool[];

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true }) // El email no se puede repetir
  email: string;

  @Column({ type: 'varchar' })
  password: string; // Aquí guardaremos la contraseña encriptada

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}