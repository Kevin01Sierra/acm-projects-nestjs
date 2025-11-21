import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar prefijo global para la API
  app.setGlobalPrefix('api/v1');

  // Habilitar validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // Lanza error si hay propiedades no permitidas
      transform: true, // Transforma los tipos automáticamente
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Habilitar CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`
  ╔═══════════════════════════════════════════════════════╗
  ║                                                       ║
  ║   🎓 Sistema EduTrack - Backend API                   ║
  ║                                                       ║
  ║   🚀 Servidor corriendo en: http://localhost:${port}     ║
  ║   📚 API base: http://localhost:${port}/api/v1           ║
  ║   🗄️  Base de datos: PostgreSQL                       ║
  ║   📝 Entorno: ${process.env.NODE_ENV || 'development'}                             ║
  ║                                                       ║
  ╚═══════════════════════════════════════════════════════╝
  `);
}
bootstrap();