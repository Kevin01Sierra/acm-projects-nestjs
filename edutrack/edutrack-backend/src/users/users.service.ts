import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Verificar si el correo ya existe
    const existingUser = await this.userRepository.findOne({
      where: { correo: createUserDto.correo }
    });

    if (existingUser) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    // Encriptar contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.contrasena, saltRounds);

    // Crear usuario con contraseña encriptada
    const user = this.userRepository.create({
      ...createUserDto,
      contrasena: hashedPassword,
    });

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException('Error al crear el usuario');
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['profesor', 'estudiante'],
      order: { creado_en: 'DESC' }
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profesor', 'estudiante']
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return user;
  }

  async findByEmail(correo: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { correo },
      relations: ['profesor', 'estudiante']
    });

    if (!user) {
      throw new NotFoundException(`Usuario con correo ${correo} no encontrado`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    // Si se está actualizando el correo, verificar que no exista
    if (updateUserDto.correo && updateUserDto.correo !== user.correo) {
      const existingUser = await this.userRepository.findOne({
        where: { correo: updateUserDto.correo }
      });

      if (existingUser) {
        throw new ConflictException('El correo electrónico ya está registrado');
      }
    }

    // Si se está actualizando la contraseña, encriptarla
    if (updateUserDto.contrasena) {
      const saltRounds = 10;
      updateUserDto.contrasena = await bcrypt.hash(updateUserDto.contrasena, saltRounds);
    }

    // Actualizar usuario
    Object.assign(user, updateUserDto);

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException('Error al actualizar el usuario');
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    const user = await this.findOne(id);

    await this.userRepository.remove(user);

    return {
      message: `Usuario con ID ${id} eliminado exitosamente`
    };
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async countUsers(): Promise<number> {
    return await this.userRepository.count();
  }

  async findByRole(rol: 'profesor' | 'estudiante'): Promise<User[]> {
    return await this.userRepository.find({
      where: { rol },
      relations: ['profesor', 'estudiante'],
      order: { creado_en: 'DESC' }
    });
  }
}