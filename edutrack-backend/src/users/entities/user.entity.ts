import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { Profesor } from '../../profesores/entities/profesor.entity';
import { Estudiante } from '../../estudiantes/entities/estudiante.entity';

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre_completo: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  correo: string;

  @Column({ type: 'varchar', length: 255 })
  contrasena: string;

  @Column({ 
    type: 'enum', 
    enum: ['profesor', 'estudiante'],
  })
  rol: 'profesor' | 'estudiante';

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @CreateDateColumn()
  creado_en: Date;

  @UpdateDateColumn()
  actualizado_en: Date;

  // Relación uno a uno con Profesor (opcional, solo si el rol es profesor)
  @OneToOne(() => Profesor, profesor => profesor.usuario, { 
    cascade: true,
    nullable: true 
  })
  profesor?: Profesor;

  // Relación uno a uno con Estudiante (opcional, solo si el rol es estudiante)
  @OneToOne(() => Estudiante, estudiante => estudiante.usuario, { 
    cascade: true,
    nullable: true 
  })
  estudiante?: Estudiante;
}