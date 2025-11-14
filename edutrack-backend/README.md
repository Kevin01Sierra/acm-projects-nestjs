# 🎓 Sistema EduTrack - Backend API

## Proyecto Final - Desarrollo Backend con NestJS

## 📋 Descripción del Proyecto

**EduTrack** es un sistema de gestión académica desarrollado con NestJS que permite administrar usuarios, profesores, estudiantes, cursos e inscripciones para una institución educativa.

El sistema implementa:
- ✅ Arquitectura modular con NestJS
- ✅ Base de datos relacional con TypeORM y PostgreSQL
- ✅ Validación de datos con DTOs y class-validator
- ✅ Encriptación de contraseñas con bcrypt
- ✅ Operaciones CRUD completas
- ✅ Relaciones entre entidades (1:1, 1:N)
- ✅ Manejo robusto de errores

---

## 🏗️ Arquitectura del Sistema

### Entidades y Relaciones

```
Usuario (User)
├── id: number (PK)
├── nombre_completo: string
├── correo: string (unique)
├── contrasena: string (encrypted)
├── rol: 'profesor' | 'estudiante'
└── activo: boolean

Profesor
├── id: number (PK)
├── especialidad: string
├── biografia: string
├── telefono: string
└── usuario_id → User (1:1)

Estudiante
├── id: number (PK)
├── anio_ingreso: number
├── carrera: string
├── semestre_actual: number
├── telefono: string
└── usuario_id → User (1:1)

Curso
├── id: number (PK)
├── nombre: string
├── descripcion: string
├── creditos: number
├── codigo_curso: string
├── cupo_maximo: number
├── activo: boolean
└── profesor_id → Profesor (N:1)

Inscripcion
├── id: number (PK)
├── fecha_inscripcion: date
├── nota: decimal
├── estado: enum
├── observaciones: string
├── estudiante_id → Estudiante (N:1)
└── curso_id → Curso (N:1)
```

---

## 🚀 Instalación

### Prerrequisitos

- Node.js 18+
- npm 9+
- PostgreSQL 14+

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <url-repositorio>
cd edutrack-backend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crear archivo `.env` en la raíz:
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_password
DB_DATABASE=edutrack

# Application
PORT=3000
NODE_ENV=development

# Frontend (para CORS)
FRONTEND_URL=http://localhost:5173
```

4. **Crear base de datos en PostgreSQL**
```sql
CREATE DATABASE edutrack;
```

5. **Ejecutar la aplicación**
```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run build
npm run start:prod
```

---

## 📚 Endpoints de la API

### Base URL: `http://localhost:3000/api/v1`

### 👤 Usuarios (`/users`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/users` | Crear nuevo usuario |
| GET | `/users` | Listar todos los usuarios |
| GET | `/users?rol=profesor` | Filtrar por rol |
| GET | `/users/:id` | Obtener usuario por ID |
| GET | `/users/count` | Contar usuarios |
| PATCH | `/users/:id` | Actualizar usuario |
| DELETE | `/users/:id` | Eliminar usuario |

### 📝 Ejemplos de Uso

#### Crear Usuario (POST /users)
```json
{
  "nombre_completo": "Juan Pérez García",
  "correo": "juan.perez@edutrack.com",
  "contrasena": "Secure123!@#",
  "rol": "estudiante"
}
```

**Validaciones:**
- `nombre_completo`: mínimo 3 caracteres, máximo 255
- `correo`: debe ser email válido y único
- `contrasena`: mínimo 8 caracteres, debe contener mayúscula, minúscula, número y carácter especial
- `rol`: solo 'profesor' o 'estudiante'

#### Respuesta Exitosa (201 Created)
```json
{
  "id": 1,
  "nombre_completo": "Juan Pérez García",
  "correo": "juan.perez@edutrack.com",
  "rol": "estudiante",
  "activo": true,
  "creado_en": "2025-11-13T10:30:00.000Z",
  "actualizado_en": "2025-11-13T10:30:00.000Z"
}
```

**Nota:** La contraseña nunca se devuelve en las respuestas.

#### Actualizar Usuario (PATCH /users/:id)
```json
{
  "nombre_completo": "Juan Pérez García Jr.",
  "activo": true
}
```

#### Listar Usuarios (GET /users)
```json
[
  {
    "id": 1,
    "nombre_completo": "Juan Pérez García",
    "correo": "juan.perez@edutrack.com",
    "rol": "estudiante",
    "activo": true,
    "creado_en": "2025-11-13T10:30:00.000Z",
    "actualizado_en": "2025-11-13T10:30:00.000Z",
    "estudiante": {
      "id": 1,
      "anio_ingreso": 2024,
      "carrera": "Ingeniería de Sistemas",
      "semestre_actual": 1
    }
  }
]
```

---

## 🗄️ Estructura del Proyecto

