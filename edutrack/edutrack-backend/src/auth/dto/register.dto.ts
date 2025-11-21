import { IsString, IsNotEmpty, IsEmail, IsEnum, MinLength, MaxLength, Matches } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre completo es obligatorio' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(255, { message: 'El nombre no puede exceder 255 caracteres' })
  nombre_completo: string;

  @IsEmail({}, { message: 'Debe proporcionar un correo electrónico válido' })
  @IsNotEmpty({ message: 'El correo es obligatorio' })
  correo: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    { 
      message: 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial' 
    }
  )
  contrasena: string;

  @IsEnum(['profesor', 'estudiante'], { 
    message: 'El rol debe ser "profesor" o "estudiante"' 
  })
  @IsNotEmpty({ message: 'El rol es obligatorio' })
  rol: 'profesor' | 'estudiante';
}