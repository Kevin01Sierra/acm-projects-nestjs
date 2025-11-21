import { IsString, IsNotEmpty, IsInt, Min, Max, IsOptional, MinLength, MaxLength } from 'class-validator';

export class CreateCursoDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del curso es obligatorio' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(255, { message: 'El nombre no puede exceder 255 caracteres' })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @MinLength(10, { message: 'La descripción debe tener al menos 10 caracteres' })
  descripcion: string;

  @IsInt({ message: 'Los créditos deben ser un número entero' })
  @Min(1, { message: 'Los créditos deben ser al menos 1' })
  @Max(10, { message: 'Los créditos no pueden exceder 10' })
  creditos: number;

  @IsString()
  @IsNotEmpty({ message: 'El código del curso es obligatorio' })
  @MaxLength(50, { message: 'El código no puede exceder 50 caracteres' })
  codigo_curso: string;

  @IsInt({ message: 'El cupo máximo debe ser un número entero' })
  @Min(1, { message: 'El cupo mínimo es 1' })
  @Max(100, { message: 'El cupo máximo es 100' })
  @IsOptional()
  cupo_maximo?: number;

  @IsInt({ message: 'El ID del profesor debe ser un número entero' })
  @IsNotEmpty({ message: 'El ID del profesor es obligatorio' })
  profesor_id: number;
}