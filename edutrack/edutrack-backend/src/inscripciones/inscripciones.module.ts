import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InscripcionesService } from './inscripciones.service';
import { InscripcionesController } from './inscripciones.controller';
import { Inscripcion } from './entities/inscripcion.entity';
import { EstudiantesModule } from '../estudiantes/estudiantes.module';
import { CursosModule } from '../cursos/cursos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inscripcion]),
    EstudiantesModule, // Para acceder al repositorio de Estudiante
    CursosModule,      // Para acceder al repositorio de Curso
  ],
  controllers: [InscripcionesController],
  providers: [InscripcionesService],
  exports: [InscripcionesService, TypeOrmModule],
})
export class InscripcionesModule {}