import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inscripcion } from './entities/inscripcion.entity';
import { Estudiante } from '../estudiantes/entities/estudiante.entity';
import { Curso } from '../cursos/entities/curso.entity';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';

@Injectable()
export class InscripcionesService {
  constructor(
    @InjectRepository(Inscripcion)
    private readonly inscripcionRepository: Repository<Inscripcion>,
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
  ) {}

  async create(createInscripcionDto: CreateInscripcionDto): Promise<Inscripcion> {
    // Verificar que el estudiante existe
    const estudiante = await this.estudianteRepository.findOne({
      where: { id: createInscripcionDto.estudiante_id }
    });

    if (!estudiante) {
      throw new NotFoundException(`Estudiante con ID ${createInscripcionDto.estudiante_id} no encontrado`);
    }

    // Verificar que el curso existe y está activo
    const curso = await this.cursoRepository.findOne({
      where: { id: createInscripcionDto.curso_id },
      relations: ['inscripciones']
    });

    if (!curso) {
      throw new NotFoundException(`Curso con ID ${createInscripcionDto.curso_id} no encontrado`);
    }

    if (!curso.activo) {
      throw new BadRequestException('El curso no está activo');
    }

    // Verificar que el estudiante no esté ya inscrito en el curso
    const existingInscripcion = await this.inscripcionRepository.findOne({
      where: {
        estudiante: { id: createInscripcionDto.estudiante_id },
        curso: { id: createInscripcionDto.curso_id }
      }
    });

    if (existingInscripcion) {
      throw new BadRequestException('El estudiante ya está inscrito en este curso');
    }

    // Verificar cupo disponible
    const inscritosActuales = curso.inscripciones.filter(
      ins => ins.estado !== 'retirado'
    ).length;

    if (inscritosActuales >= curso.cupo_maximo) {
      throw new BadRequestException('El curso ha alcanzado su cupo máximo');
    }

    const inscripcion = this.inscripcionRepository.create({
      ...createInscripcionDto,
      estudiante,
      curso,
    });

    try {
      return await this.inscripcionRepository.save(inscripcion);
    } catch (error) {
      throw new BadRequestException('Error al crear la inscripción');
    }
  }

  async findAll(): Promise<Inscripcion[]> {
    return await this.inscripcionRepository.find({
      relations: ['estudiante', 'estudiante.usuario', 'curso', 'curso.profesor'],
      order: { creado_en: 'DESC' }
    });
  }

  async findOne(id: number): Promise<Inscripcion> {
    const inscripcion = await this.inscripcionRepository.findOne({
      where: { id },
      relations: ['estudiante', 'estudiante.usuario', 'curso', 'curso.profesor', 'curso.profesor.usuario']
    });

    if (!inscripcion) {
      throw new NotFoundException(`Inscripción con ID ${id} no encontrada`);
    }

    return inscripcion;
  }

  async update(id: number, updateInscripcionDto: UpdateInscripcionDto): Promise<Inscripcion> {
    const inscripcion = await this.findOne(id);

    Object.assign(inscripcion, updateInscripcionDto);

    try {
      return await this.inscripcionRepository.save(inscripcion);
    } catch (error) {
      throw new BadRequestException('Error al actualizar la inscripción');
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    const inscripcion = await this.findOne(id);
    await this.inscripcionRepository.remove(inscripcion);

    return {
      message: `Inscripción con ID ${id} eliminada exitosamente`
    };
  }

  async findByEstudiante(estudianteId: number): Promise<Inscripcion[]> {
    return await this.inscripcionRepository.find({
      where: { estudiante: { id: estudianteId } },
      relations: ['curso', 'curso.profesor']
    });
  }

  async findByCurso(cursoId: number): Promise<Inscripcion[]> {
    return await this.inscripcionRepository.find({
      where: { curso: { id: cursoId } },
      relations: ['estudiante', 'estudiante.usuario']
    });
  }

  async findByEstado(estado: string): Promise<Inscripcion[]> {
    return await this.inscripcionRepository.find({
      where: { estado: estado as any },
      relations: ['estudiante', 'estudiante.usuario', 'curso']
    });
  }
}