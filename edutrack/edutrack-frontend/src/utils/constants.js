// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

// User Roles
export const ROLES = {
  PROFESOR: 'profesor',
  ESTUDIANTE: 'estudiante',
};

// Estados de Inscripción
export const ESTADOS_INSCRIPCION = {
  INSCRITO: 'inscrito',
  CURSANDO: 'cursando',
  APROBADO: 'aprobado',
  REPROBADO: 'reprobado',
  RETIRADO: 'retirado',
};

export const ESTADOS_INSCRIPCION_LABELS = {
  inscrito: 'Inscrito',
  cursando: 'Cursando',
  aprobado: 'Aprobado',
  reprobado: 'Reprobado',
  retirado: 'Retirado',
};

export const ESTADOS_INSCRIPCION_COLORS = {
  inscrito: 'var(--info)',
  cursando: 'var(--warning)',
  aprobado: 'var(--success)',
  reprobado: 'var(--danger)',
  retirado: 'var(--gray-400)',
};

// Rangos de Notas
export const NOTA_MINIMA = 0;
export const NOTA_MAXIMA = 5;
export const NOTA_APROBATORIA = 3;

// Límites de Paginación
export const ITEMS_PER_PAGE = 10;
export const MAX_ITEMS_PER_PAGE = 50;

// Límites de Campos
export const LIMITS = {
  NOMBRE_MIN: 3,
  NOMBRE_MAX: 255,
  PASSWORD_MIN: 8,
  BIOGRAFIA_MAX: 1000,
  DESCRIPCION_MAX: 500,
  TELEFONO_LENGTH: 10,
  CREDITOS_MIN: 1,
  CREDITOS_MAX: 10,
  CUPO_MIN: 1,
  CUPO_MAX: 100,
  SEMESTRE_MIN: 1,
  SEMESTRE_MAX: 12,
  ANIO_MIN: 2000,
  ANIO_MAX: new Date().getFullYear() + 1,
};

// Mensajes de Error Comunes
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'Este campo es obligatorio',
  INVALID_EMAIL: 'El correo electrónico no es válido',
  PASSWORD_TOO_SHORT: `La contraseña debe tener al menos ${LIMITS.PASSWORD_MIN} caracteres`,
  PASSWORD_WEAK: 'La contraseña debe contener mayúscula, minúscula, número y carácter especial',
  PASSWORDS_DONT_MATCH: 'Las contraseñas no coinciden',
  INVALID_PHONE: 'El teléfono debe tener 10 dígitos',
  INVALID_DATE: 'La fecha no es válida',
  INVALID_NUMBER: 'Debe ser un número válido',
  MIN_VALUE: (min) => `El valor mínimo es ${min}`,
  MAX_VALUE: (max) => `El valor máximo es ${max}`,
  MIN_LENGTH: (min) => `Debe tener al menos ${min} caracteres`,
  MAX_LENGTH: (max) => `No puede exceder ${max} caracteres`,
  NETWORK_ERROR: 'No se pudo conectar con el servidor. Verifica tu conexión.',
  UNAUTHORIZED: 'No tienes permisos para realizar esta acción',
  SERVER_ERROR: 'Error en el servidor. Por favor intenta más tarde.',
};

// Mensajes de Éxito
export const SUCCESS_MESSAGES = {
  CREATED: 'Creado exitosamente',
  UPDATED: 'Actualizado exitosamente',
  DELETED: 'Eliminado exitosamente',
  LOGIN: 'Inicio de sesión exitoso',
  REGISTER: 'Registro exitoso',
  INSCRIPCION: 'Inscripción realizada exitosamente',
};

// Colores Pasteles (coinciden con el CSS)
export const COLORS = {
  PRIMARY: '#A8DADC',
  PRIMARY_DARK: '#457B9D',
  SECONDARY: '#F1FAEE',
  ACCENT: '#E63946',
  PASTEL_PURPLE: '#C8B6E2',
  PASTEL_PINK: '#FFB6C1',
  PASTEL_GREEN: '#B8E6B8',
  PASTEL_YELLOW: '#FFF4B7',
  PASTEL_PEACH: '#FFCBA4',
  PASTEL_BLUE: '#B3D9E8',
};

// Iconos por Rol
export const ROLE_ICONS = {
  [ROLES.PROFESOR]: '👨‍🏫',
  [ROLES.ESTUDIANTE]: '🎓',
};

// Formato de Fechas
export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

// LocalStorage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
};

// Rutas de la Aplicación
export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  CURSOS: '/cursos',
  PROFESORES: '/profesores',
  ESTUDIANTES: '/estudiantes',
  INSCRIPCIONES: '/inscripciones',
};

// Especialidades de Profesores (Ejemplos)
export const ESPECIALIDADES = [
  'Matemáticas',
  'Física',
  'Química',
  'Biología',
  'Historia',
  'Geografía',
  'Literatura',
  'Inglés',
  'Educación Física',
  'Artes',
  'Música',
  'Programación',
  'Ingeniería',
  'Administración',
  'Economía',
];

// Carreras (Ejemplos)
export const CARRERAS = [
  'Ingeniería de Sistemas',
  'Ingeniería Civil',
  'Ingeniería Industrial',
  'Medicina',
  'Derecho',
  'Administración de Empresas',
  'Contaduría Pública',
  'Psicología',
  'Arquitectura',
  'Diseño Gráfico',
  'Comunicación Social',
  'Economía',
];

// Expresiones Regulares
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  PHONE: /^[0-9]{10}$/,
  ONLY_NUMBERS: /^\d+$/,
  ONLY_LETTERS: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
};

export default {
  API_URL,
  ROLES,
  ESTADOS_INSCRIPCION,
  ESTADOS_INSCRIPCION_LABELS,
  ESTADOS_INSCRIPCION_COLORS,
  NOTA_MINIMA,
  NOTA_MAXIMA,
  NOTA_APROBATORIA,
  ITEMS_PER_PAGE,
  MAX_ITEMS_PER_PAGE,
  LIMITS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  COLORS,
  ROLE_ICONS,
  DATE_FORMAT,
  DATETIME_FORMAT,
  STORAGE_KEYS,
  ROUTES,
  ESPECIALIDADES,
  CARRERAS,
  REGEX,
};