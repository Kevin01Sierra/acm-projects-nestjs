import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Verificar si el correo ya existe
    const existingUser = await this.userRepository.findOne({
      where: { correo: registerDto.correo }
    });

    if (existingUser) {
      throw new BadRequestException('El correo electrónico ya está registrado');
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(registerDto.contrasena, 10);

    // Crear usuario
    const user = this.userRepository.create({
      ...registerDto,
      contrasena: hashedPassword,
    });

    await this.userRepository.save(user);

    // Generar token
    const token = this.generateToken(user);

    return {
      message: 'Usuario registrado exitosamente',
      user: {
        id: user.id,
        nombre_completo: user.nombre_completo,
        correo: user.correo,
        rol: user.rol,
        activo: user.activo,
      },
      token,
    };
  }

  async login(loginDto: LoginDto) {
    const { correo, contrasena } = loginDto;

    // Buscar usuario por correo
    const user = await this.userRepository.findOne({
      where: { correo },
      relations: ['profesor', 'estudiante'],
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar si el usuario está activo
    if (!user.activo) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Generar token
    const token = this.generateToken(user);

    return {
      message: 'Inicio de sesión exitoso',
      user: {
        id: user.id,
        nombre_completo: user.nombre_completo,
        correo: user.correo,
        rol: user.rol,
        activo: user.activo,
        profesor: user.profesor,
        estudiante: user.estudiante,
      },
      token,
    };
  }

  async validateUser(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['profesor', 'estudiante'],
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    if (!user.activo) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    return user;
  }

  private generateToken(user: User) {
    const payload = {
      sub: user.id,
      correo: user.correo,
      rol: user.rol,
    };

    return this.jwtService.sign(payload);
  }

  async getProfile(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['profesor', 'estudiante'],
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return {
      id: user.id,
      nombre_completo: user.nombre_completo,
      correo: user.correo,
      rol: user.rol,
      activo: user.activo,
      profesor: user.profesor,
      estudiante: user.estudiante,
      creado_en: user.creado_en,
    };
  }
}