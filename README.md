<!-- Encabezado visual -->
<h1 align="center">🚀 ACM — Proyectos NestJS</h1>
<p align="center">
  <i>Repositorio académico y creativo de proyectos en NestJS — Semestre 2025-3</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-10.0-red?logo=nestjs" alt="NestJS Badge"/>
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript" alt="TypeScript Badge"/>
  <img src="https://img.shields.io/badge/Status-Active-success" alt="Status"/>
</p>

---

## 🎨 Introducción

Bienvenido/a al repositorio **ACM — Proyectos NestJS**, una colección viva de proyectos, prácticas y experimentos desarrollados como parte del curso de Desarrollo en NestJS del semestre **2025-3**.

Aquí encontrarás desde APIs REST básicas hasta aplicaciones empresariales completas creadas con **NestJS + TypeScript**, siempre con un enfoque en el aprendizaje, la arquitectura limpia y las mejores prácticas del desarrollo backend.

> 💡 Este espacio busca no solo documentar el progreso académico, sino también compartir soluciones con la comunidad y construir un portafolio sólido en desarrollo backend moderno con Node.js.

---

## 🎯 Objetivos del repositorio

- Centralizar todos los proyectos prácticos relacionados con **NestJS**.
- Establecer una **base estándar** para la organización, estructura y estilo de código.
- Implementar patrones de diseño y arquitectura escalable.
- Fomentar el aprendizaje colaborativo y la revisión por pares.
- Dejar un registro visible de la evolución como desarrollador backend.

---

## 🧑‍💻 Autor

