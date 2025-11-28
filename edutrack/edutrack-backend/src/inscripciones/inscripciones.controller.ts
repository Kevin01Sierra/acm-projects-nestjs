import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { InscripcionesService } from './inscripciones.service';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';

@Controller('inscripciones')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InscripcionesController {
  constructor(private readonly inscripcionesService: InscripcionesService) {}

  @Post()
  @Roles('estudiante', 'admin')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createInscripcionDto: CreateInscripcionDto) {
    return this.inscripcionesService.create(createInscripcionDto);
  }

  @Get()
  findAll(
    @Query('estudiante_id', new ParseIntPipe({ optional: true })) estudianteId?: number,
    @Query('curso_id', new ParseIntPipe({ optional: true })) cursoId?: number,
    @Query('estado') estado?: string
  ) {
    if (estudianteId) {
      return this.inscripcionesService.findByEstudiante(estudianteId);
    }
    if (cursoId) {
      return this.inscripcionesService.findByCurso(cursoId);
    }
    if (estado) {
      return this.inscripcionesService.findByEstado(estado);
    }
    return this.inscripcionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.inscripcionesService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInscripcionDto: UpdateInscripcionDto
  ) {
    return this.inscripcionesService.update(id, updateInscripcionDto);
  }

  @Delete(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.inscripcionesService.remove(id);
  }
}