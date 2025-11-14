import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profesor } from './entities/profesor.entity';
import { User } from '../users/entities/user.entity';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';

@Injectable()
export class ProfesoresService {
  constructor(
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createProfesorDto: CreateProfesorDto): Promise<Profesor> {
    // Verificar que el usuario existe y es profesor
    const user = await this.userRepository.findOne({
      where: { id: createProfesorDto.usuario_id }
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${createProfesorDto.usuario_id} no encontrado`);
    }

    if (user.rol !== 'profesor') {
      throw new BadRequestException('El usuario debe tener rol de profesor');
    }

    // Verificar que el usuario no tenga ya un perfil de profesor
    const existingProfesor = await this.profesorRepository.findOne({
      where: { usuario: { id: createProfesorDto.usuario_id } }
    });

    if (existingProfesor) {
      throw new BadRequestException('Este usuario ya tiene un perfil de profesor');
    }

    const profesor = this.profesorRepository.create({
      ...createProfesorDto,
      usuario: user,
    });

    try {
      return await this.profesorRepository.save(profesor);
    } catch (error) {
      throw new BadRequestException('Error al crear el profesor');
    }
  }

  async findAll(): Promise<Profesor[]> {
    return await this.profesorRepository.find({
      relations: ['usuario', 'cursos'],
      order: { creado_en: 'DESC' }
    });
  }

  async findOne(id: number): Promise<Profesor> {
    const profesor = await this.profesorRepository.findOne({
      where: { id },
      relations: ['usuario', 'cursos']
    });

    if (!profesor) {
      throw new NotFoundException(`Profesor con ID ${id} no encontrado`);
    }

    return profesor;
  }

  async update(id: number, updateProfesorDto: UpdateProfesorDto): Promise<Profesor> {
    const profesor = await this.findOne(id);

    Object.assign(profesor, updateProfesorDto);

    try {
      return await this.profesorRepository.save(profesor);
    } catch (error) {
      throw new BadRequestException('Error al actualizar el profesor');
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    const profesor = await this.findOne(id);
    await this.profesorRepository.remove(profesor);

    return {
      message: `Profesor con ID ${id} eliminado exitosamente`
    };
  }

  async findByEspecialidad(especialidad: string): Promise<Profesor[]> {
    return await this.profesorRepository.find({
      where: { especialidad },
      relations: ['usuario', 'cursos']
    });
  }
}