| Información | Detalle |
|--------------|----------|
| **Nombre:** | Kevin Nicolás Sierra González |
| **Código Estudiantil:** | *20182020151* |
| **Carrera:** | Ingeniería de Sistemas |
| **Semestre:** | 2025-3 |
| **Perfil Profesional:** | [LinkedIn](https://www.linkedin.com/in/kvnnsig/) · [GitHub](https://github.com/Kevin01Sierra) |

---

## 🗂️ Estructura general

```bash
acm-projects-nestjs/
├── rick-morty-crud/   # CRUD con API de Rick and Morty
├── edutrack-bakend/   # CRUD de la API para el proyecto final
├── README.md          # Este documento (presentación principal)
└── .gitignore         # Archivos ignorados por Git
```

---

## 📚 Proyectos incluidos

### 1. 🎭 Rick and Morty CRUD
**Descripción:** Sistema CRUD completo que consume la API pública de Rick and Morty, implementando paginación, validaciones con DTOs y manejo de errores HTTP.

**Tecnologías:**
- NestJS 10
- TypeScript
- Axios + RxJS
- class-validator
- class-transformer

**Características:**
- ✅ Paginación con `limit` y `offset`
- ✅ Operaciones CRUD completas (GET, POST, PATCH, DELETE)
- ✅ DTOs con validaciones robustas
- ✅ Manejo de excepciones personalizadas
- ✅ Integración con API externa

**[Ver proyecto →](./rick-morty-crud/)**

---

## 🚀 Cómo ejecutar un proyecto localmente

1. **Clona este repositorio**
```bash 
git clone https://github.com/Kevin01Sierra/acm-projects-nestjs.git
```

2. **Abre la carpeta del proyecto que quieras probar, por ejemplo:**
```bash
cd rick-morty-crud
```
2.1. **Abre la carpeta del proyecto que quieras probar, por ejemplo:**
```bash
cd edutrack-backend
```

3. **Instala las dependencias:**
```bash
npm install
```

4. **Ejecuta el servidor de desarrollo:**
```bash
npm run start:dev
```

5. **Abre tu cliente HTTP favorito y prueba la API:**
```
http://localhost:3000
```

---

## ✨ Convenciones y buenas prácticas

### 📁 Estructura de carpetas
```
proyecto/
├── src/
│   ├── modulo/
│   │   ├── dto/              # Data Transfer Objects
│   │   ├── interfaces/       # Interfaces TypeScript
│   │   ├── entities/         # Entidades (si usa base de datos)
│   │   ├── modulo.controller.ts
│   │   ├── modulo.service.ts
│   │   └── modulo.module.ts
│   ├── app.module.ts
│   └── main.ts
├── test/                     # Tests E2E
├── package.json
├── tsconfig.json
└── README.md
```

### 🏗️ Convenciones de nombres
- **Módulos:** `kebab-case` (ejemplo: `user-management`)
- **Clases:** `PascalCase` (ejemplo: `UserService`, `CreateUserDto`)
- **Archivos:** `kebab-case.tipo.ts` (ejemplo: `user.controller.ts`, `create-user.dto.ts`)
- **Métodos:** `camelCase` (ejemplo: `findAll()`, `createUser()`)

### 🧩 Cada proyecto debe incluir:
Un `README.md` propio con:
- Objetivo del proyecto
- Endpoints disponibles
- Ejemplos de peticiones con Postman/cURL
- Dependencias importantes
- Instrucciones de instalación y ejecución

### 💬 Commits y ramas
- Commits descriptivos en español y en presente:
  ```
  feat: agregar endpoint de autenticación
  fix: corregir validación de email en DTO
  refactor: optimizar servicio de usuarios
  docs: actualizar documentación de API
  ```
- Para nuevas características, usa ramas tipo:
  ```bash
  feat/autenticacion-jwt
  fix/error-validacion
  refactor/estructura-modulos
  ```

### 🎯 Estándares de código
- ✅ Usar **DTOs** para validación de datos
- ✅ Implementar **manejo de excepciones** apropiado
- ✅ Documentar endpoints con comentarios
- ✅ Seguir principios **SOLID**
- ✅ Implementar **inyección de dependencias**
- ✅ Usar **Guards** para autenticación cuando sea necesario
- ✅ Implementar **Pipes** para transformación de datos

---

## 🧱 Cómo crear un nuevo proyecto

1. **Crear proyecto con NestJS CLI:**
```bash
nest new nombre-del-proyecto
cd nombre-del-proyecto
```

2. **Instalar dependencias adicionales si es necesario:**
```bash
npm install @nestjs/axios axios class-validator class-transformer
```

3. **Generar módulos, controladores y servicios:**
```bash
nest generate module nombre-modulo
nest generate controller nombre-modulo
nest generate service nombre-modulo
```

4. **Crear un README.md propio** dentro de la carpeta.

5. **Documentar endpoints** y ejemplos de uso.

6. **Agregar al repositorio principal** y actualizar este README.

---

## 🛠️ Stack tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **NestJS** | 10.x | Framework principal |
| **TypeScript** | 5.x | Lenguaje de programación |
| **Node.js** | 18+ | Runtime |
| **Axios** | 1.x | Cliente HTTP |
| **class-validator** | 0.14.x | Validación de DTOs |
| **class-transformer** | 0.5.x | Transformación de datos |
| **RxJS** | 7.x | Programación reactiva |

---

## 💡 Ideas futuras

- ✨ Implementar autenticación con **JWT** y **Passport**
- 🗄️ Integración con bases de datos (**TypeORM** o **Prisma**)
- 📝 Documentación automática con **Swagger/OpenAPI**
- 🧪 Testing con **Jest** y cobertura de código
- 🐳 Dockerización de aplicaciones
- 🔄 CI/CD con **GitHub Actions**
- 🌐 Despliegue en **Heroku**, **Railway** o **AWS**
- 🔐 Implementación de **rate limiting** y seguridad
- 📊 Logging avanzado con **Winston** o **Pino**
- 🎯 Microservicios con **NestJS Microservices**

---

## 🤝 Contribuciones

Si deseas aportar mejoras o ejemplos nuevos:
1. Crea una rama (`feat/nueva-funcionalidad`)
2. Realiza tus cambios y haz commit
3. Abre un Pull Request describiendo tus aportes

> 🧠 Todo aporte con fines educativos o experimentales es bienvenido.

---

## 📖 Recursos útiles

- [Documentación oficial de NestJS](https://docs.nestjs.com/)
- [NestJS Fundamentals Course](https://learn.nestjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [REST API Best Practices](https://restfulapi.net/)

---

## 📬 Contacto

¿Tienes comentarios, ideas o quieres colaborar?

📧 Contáctame en [LinkedIn](https://www.linkedin.com/in/kvnnsig/) o revisa más proyectos en mi [GitHub](https://github.com/Kevin01Sierra).

---

<p align="center">
  <b>© 2025 — ACM Projects NestJS | Creado con 💙 por Kevin Nicolás Sierra González</b>
</p>
