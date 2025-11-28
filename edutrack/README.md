# 🎓 Sistema EduTrack - Plataforma de Gestión Académica

## Proyecto Final - Desarrollo Full Stack con NestJS y React

---

## 📋 Descripción del Proyecto

**EduTrack** es una plataforma completa de gestión académica que permite administrar usuarios, profesores, estudiantes, cursos e inscripciones para una institución educativa. El sistema está compuesto por un backend robusto desarrollado con NestJS y un frontend moderno desarrollado con React.

### Características Principales

- ✅ **Autenticación y Autorización**: Sistema completo con JWT y control de acceso basado en roles (Admin, Profesor, Estudiante)
- ✅ **Gestión de Usuarios**: CRUD completo con roles diferenciados
- ✅ **Gestión Académica**: Administración de profesores, estudiantes, cursos e inscripciones
- ✅ **Interfaz Intuitiva**: Dashboard personalizado según el rol del usuario
- ✅ **Seguridad**: Encriptación de contraseñas, guards de autenticación y autorización
- ✅ **Validación de Datos**: Validaciones robustas tanto en backend como frontend
- ✅ **Arquitectura Modular**: Código organizado y escalable

---

## 🏗️ Arquitectura del Sistema

### Stack Tecnológico

#### Backend (edutrack-backend)

- **Framework**: NestJS 10.x
- **Lenguaje**: TypeScript 5.x
- **Base de Datos**: PostgreSQL 14+
- **ORM**: TypeORM 0.3.x
- **Autenticación**: JWT (JSON Web Tokens)
- **Validación**: class-validator, class-transformer
- **Seguridad**: bcrypt para encriptación de contraseñas

#### Frontend (edutrack-frontend)

- **Framework**: React 19.x
- **Routing**: React Router DOM 7.x
- **Build Tool**: Vite 7.x
- **HTTP Client**: Axios 1.x
- **Estilos**: CSS Modules

### Entidades y Relaciones

```
Usuario (User)
├── id: number (PK)
├── nombre_completo: string
├── correo: string (unique)
├── contrasena: string (encrypted)
├── rol: 'admin' | 'profesor' | 'estudiante'
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
├── estado: 'inscrito' | 'aprobado' | 'reprobado' | 'retirado'
├── observaciones: string
├── estudiante_id → Estudiante (N:1)
└── curso_id → Curso (N:1)
```

---

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+
- npm 9+
- PostgreSQL 14+

### 1. Clonar el Repositorio

```bash
git clone <url-repositorio>
cd edutrack
```

### 2. Configurar Backend

```bash
cd edutrack-backend
npm install
```

Crear archivo `.env` en `edutrack-backend/`:

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

# JWT
JWT_SECRET=tu_secret_key_super_segura_aqui

# Frontend (para CORS)
FRONTEND_URL=http://localhost:5173
```

Crear base de datos:

```sql
CREATE DATABASE edutrack;
```

Iniciar backend:

```bash
npm run start:dev
```

El backend estará disponible en `http://localhost:3000`

### 3. Configurar Frontend

```bash
cd edutrack-frontend
npm install
```

Crear archivo `.env` en `edutrack-frontend/`:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

Iniciar frontend:

```bash
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

---

## 📚 Funcionalidades por Rol

### 👨‍💼 Administrador

- ✅ Gestión completa de usuarios (crear, editar, eliminar)
- ✅ Gestión de profesores y estudiantes
- ✅ Gestión de cursos (asignar profesores, establecer cupos)
- ✅ Gestión de inscripciones (aprobar, rechazar, asignar notas)
- ✅ Visualización de estadísticas del sistema

### 👨‍🏫 Profesor

- ✅ Ver y editar sus cursos asignados
- ✅ Ver lista de estudiantes inscritos en sus cursos
- ✅ Gestionar inscripciones de sus cursos
- ✅ Asignar y modificar notas finales

### 🎓 Estudiante

- ✅ Ver sus cursos inscritos
- ✅ Inscribirse en nuevos cursos disponibles
- ✅ Ver sus calificaciones y estado de inscripciones
- ✅ Visualizar información de profesores y cursos

---

## 🔐 Autenticación y Seguridad

### Sistema de Autenticación

El sistema utiliza **JWT (JSON Web Tokens)** para la autenticación:

1. El usuario inicia sesión con correo y contraseña
2. El backend valida las credenciales y genera un token JWT
3. El token se almacena en localStorage del navegador
4. Todas las peticiones subsecuentes incluyen el token en el header `Authorization`
5. El backend valida el token y los permisos en cada petición

### Roles y Permisos

| Recurso       | Admin | Profesor         | Estudiante    |
| ------------- | ----- | ---------------- | ------------- |
| Usuarios      | CRUD  | -                | -             |
| Profesores    | CRUD  | R                | R             |
| Estudiantes   | CRUD  | R                | -             |
| Cursos        | CRUD  | CRU (propios)    | R (inscritos) |
| Inscripciones | CRUD  | CRU (sus cursos) | CR (propias)  |

**Leyenda**: C=Crear, R=Leer, U=Actualizar, D=Eliminar

### Validación de Contraseñas

Las contraseñas deben cumplir:

- ✅ Mínimo 8 caracteres
- ✅ Al menos una letra mayúscula
- ✅ Al menos una letra minúscula
- ✅ Al menos un número
- ✅ Al menos un carácter especial (@$!%\*?&)

---

## 🗂️ Estructura del Proyecto

```
edutrack/
├── edutrack-backend/          # Backend NestJS
│   ├── src/
│   │   ├── auth/              # Módulo de autenticación
│   │   │   ├── guards/        # Guards (JWT, Roles)
│   │   │   ├── decorators/    # Decoradores personalizados
│   │   │   └── strategies/    # Estrategias de Passport
│   │   ├── users/             # Módulo de usuarios
│   │   ├── profesores/        # Módulo de profesores
│   │   ├── estudiantes/       # Módulo de estudiantes
│   │   ├── cursos/            # Módulo de cursos
│   │   ├── inscripciones/     # Módulo de inscripciones
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env
│   ├── package.json
│   └── README.md
│
├── edutrack-frontend/         # Frontend React
│   ├── src/
│   │   ├── components/        # Componentes reutilizables
│   │   │   ├── auth/          # Login, Register
│   │   │   ├── common/        # Button, Input, Card, etc.
│   │   │   ├── cursos/        # Gestión de cursos
│   │   │   ├── estudiantes/   # Gestión de estudiantes
│   │   │   ├── inscripciones/ # Gestión de inscripciones
│   │   │   ├── layout/        # Navbar, Footer
│   │   │   └── profesores/    # Gestión de profesores
│   │   ├── context/           # Context API (Auth, Notifications)
│   │   ├── pages/             # Páginas principales
│   │   ├── services/          # Servicios API
│   │   ├── utils/             # Utilidades y validadores
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   └── index.html
│
└── README.md                  # Este archivo
```

---

## 📡 API Endpoints

### Base URL: `http://localhost:3000/api/v1`

