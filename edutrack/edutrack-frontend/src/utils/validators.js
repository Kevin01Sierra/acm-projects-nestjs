import { REGEX, LIMITS, ERROR_MESSAGES } from './constants';

/**
 * Valida si un campo está vacío
 */
export const isRequired = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  return true;
};

/**
 * Valida formato de email
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  return REGEX.EMAIL.test(email.toLowerCase());
};

/**
 * Valida contraseña fuerte
 */
export const isValidPassword = (password) => {
  if (!password || password.length < LIMITS.PASSWORD_MIN) return false;
  return REGEX.PASSWORD.test(password);
};

/**
 * Valida que las contraseñas coincidan
 */
export const passwordsMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

/**
 * Valida formato de teléfono (10 dígitos)
 */
export const isValidPhone = (phone) => {
  if (!phone) return true; // Es opcional
  return REGEX.PHONE.test(phone);
};

/**
 * Valida longitud mínima
 */
export const minLength = (value, min) => {
  if (!value) return false;
  return value.length >= min;
};

/**
 * Valida longitud máxima
 */
export const maxLength = (value, max) => {
  if (!value) return true;
  return value.length <= max;
};

/**
 * Valida rango de números
 */
export const isInRange = (value, min, max) => {
  const num = Number(value);
  if (isNaN(num)) return false;
  return num >= min && num <= max;
};

/**
 * Valida que sea un número positivo
 */
export const isPositiveNumber = (value) => {
  const num = Number(value);
  return !isNaN(num) && num > 0;
};

/**
 * Valida fecha válida
 */
export const isValidDate = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

/**
 * Valida que la fecha no sea futura
 */
export const isNotFutureDate = (dateString) => {
  if (!isValidDate(dateString)) return false;
  const date = new Date(dateString);
  const today = new Date();
  return date <= today;
};

/**
 * Valida nota (0-5)
 */
export const isValidNota = (nota) => {
  const num = Number(nota);
  if (isNaN(num)) return false;
  return num >= 0 && num <= 5;
};

/**
 * Valida año de ingreso
 */
export const isValidAnioIngreso = (anio) => {
  const num = Number(anio);
  if (isNaN(num)) return false;
  return num >= LIMITS.ANIO_MIN && num <= LIMITS.ANIO_MAX;
};

/**
 * Valida créditos del curso
 */
export const isValidCreditos = (creditos) => {
  const num = Number(creditos);
  if (isNaN(num)) return false;
  return num >= LIMITS.CREDITOS_MIN && num <= LIMITS.CREDITOS_MAX;
};

/**
 * Valida cupo del curso
 */
export const isValidCupo = (cupo) => {
  const num = Number(cupo);
  if (isNaN(num)) return false;
  return num >= LIMITS.CUPO_MIN && num <= LIMITS.CUPO_MAX;
};

/**
 * Valida semestre
 */
export const isValidSemestre = (semestre) => {
  const num = Number(semestre);
  if (isNaN(num)) return false;
  return num >= LIMITS.SEMESTRE_MIN && num <= LIMITS.SEMESTRE_MAX;
};

/**
 * Validador de formulario de usuario
 */
export const validateUserForm = (formData) => {
  const errors = {};

  // Nombre completo
  if (!isRequired(formData.nombre_completo)) {
    errors.nombre_completo = ERROR_MESSAGES.REQUIRED_FIELD;
  } else if (!minLength(formData.nombre_completo, LIMITS.NOMBRE_MIN)) {
    errors.nombre_completo = ERROR_MESSAGES.MIN_LENGTH(LIMITS.NOMBRE_MIN);
  } else if (!maxLength(formData.nombre_completo, LIMITS.NOMBRE_MAX)) {
    errors.nombre_completo = ERROR_MESSAGES.MAX_LENGTH(LIMITS.NOMBRE_MAX);
  }

  // Email
  if (!isRequired(formData.correo)) {
    errors.correo = ERROR_MESSAGES.REQUIRED_FIELD;
  } else if (!isValidEmail(formData.correo)) {
    errors.correo = ERROR_MESSAGES.INVALID_EMAIL;
  }

  // Contraseña (solo si está presente)
  if (formData.contrasena) {
    if (!isValidPassword(formData.contrasena)) {
      errors.contrasena = ERROR_MESSAGES.PASSWORD_WEAK;
    }
  }

  // Rol
  if (!isRequired(formData.rol)) {
    errors.rol = ERROR_MESSAGES.REQUIRED_FIELD;
  }

  return errors;
};