```
edutrack-backend/
├── src/
│   ├── users/
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts
│   │   │   └── update-user.dto.ts
│   │   ├── entities/
│   │   │   └── user.entity.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   ├── profesores/
│   │   ├── dto/
│   │   ├── entities/
│   │   │   └── profesor.entity.ts
│   │   ├── profesores.controller.ts
│   │   ├── profesores.service.ts
│   │   └── profesores.module.ts
│   ├── estudiantes/
│   │   ├── dto/
│   │   ├── entities/
│   │   │   └── estudiante.entity.ts
│   │   ├── estudiantes.controller.ts
│   │   ├── estudiantes.service.ts
│   │   └── estudiantes.module.ts
│   ├── cursos/
│   │   ├── dto/
│   │   ├── entities/
│   │   │   └── curso.entity.ts
│   │   ├── cursos.controller.ts
│   │   ├── cursos.service.ts
│   │   └── cursos.module.ts
│   ├── inscripciones/
│   │   ├── dto/
│   │   ├── entities/
│   │   │   └── inscripcion.entity.ts
│   │   ├── inscripciones.controller.ts
│   │   ├── inscripciones.service.ts
│   │   └── inscripciones.module.ts
│   ├── app.module.ts
│   └── main.ts
├── .env
├── .env.template
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔐 Seguridad

### Encriptación de Contraseñas

El sistema utiliza **bcrypt** para encriptar contraseñas con un salt de 10 rondas:

```typescript
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);
```

### Validaciones de Contraseña

Las contraseñas deben cumplir:
- ✅ Mínimo 8 caracteres
- ✅ Al menos una letra mayúscula
- ✅ Al menos una letra minúscula
- ✅ Al menos un número
- ✅ Al menos un carácter especial (@$!%*?&)

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Uso |
|------------|---------|-----|
| NestJS | 10.x | Framework backend |
| TypeScript | 5.x | Lenguaje de programación |
| TypeORM | 0.3.x | ORM para PostgreSQL |
| PostgreSQL | 14+ | Base de datos relacional |
| class-validator | 0.14.x | Validación de DTOs |
| class-transformer | 0.5.x | Transformación de datos |
| bcrypt | 5.x | Encriptación de contraseñas |
| @nestjs/config | 3.x | Gestión de variables de entorno |

---

## ✅ Criterios de Evaluación Cumplidos

### Primera Entrega (14 de noviembre)

- [x] Proyecto NestJS correctamente configurado
- [x] Entidades y relaciones con TypeORM
- [x] DTOs con validaciones básicas
- [x] Servicio de usuarios implementado
- [x] Endpoints CRUD funcionales
- [x] README.md con instrucciones

### Criterios Generales

| Criterio | Peso | Estado |
|----------|------|--------|
| Entidades y relaciones (TypeORM) | 25% | ✅ Completado |
| DTOs y validación | 20% | ✅ Completado |
| Servicio con lógica de negocio | 20% | ✅ Completado |
| Encriptación de contraseñas | 15% | ✅ Completado |
| Autenticación JWT (opcional) | 5% | ⏳ Entrega final |
| Guards (opcional) | 5% | ⏳ Entrega final |
| Interfaz gráfica | 10% | ⏳ Entrega final |

---

## 🧪 Pruebas

### Con Postman

1. Importar la colección de Postman (incluida en el repositorio)
2. Configurar la variable de entorno `baseUrl` = `http://localhost:3000/api/v1`
3. Ejecutar las peticiones en orden

### Con cURL

```bash
# Crear usuario
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "nombre_completo": "Test User",
    "correo": "test@edutrack.com",
    "contrasena": "Test123!@#",
    "rol": "estudiante"
  }'

# Listar usuarios
curl http://localhost:3000/api/v1/users

# Obtener usuario por ID
curl http://localhost:3000/api/v1/users/1

# Actualizar usuario
curl -X PATCH http://localhost:3000/api/v1/users/1 \
  -H "Content-Type: application/json" \
  -d '{"activo": false}'

# Eliminar usuario
curl -X DELETE http://localhost:3000/api/v1/users/1
```

---

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod

# Formato
npm run format

# Linting
npm run lint
```

---

## 🚧 Roadmap - Entrega Final (28 de noviembre)

- [ ] Sistema de autenticación con JWT
- [ ] Estrategias de Passport
- [ ] Guards para control de acceso
- [ ] Interfaz gráfica (frontend)

---

## 👨‍💻 Autor

**Kevin Nicolás Sierra González**
- Código: 20182020151
- Carrera: Ingeniería de Sistemas
- Semestre: 2025-3

---

## 📄 Licencia

Este proyecto es de uso académico para el curso de Desarrollo Backend con NestJS.

---

## 📬 Contacto

- LinkedIn: [linkedin.com/in/kvnnsig](https://linkedin.com/in/kvnnsig/)
- GitHub: [github.com/Kevin01Sierra](https://github.com/Kevin01Sierra)

---

<p align="center">
  <b>© 2025 - Sistema EduTrack | Proyecto Final NestJS</b>
</p>