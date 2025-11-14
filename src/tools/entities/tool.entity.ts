// src/tools/entities/tool.entity.ts
import { User } from '../../users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Tool {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string; // ej. "Taladro Percutor"

  @Column({ type: 'text', nullable: true })
  description: string; // ej. "Poco uso, con set de brocas"

  @Column({ type: 'varchar', length: 50 })
  category: string; // ej. "Carpintería", "Jardinería"

  @CreateDateColumn()
  createdAt: Date;

  // --- Relación con el Usuario ---
  // "Muchas herramientas pertenecen a Un usuario"
  @ManyToOne(() => User, (user) => user.tools)
  owner: User;

  @Column() // Guardamos el ID del dueño para facilitar las búsquedas
  ownerId: string;
}