/**
 * Validador de formulario de registro
 */
export const validateRegisterForm = (formData) => {
  const errors = validateUserForm(formData);

  // Contraseña obligatoria en registro
  if (!isRequired(formData.contrasena)) {
    errors.contrasena = ERROR_MESSAGES.REQUIRED_FIELD;
  } else if (formData.contrasena.length < LIMITS.PASSWORD_MIN) {
    errors.contrasena = ERROR_MESSAGES.PASSWORD_TOO_SHORT;
  }

  // Confirmar contraseña
  if (!isRequired(formData.confirmarContrasena)) {
    errors.confirmarContrasena = ERROR_MESSAGES.REQUIRED_FIELD;
  } else if (!passwordsMatch(formData.contrasena, formData.confirmarContrasena)) {
    errors.confirmarContrasena = ERROR_MESSAGES.PASSWORDS_DONT_MATCH;
  }

  return errors;
};

/**
 * Validador de formulario de login
 */
export const validateLoginForm = (formData) => {
  const errors = {};

  if (!isRequired(formData.correo)) {
    errors.correo = ERROR_MESSAGES.REQUIRED_FIELD;
  } else if (!isValidEmail(formData.correo)) {
    errors.correo = ERROR_MESSAGES.INVALID_EMAIL;
  }

  if (!isRequired(formData.contrasena)) {
    errors.contrasena = ERROR_MESSAGES.REQUIRED_FIELD;
  }

  return errors;
};

/**
 * Validador de formulario de profesor
 */
export const validateProfesorForm = (formData) => {
  const errors = {};

  if (!isRequired(formData.especialidad)) {
    errors.especialidad = ERROR_MESSAGES.REQUIRED_FIELD;
  } else if (!minLength(formData.especialidad, LIMITS.NOMBRE_MIN)) {
    errors.especialidad = ERROR_MESSAGES.MIN_LENGTH(LIMITS.NOMBRE_MIN);
  }

  if (formData.telefono && !isValidPhone(formData.telefono)) {
    errors.telefono = ERROR_MESSAGES.INVALID_PHONE;
  }

  if (formData.biografia && !maxLength(formData.biografia, LIMITS.BIOGRAFIA_MAX)) {
    errors.biografia = ERROR_MESSAGES.MAX_LENGTH(LIMITS.BIOGRAFIA_MAX);
  }

  if (!isRequired(formData.usuario_id)) {
    errors.usuario_id = ERROR_MESSAGES.REQUIRED_FIELD;
  }

  return errors;
};

/**
 * Validador de formulario de estudiante
 */
export const validateEstudianteForm = (formData) => {
  const errors = {};

  if (!isRequired(formData.anio_ingreso)) {
    errors.anio_ingreso = ERROR_MESSAGES.REQUIRED_FIELD;
  } else if (!isValidAnioIngreso(formData.anio_ingreso)) {
    errors.anio_ingreso = `Año debe estar entre ${LIMITS.ANIO_MIN} y ${LIMITS.ANIO_MAX}`;
  }

  if (formData.telefono && !isValidPhone(formData.telefono)) {
    errors.telefono = ERROR_MESSAGES.INVALID_PHONE;
  }

  if (formData.semestre_actual && !isValidSemestre(formData.semestre_actual)) {
    errors.semestre_actual = `Semestre debe estar entre ${LIMITS.SEMESTRE_MIN} y ${LIMITS.SEMESTRE_MAX}`;
  }

  if (!isRequired(formData.usuario_id)) {
    errors.usuario_id = ERROR_MESSAGES.REQUIRED_FIELD;
  }

  return errors;
};

