import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Curso } from './entities/curso.entity';
import { Profesor } from '../profesores/entities/profesor.entity';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Injectable()
export class CursosService {
  constructor(
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>,
  ) {}

  async create(createCursoDto: CreateCursoDto): Promise<Curso> {
    // Verificar que el profesor existe
    const profesor = await this.profesorRepository.findOne({
      where: { id: createCursoDto.profesor_id }
    });

    if (!profesor) {
      throw new NotFoundException(`Profesor con ID ${createCursoDto.profesor_id} no encontrado`);
    }

    // Crear curso
    const curso = this.cursoRepository.create({
      ...createCursoDto,
      profesor,
    });

    try {
      return await this.cursoRepository.save(curso);
    } catch (error) {
      throw new BadRequestException('Error al crear el curso');
    }
  }

  async findAll(): Promise<Curso[]> {
    return await this.cursoRepository.find({
      relations: ['profesor', 'profesor.usuario'],
      order: { creado_en: 'DESC' }
    });
  }

  async findOne(id: number): Promise<Curso> {
    const curso = await this.cursoRepository.findOne({
      where: { id },
      relations: ['profesor', 'profesor.usuario', 'inscripciones']
    });

    if (!curso) {
      throw new NotFoundException(`Curso con ID ${id} no encontrado`);
    }

    return curso;
  }

  async update(id: number, updateCursoDto: UpdateCursoDto): Promise<Curso> {
    const curso = await this.findOne(id);

    // Si se actualiza el profesor, verificar que existe
    if (updateCursoDto.profesor_id) {
      const profesor = await this.profesorRepository.findOne({
        where: { id: updateCursoDto.profesor_id }
      });

      if (!profesor) {
        throw new NotFoundException(`Profesor con ID ${updateCursoDto.profesor_id} no encontrado`);
      }

      curso.profesor = profesor;
    }

    Object.assign(curso, updateCursoDto);

    try {
      return await this.cursoRepository.save(curso);
    } catch (error) {
      throw new BadRequestException('Error al actualizar el curso');
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    const curso = await this.findOne(id);
    await this.cursoRepository.remove(curso);

    return {
      message: `Curso con ID ${id} eliminado exitosamente`
    };
  }

  async findByProfesor(profesorId: number): Promise<Curso[]> {
    return await this.cursoRepository.find({
      where: { profesor: { id: profesorId } },
      relations: ['profesor', 'profesor.usuario']
    });
  }

  async findByEstudiante(estudianteId: number): Promise<Curso[]> {
    return await this.cursoRepository.find({
      where: { inscripciones: { estudiante: { id: estudianteId } } },
      relations: ['profesor', 'profesor.usuario', 'inscripciones']
    });
  }
}