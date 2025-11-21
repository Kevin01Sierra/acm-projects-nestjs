import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Profesor } from '../../profesores/entities/profesor.entity';
import { Inscripcion } from '../../inscripciones/entities/inscripcion.entity';

@Entity('cursos')
export class Curso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'int' })
  creditos: number;

  @Column({ type: 'varchar', length: 50 })
  codigo_curso: string;

  @Column({ type: 'int', default: 30 })
  cupo_maximo: number;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @CreateDateColumn()
  creado_en: Date;

  @UpdateDateColumn()
  actualizado_en: Date;

  // Relación muchos a uno con Profesor
  @ManyToOne(() => Profesor, profesor => profesor.cursos, {
    eager: true,
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'profesor_id' })
  profesor: Profesor;

  // Relación uno a muchos con Inscripciones
  @OneToMany(() => Inscripcion, inscripcion => inscripcion.curso)
  inscripciones: Inscripcion[];
}