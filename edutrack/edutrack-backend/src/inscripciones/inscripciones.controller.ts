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
  Query
} from '@nestjs/common';
import { InscripcionesService } from './inscripciones.service';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';

@Controller('inscripciones')
export class InscripcionesController {
  constructor(private readonly inscripcionesService: InscripcionesService) {}

  @Post()
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
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInscripcionDto: UpdateInscripcionDto
  ) {
    return this.inscripcionesService.update(id, updateInscripcionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.inscripcionesService.remove(id);
  }
}