import { PartialType } from '@nestjs/mapped-types';
import { CreateCursoDto } from './create-curso.dto';
import { IsOptional, IsBoolean } from 'class-validator';

export class UpdateCursoDto extends PartialType(CreateCursoDto) {
  @IsOptional()
  @IsBoolean({ message: 'El campo activo debe ser un valor booleano' })
  activo?: boolean;
}