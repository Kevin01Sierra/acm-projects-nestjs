import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { User } from '../users/entities/user.entity';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createEstudianteDto: CreateEstudianteDto): Promise<Estudiante> {
    // Verificar que el usuario existe y es estudiante
    const user = await this.userRepository.findOne({
      where: { id: createEstudianteDto.usuario_id }
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${createEstudianteDto.usuario_id} no encontrado`);
    }

    if (user.rol !== 'estudiante') {
      throw new BadRequestException('El usuario debe tener rol de estudiante');
    }

    // Verificar que el usuario no tenga ya un perfil de estudiante
    const existingEstudiante = await this.estudianteRepository.findOne({
      where: { usuario: { id: createEstudianteDto.usuario_id } }
    });

    if (existingEstudiante) {
      throw new BadRequestException('Este usuario ya tiene un perfil de estudiante');
    }

    const estudiante = this.estudianteRepository.create({
      ...createEstudianteDto,
      usuario: user,
    });

    try {
      return await this.estudianteRepository.save(estudiante);
    } catch (error) {
      throw new BadRequestException('Error al crear el estudiante');
    }
  }

  async findAll(): Promise<Estudiante[]> {
    return await this.estudianteRepository.find({
      relations: ['usuario', 'inscripciones'],
      order: { creado_en: 'DESC' }
    });
  }

  async findOne(id: number): Promise<Estudiante> {
    const estudiante = await this.estudianteRepository.findOne({
      where: { id },
      relations: ['usuario', 'inscripciones', 'inscripciones.curso']
    });

    if (!estudiante) {
      throw new NotFoundException(`Estudiante con ID ${id} no encontrado`);
    }

    return estudiante;
  }

  async update(id: number, updateEstudianteDto: UpdateEstudianteDto): Promise<Estudiante> {
    const estudiante = await this.findOne(id);

    Object.assign(estudiante, updateEstudianteDto);

    try {
      return await this.estudianteRepository.save(estudiante);
    } catch (error) {
      throw new BadRequestException('Error al actualizar el estudiante');
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    const estudiante = await this.findOne(id);
    await this.estudianteRepository.remove(estudiante);

    return {
      message: `Estudiante con ID ${id} eliminado exitosamente`
    };
  }

  async findByCarrera(carrera: string): Promise<Estudiante[]> {
    return await this.estudianteRepository.find({
      where: { carrera },
      relations: ['usuario']
    });
  }

  async findBySemestre(semestre: number): Promise<Estudiante[]> {
    return await this.estudianteRepository.find({
      where: { semestre_actual: semestre },
      relations: ['usuario']
    });
  }
}