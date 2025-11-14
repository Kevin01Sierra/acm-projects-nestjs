import { IsInt, IsNotEmpty, IsOptional, IsEnum, IsNumber, IsString, Min, Max, IsDateString } from 'class-validator';

export class CreateInscripcionDto {
  @IsDateString({}, { message: 'La fecha de inscripción debe ser una fecha válida' })
  @IsNotEmpty({ message: 'La fecha de inscripción es obligatoria' })
  fecha_inscripcion: Date;

  @IsNumber({}, { message: 'La nota debe ser un número' })
  @Min(0, { message: 'La nota mínima es 0' })
  @Max(5, { message: 'La nota máxima es 5' })
  @IsOptional()
  nota?: number;

  @IsEnum(['inscrito', 'cursando', 'aprobado', 'reprobado', 'retirado'], {
    message: 'El estado debe ser: inscrito, cursando, aprobado, reprobado o retirado'
  })
  @IsOptional()
  estado?: 'inscrito' | 'cursando' | 'aprobado' | 'reprobado' | 'retirado';

  @IsString()
  @IsOptional()
  observaciones?: string;

  @IsInt({ message: 'El ID del estudiante debe ser un número entero' })
  @IsNotEmpty({ message: 'El ID del estudiante es obligatorio' })
  estudiante_id: number;

  @IsInt({ message: 'El ID del curso debe ser un número entero' })
  @IsNotEmpty({ message: 'El ID del curso es obligatorio' })
  curso_id: number;
}