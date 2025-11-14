import { IsString, IsNotEmpty, IsOptional, IsInt, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateProfesorDto {
  @IsString()
  @IsNotEmpty({ message: 'La especialidad es obligatoria' })
  @MinLength(3, { message: 'La especialidad debe tener al menos 3 caracteres' })
  @MaxLength(255, { message: 'La especialidad no puede exceder 255 caracteres' })
  especialidad: string;

  @IsString()
  @IsOptional()
  @MinLength(10, { message: 'La biografía debe tener al menos 10 caracteres' })
  biografia?: string;

  @IsString()
  @IsOptional()
  @Matches(/^[0-9]{10}$/, { message: 'El teléfono debe tener 10 dígitos' })
  telefono?: string;

  @IsInt({ message: 'El ID del usuario debe ser un número entero' })
  @IsNotEmpty({ message: 'El ID del usuario es obligatorio' })
  usuario_id: number;
}