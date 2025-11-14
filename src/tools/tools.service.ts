// src/tools/tools.service.ts
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { Tool } from './entities/tool.entity';

@Injectable()
export class ToolsService {
  constructor(
    @InjectRepository(Tool)
    private readonly toolRepository: Repository<Tool>,
  ) {}

  /**
   * Crea una nueva herramienta y la asigna al usuario.
   */
  async create(createToolDto: CreateToolDto, userId: string): Promise<Tool> {
    const newTool = this.toolRepository.create({
      ...createToolDto, // Pasa el name, description, category
      ownerId: userId, // ¡Asigna el dueño!
    });
    
    return this.toolRepository.save(newTool);
  }

  /**
   * Devuelve todas las herramientas
   */
  async findAll(): Promise<Tool[]> {
    // Usamos 'relations' para que también traiga la info del dueño
    return this.toolRepository.find({
      relations: {
        owner: true,
      },
      // Ocultamos la contraseña del dueño de la respuesta
      select: {
        owner: {
          id: true,
          name: true,
          email: true,
        }
      }
    });
  }

  /**
   * (Lo dejaremos simple por ahora)
   */
  findOne(id: string) {
    return this.toolRepository.findOneBy({ id });
  }

  /**
   * Elimina una herramienta, PERO solo si el usuario es el dueño.
   */
  async remove(toolId: string, userId: string): Promise<void> {
    const tool = await this.toolRepository.findOneBy({ id: toolId });

    if (!tool) {
      throw new NotFoundException('La herramienta no existe');
    }

    if (tool.ownerId !== userId) {
      throw new UnauthorizedException('No tienes permiso para borrar esta herramienta');
    }

    await this.toolRepository.remove(tool);
  }
}