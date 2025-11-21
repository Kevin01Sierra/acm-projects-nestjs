import { IsString, IsNotEmpty, IsOptional, IsInt, Min, Max, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateEstudianteDto {
  @IsInt({ message: 'El año de ingreso debe ser un número entero' })
  @Min(2000, { message: 'El año de ingreso no puede ser menor a 2000' })
  @Max(2030, { message: 'El año de ingreso no puede ser mayor a 2030' })
  anio_ingreso: number;

  @IsString()
  @IsOptional()
  @MinLength(3, { message: 'La carrera debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'La carrera no puede exceder 100 caracteres' })
  carrera?: string;

  @IsInt({ message: 'El semestre actual debe ser un número entero' })
  @Min(1, { message: 'El semestre debe ser al menos 1' })
  @Max(12, { message: 'El semestre no puede exceder 12' })
  @IsOptional()
  semestre_actual?: number;

  @IsString()
  @IsOptional()
  @Matches(/^[0-9]{10}$/, { message: 'El teléfono debe tener 10 dígitos' })
  telefono?: string;

  @IsInt({ message: 'El ID del usuario debe ser un número entero' })
  @IsNotEmpty({ message: 'El ID del usuario es obligatorio' })
  usuario_id: number;
}