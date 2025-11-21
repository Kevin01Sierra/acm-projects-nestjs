import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesoresService } from './profesores.service';
import { ProfesoresController } from './profesores.controller';
import { Profesor } from './entities/profesor.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profesor]),
    UsersModule, // Importar para acceder al repositorio de User
  ],
  controllers: [ProfesoresController],
  providers: [ProfesoresService],
  exports: [ProfesoresService, TypeOrmModule],
})
export class ProfesoresModule {}