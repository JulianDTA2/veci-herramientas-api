// src/loans/entities/loan.entity.ts
import { Tool } from '../../tools/entities/tool.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// Definimos los posibles estados de un préstamo
export enum LoanStatus {
  PENDING = 'pending',    
  APPROVED = 'approved',  
  REJECTED = 'rejected',   
  ACTIVE = 'active',       
  RETURNED = 'returned',   
}

@Entity()
export class Loan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // --- Relación con la Herramienta ---
  @ManyToOne(() => Tool, { eager: true }) 
  tool: Tool;
  @Column()
  toolId: string;

  // --- Relación con el Dueño (Owner) ---
  @ManyToOne(() => User, { eager: true })
  owner: User;
  @Column()
  ownerId: string;

  // --- Relación con el Solicitante (Requester) ---
  @ManyToOne(() => User, { eager: true }) 
  requester: User;
  @Column()
  requesterId: string;

  @Column({
    type: 'varchar',
    length: 20,
    enum: LoanStatus, 
    default: LoanStatus.PENDING,
  })
  status: LoanStatus;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' }) 
  endDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}