import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Curso } from '../../cursos/entities/curso.entity';

@Entity('profesores')
export class Profesor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  especialidad: string;

  @Column({ type: 'text', nullable: true })
  biografia: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  telefono: string;

  @CreateDateColumn()
  creado_en: Date;

  @UpdateDateColumn()
  actualizado_en: Date;

  // Relación uno a uno con Usuario
  @OneToOne(() => User, user => user.profesor, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;

  // Relación uno a muchos con Cursos
  @OneToMany(() => Curso, curso => curso.profesor)
  cursos: Curso[];
}