// src/tools/tools.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request, // <-- 1. IMPORTA Request
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ToolsService } from './tools.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';

@UseGuards(AuthGuard('jwt')) // Protege todas las rutas
@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  /**
   * POST /tools
   * Crea una nueva herramienta
   */
  @Post()
  create(@Body() createToolDto: CreateToolDto, @Request() req: any) {
    // 2. 'req.user' fue inyectado por JwtStrategy y contiene el ID
    const userId = req.user.userId;
    return this.toolsService.create(createToolDto, userId);
  }

  /**
   * GET /tools
   * Obtiene todas las herramientas
   */
  @Get()
  findAll() {
    return this.toolsService.findAll();
  }

  /**
   * GET /tools/:id
   * Obtiene una herramienta
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toolsService.findOne(id);
  }

  /**
   * DELETE /tools/:id
   * Elimina una herramienta
   */
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    // 3. Pasamos el ID del usuario para la validación de seguridad
    const userId = req.user.userId;
    return this.toolsService.remove(id, userId);
  }
}