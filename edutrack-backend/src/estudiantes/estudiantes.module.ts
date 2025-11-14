import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudiantesService } from './estudiantes.service';
import { EstudiantesController } from './estudiantes.controller';
import { Estudiante } from './entities/estudiante.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Estudiante]),
    UsersModule, // Importar para acceder al repositorio de User
  ],
  controllers: [EstudiantesController],
  providers: [EstudiantesService],
  exports: [EstudiantesService, TypeOrmModule],
})
export class EstudiantesModule {}