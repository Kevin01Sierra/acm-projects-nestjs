import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Inscripcion } from '../../inscripciones/entities/inscripcion.entity';

@Entity('estudiantes')
export class Estudiante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  anio_ingreso: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  carrera: string;

  @Column({ type: 'int', default: 1 })
  semestre_actual: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  telefono: string;

  @CreateDateColumn()
  creado_en: Date;

  @UpdateDateColumn()
  actualizado_en: Date;

  // Relación uno a uno con Usuario
  @OneToOne(() => User, user => user.estudiante, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;

  // Relación uno a muchos con Inscripciones
  @OneToMany(() => Inscripcion, inscripcion => inscripcion.estudiante)
  inscripciones: Inscripcion[];
}