#### Autenticación

| Método | Endpoint         | Descripción             | Público |
| ------ | ---------------- | ----------------------- | ------- |
| POST   | `/auth/register` | Registrar nuevo usuario | ✅      |
| POST   | `/auth/login`    | Iniciar sesión          | ✅      |

#### Usuarios (Requiere autenticación)

| Método | Endpoint     | Descripción        | Roles |
| ------ | ------------ | ------------------ | ----- |
| GET    | `/users`     | Listar usuarios    | Admin |
| GET    | `/users/:id` | Obtener usuario    | Admin |
| POST   | `/users`     | Crear usuario      | Admin |
| PATCH  | `/users/:id` | Actualizar usuario | Admin |
| DELETE | `/users/:id` | Eliminar usuario   | Admin |

#### Cursos

| Método | Endpoint                  | Descripción             | Roles           |
| ------ | ------------------------- | ----------------------- | --------------- |
| GET    | `/cursos`                 | Listar cursos           | Todos           |
| GET    | `/cursos?profesor_id=X`   | Cursos de un profesor   | Todos           |
| GET    | `/cursos?estudiante_id=X` | Cursos de un estudiante | Todos           |
| POST   | `/cursos`                 | Crear curso             | Admin, Profesor |
| PATCH  | `/cursos/:id`             | Actualizar curso        | Admin, Profesor |
| DELETE | `/cursos/:id`             | Eliminar curso          | Admin           |

#### Inscripciones

| Método | Endpoint                         | Descripción                 | Roles             |
| ------ | -------------------------------- | --------------------------- | ----------------- |
| GET    | `/inscripciones`                 | Listar inscripciones        | Todos             |
| GET    | `/inscripciones?estudiante_id=X` | Inscripciones de estudiante | Todos             |
| POST   | `/inscripciones`                 | Crear inscripción           | Admin, Estudiante |
| DELETE | `/inscripciones/:id`             | Eliminar inscripción        | Admin             |

---

## 🧪 Pruebas

### Probar Backend

```bash
cd edutrack-backend

# Crear usuario administrador
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre_completo": "Admin User",
    "correo": "admin@edutrack.com",
    "contrasena": "Admin123!@#",
    "rol": "admin"
  }'

# Iniciar sesión
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "correo": "admin@edutrack.com",
    "contrasena": "Admin123!@#"
  }'
```

### Probar Frontend

1. Abrir navegador en `http://localhost:5173`
2. Registrarse como nuevo usuario
3. Iniciar sesión
4. Explorar las funcionalidades según el rol asignado

---

## 📝 Scripts Disponibles

### Backend

```bash
cd edutrack-backend

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

### Frontend

```bash
cd edutrack-frontend

# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

---

## 🚀 Despliegue

### Backend (Render, Railway, Heroku)

1. Crear base de datos PostgreSQL en el servicio cloud
2. Configurar variables de entorno
3. Ejecutar `npm run build`
4. Iniciar con `npm run start:prod`

### Frontend (Vercel, Netlify)

1. Configurar variable de entorno `VITE_API_URL` con la URL del backend
2. Ejecutar `npm run build`
3. Desplegar la carpeta `dist/`

---

## ✅ Características Implementadas

### Backend

- [x] Arquitectura modular con NestJS
- [x] Base de datos relacional con TypeORM y PostgreSQL
- [x] Autenticación con JWT
- [x] Autorización basada en roles (Guards)
- [x] Validación de datos con DTOs
- [x] Encriptación de contraseñas con bcrypt
- [x] Operaciones CRUD completas
- [x] Relaciones entre entidades (1:1, 1:N)
- [x] Manejo robusto de errores
- [x] Filtrado de datos por rol

### Frontend

- [x] Interfaz de usuario moderna y responsiva
- [x] Sistema de autenticación completo
- [x] Dashboard personalizado por rol
- [x] Gestión de usuarios (Admin)
- [x] Gestión de profesores (Admin)
- [x] Gestión de estudiantes (Admin, Profesor)
- [x] Gestión de cursos (Admin, Profesor, Estudiante)
- [x] Gestión de inscripciones (Admin, Profesor, Estudiante)
- [x] Validación de formularios
- [x] Notificaciones de usuario
- [x] Rutas protegidas por rol
- [x] Filtrado de datos según permisos

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
  <b>© 2025 - Sistema EduTrack | Proyecto Final Full Stack</b>
</p>
