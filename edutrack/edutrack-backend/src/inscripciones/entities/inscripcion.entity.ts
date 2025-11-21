import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Estudiante } from '../../estudiantes/entities/estudiante.entity';
import { Curso } from '../../cursos/entities/curso.entity';

@Entity('inscripciones')
export class Inscripcion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha_inscripcion: Date;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  nota: number;

  @Column({ 
    type: 'enum',
    enum: ['inscrito', 'cursando', 'aprobado', 'reprobado', 'retirado'],
    default: 'inscrito'
  })
  estado: 'inscrito' | 'cursando' | 'aprobado' | 'reprobado' | 'retirado';

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @CreateDateColumn()
  creado_en: Date;

  @UpdateDateColumn()
  actualizado_en: Date;

  // Relación muchos a uno con Estudiante
  @ManyToOne(() => Estudiante, estudiante => estudiante.inscripciones, {
    eager: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'estudiante_id' })
  estudiante: Estudiante;

  // Relación muchos a uno con Curso
  @ManyToOne(() => Curso, curso => curso.inscripciones, {
    eager: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'curso_id' })
  curso: Curso;
}