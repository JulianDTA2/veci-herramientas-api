// src/tools/dto/create-tool.dto.ts
import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateToolDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string; // ej. "Taladro Percutor"

  @IsString()
  @IsOptional() // La descripción es opcional
  @MaxLength(500)
  description: string; // ej. "Poco uso, con set de brocas"

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  category: string; // ej. "Carpintería", "Jardinería"
}