/**
 * Validador de formulario de curso
 */
export const validateCursoForm = (formData) => {
  const errors = {};

  if (!isRequired(formData.nombre)) {
    errors.nombre = ERROR_MESSAGES.REQUIRED_FIELD;
  } else if (!minLength(formData.nombre, LIMITS.NOMBRE_MIN)) {
    errors.nombre = ERROR_MESSAGES.MIN_LENGTH(LIMITS.NOMBRE_MIN);
  }

  if (!isRequired(formData.descripcion)) {
    errors.descripcion = ERROR_MESSAGES.REQUIRED_FIELD;
  } else if (!maxLength(formData.descripcion, LIMITS.DESCRIPCION_MAX)) {
    errors.descripcion = ERROR_MESSAGES.MAX_LENGTH(LIMITS.DESCRIPCION_MAX);
  }

  if (!isRequired(formData.creditos)) {
    errors.creditos = ERROR_MESSAGES.REQUIRED_FIELD;
  } else if (!isValidCreditos(formData.creditos)) {
    errors.creditos = `Créditos debe estar entre ${LIMITS.CREDITOS_MIN} y ${LIMITS.CREDITOS_MAX}`;
  }

  if (!isRequired(formData.codigo_curso)) {
    errors.codigo_curso = ERROR_MESSAGES.REQUIRED_FIELD;
  }

  if (formData.cupo_maximo && !isValidCupo(formData.cupo_maximo)) {
    errors.cupo_maximo = `Cupo debe estar entre ${LIMITS.CUPO_MIN} y ${LIMITS.CUPO_MAX}`;
  }

  if (!isRequired(formData.profesor_id)) {
    errors.profesor_id = ERROR_MESSAGES.REQUIRED_FIELD;
  }

  return errors;
};

/**
 * Validador de formulario de inscripción
 */
export const validateInscripcionForm = (formData) => {
  const errors = {};

  if (!isRequired(formData.fecha_inscripcion)) {
    errors.fecha_inscripcion = ERROR_MESSAGES.REQUIRED_FIELD;
  } else if (!isValidDate(formData.fecha_inscripcion)) {
    errors.fecha_inscripcion = ERROR_MESSAGES.INVALID_DATE;
  }

  if (formData.nota && !isValidNota(formData.nota)) {
    errors.nota = `La nota debe estar entre 0 y 5`;
  }

  if (!isRequired(formData.estudiante_id)) {
    errors.estudiante_id = ERROR_MESSAGES.REQUIRED_FIELD;
  }

  if (!isRequired(formData.curso_id)) {
    errors.curso_id = ERROR_MESSAGES.REQUIRED_FIELD;
  }

  return errors;
};

/**
 * Formatea errores de API para mostrar
 */
export const formatApiError = (error) => {
  if (typeof error === 'string') return error;
  if (error.message) return error.message;
  if (error.errors && Array.isArray(error.errors)) {
    return error.errors.join(', ');
  }
  return ERROR_MESSAGES.SERVER_ERROR;
};

/**
 * Sanitiza input para prevenir XSS
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};

export default {
  isRequired,
  isValidEmail,
  isValidPassword,
  passwordsMatch,
  isValidPhone,
  minLength,
  maxLength,
  isInRange,
  isPositiveNumber,
  isValidDate,
  isNotFutureDate,
  isValidNota,
  isValidAnioIngreso,
  isValidCreditos,
  isValidCupo,
  isValidSemestre,
  validateUserForm,
  validateRegisterForm,
  validateLoginForm,
  validateProfesorForm,
  validateEstudianteForm,
  validateCursoForm,
  validateInscripcionForm,
  formatApiError,
  sanitizeInput,
};