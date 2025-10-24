# Rick and Morty CRUD API - NestJS

Proyecto de CRUD completo usando NestJS que consume la API pública de Rick and Morty.

---

## 📋 Descripción

Este proyecto implementa un sistema CRUD completo para personajes de Rick and Morty, cumpliendo con todos los requisitos del taller:

- ✅ Paginación con `limit` y `offset`
- ✅ Consulta por ID
- ✅ Creación de personajes (POST)
- ✅ Actualización parcial (PATCH)
- ✅ Eliminación por ID (DELETE)
- ✅ DTOs para validación
- ✅ Manejo de errores con excepciones
- ✅ Documentación de pruebas en Postman

---

## 🚀 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos de instalación

1. **Clonar o descargar el proyecto**

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar la aplicación en modo desarrollo**
```bash
npm run start:dev
```

4. **La aplicación estará corriendo en:**
```
http://localhost:3000
```

---

## 📁 Estructura del Proyecto

```
src/
├── characters/
│   ├── dto/
│   │   └── character.dto.ts          # DTOs para validación
│   ├── interfaces/
│   │   └── character.interface.ts    # Interfaces TypeScript
│   ├── characters.controller.ts      # Controlador REST
│   ├── characters.service.ts         # Lógica de negocio
│   └── characters.module.ts          # Módulo de Characters
├── app.module.ts                     # Módulo principal
└── main.ts                           # Punto de entrada
```

---

## 🔌 Endpoints de la API

### Base URL: `http://localhost:3000`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/elementos?limit={L}&offset={O}` | Lista paginada de personajes |
| GET | `/elementos/{id}` | Obtener personaje por ID |
| POST | `/elementos` | Crear nuevo personaje |
| PATCH | `/elementos/{id}` | Actualizar personaje parcialmente |
| DELETE | `/elementos/{id}` | Eliminar personaje por ID |

---

## 📝 Ejemplos de Uso

### 1. Listar personajes con paginación
```bash
GET http://localhost:3000/elementos?limit=10&offset=0
```

**Respuesta:**
```json
{
  "results": [
    {
      "id": 1,
      "name": "Rick Sanchez",
      "status": "Alive",
      "species": "Human",
      "gender": "Male",
      ...
    }
  ],
  "info": {
    "count": 826,
    "pages": 83,
    "next": "?limit=10&offset=10",
    "prev": null
  }
}
```

### 2. Obtener personaje por ID
```bash
GET http://localhost:3000/elementos/1
```

### 3. Crear nuevo personaje
```bash
POST http://localhost:3000/elementos
Content-Type: application/json

{
  "name": "Nuevo Personaje",
  "status": "Alive",
  "species": "Human",
  "gender": "Male"
}
```

### 4. Actualizar personaje
```bash
PATCH http://localhost:3000/elementos/1000
Content-Type: application/json

{
  "status": "Dead",
  "name": "Personaje Actualizado"
}
```

### 5. Eliminar personaje
```bash
DELETE http://localhost:3000/elementos/1000
```

---

## 🎯 Características Implementadas

### Paginación
- Parámetro `limit`: Número de elementos por página (default: 20, max: 100)
- Parámetro `offset`: Elementos a saltar (default: 0)
- Información de navegación en la respuesta

### DTOs y Validación
- **CreateCharacterDto**: Validación para creación
- **UpdateCharacterDto**: Validación para actualización parcial
- Validación de enums para `status` y `gender`
- Validación de URLs y campos requeridos

### Manejo de Errores
- `NotFoundException`: Cuando no se encuentra un personaje
- `BadRequestException`: Cuando los datos son inválidos
- Validación automática con `class-validator`

### Estrategia de Datos
- **IDs < 1000**: Personajes de la API original (read-only)
- **IDs ≥ 1000**: Personajes locales (modificables y eliminables)
- Al actualizar personajes de la API, se crea una copia local

---

## 🧪 Pruebas

### Con Postman
1. Importa la colección desde `EJEMPLOS-POSTMAN.md`
2. Ejecuta las peticiones en el orden sugerido
3. Verifica las respuestas esperadas

### Con cURL

**Listar personajes:**
```bash
curl http://localhost:3000/elementos?limit=5&offset=0
```

**Obtener por ID:**
```bash
curl http://localhost:3000/elementos/1
```

**Crear personaje:**
```bash
curl -X POST http://localhost:3000/elementos \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Character",
    "status": "Alive",
    "species": "Alien",
    "gender": "Female"
  }'
```

**Actualizar personaje:**
```bash
curl -X PATCH http://localhost:3000/elementos/1000 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Dead"
  }'
```

**Eliminar personaje:**
```bash
curl -X DELETE http://localhost:3000/elementos/1000
```

---

## 📊 Criterios de Evaluación Cumplidos

| Criterio | Peso | Implementado |
|----------|------|--------------|
| Selección y uso de API | 12.5% | ✅ Rick and Morty API |
| Paginación (limit/offset) | 15% | ✅ Implementado |
| GET /elementos/{id} | 15% | ✅ Implementado |
| POST con DTO | 15% | ✅ CreateCharacterDto |
| PATCH con DTO parcial | 15% | ✅ UpdateCharacterDto |
| DELETE por ID | 15% | ✅ Implementado |
| Manejo de errores | 12.5% | ✅ Excepciones HTTP |

**Total: 100% ✅**

---

## 🛠️ Tecnologías Utilizadas

- **NestJS** v10 - Framework principal
- **TypeScript** - Lenguaje de programación
- **class-validator** - Validación de DTOs
- **class-transformer** - Transformación de datos
- **@nestjs/axios** - Cliente HTTP
- **RxJS** - Programación reactiva

---

## 📚 API Externa

Este proyecto consume la API pública de Rick and Morty:
- **URL**: https://rickandmortyapi.com
- **Documentación**: https://rickandmortyapi.com/documentation
- **Endpoints usados**: `/character`

---

## 🔐 Validaciones Implementadas

### Status
- Valores permitidos: `Alive`, `Dead`, `unknown`

### Gender
- Valores permitidos: `Female`, `Male`, `Genderless`, `unknown`

### Campos requeridos (POST)
- name
- status
- species
- gender

### Campos opcionales
- type
- origin
- location
- image
- episode

---

## 🚨 Manejo de Errores HTTP

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["Mensajes de validación"],
  "error": "Bad Request"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Personaje con ID X no encontrado",
  "error": "Not Found"
}
```

---

## 👨‍💻 Autor

| Información | Detalle |
|--------------|----------|
| **Nombre:** | Kevin Nicolás Sierra González |
| **Código Estudiantil:** | *20182020151* |
| **Carrera:** | Ingeniería de Sistemas |
| **Semestre:** | 2025-3 |
| **Perfil Profesional:** | [LinkedIn](https://www.linkedin.com/in/kvnnsig/) · [GitHub](https://github.com/Kevin01Sierra) |

---

## 📞 Soporte

Para cualquier duda o consulta, consultar la documentación oficial:
- NestJS: https://docs.nestjs.com
- Rick and Morty API: https://rickandmortyapi.com/documentation

<p align="center"> <b>© 2025 — ACM Projects NestJS | Creado con 💙 por Kevin Nicolás Sierra González</b> </p>