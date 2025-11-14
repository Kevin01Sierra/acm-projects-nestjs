import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursosService } from './cursos.service';
import { CursosController } from './cursos.controller';
import { Curso } from './entities/curso.entity';
import { ProfesoresModule } from '../profesores/profesores.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Curso]),
    ProfesoresModule, // Importar para acceder al repositorio de Profesor
  ],
  controllers: [CursosController],
  providers: [CursosService],
  exports: [CursosService, TypeOrmModule],
})
export class CursosModule {}