# Backend - Librería SGyA

Este proyecto es la interfaz de programación de aplicaciones (API) para el sistema de gestión y analítica de la **Librería SGyA**. Está desarrollado utilizando **NestJS** y **TypeScript**, aplicando principios de **Arquitectura Hexagonal (Clean Architecture)**.

---

## Arquitectura del Proyecto

1. **Dominio (`domain/`)**:
   - **Modelos (`domain/models/`)**: Entidades puras libres de dependencias de NestJS o frameworks externos.
   - **Contratos (`domain/repositories/`)**: Puertos que definen las interfaces de persistencia.
   - **Reglas de Negocio (`domain/services/`)**: Lógica pura del dominio.

2. **Aplicación (`application/`)**:
   - Casos de uso desacoplados encargados de la orquestación.,

3. **Infraestructura (`infrastructure/`)**:
   - Adaptadores de entrada REST, módulos NestJS y adaptadores de persistencia en memoria y alimentados por datos semilla.

---

## Reglas de Negocio

* **Validación de Precios**: No se permite registrar ni actualizar libros con precio menor o igual a `0`.
* **Regla por Formato Digital**:
  - Si el formato es `Digital`, el stock se fuerza a `9999` (stock ilimitado) de forma automática.
  - El precio máximo para libros en formato digital está limitado a `$25.00`. Si el cliente envía un valor superior, el sistema lo normaliza a `$25.00` sin fallar.
* **Inmutabilidad de Descontinuados**: Cualquier libro en estado `Descontinuado` bloquea modificaciones en sus campos o su eliminación física del catálogo.
* **Gestión Automatizada de Estados**: El estado se calcula de forma reactiva en el servidor (en base a stock y formato):
  - **Descontinuado**: si `discontinued` es verdadero.
  - **Disponible**: formato `Digital` o stock superior a `5`.
  - **Bajo Stock**: formato `Papel` y stock entre `1` y `5` unidades.
  - **Agotado (Sin Stock)**: formato `Papel` y stock menor o igual a `0`.

---

## Robustez, Seguridad y Validación

* **Validación Estricta**: Uso de `class-validator` y `class-transformer` con un `ValidationPipe` global.
* **Validador Personalizado**: Implementación de un decorador especializado para validar el checksum del formato estándar **ISBN-13**.
* **Manejo Global de Errores**: Filtro de excepciones global  que formatea todas las respuestas de error bajo el estándar **RFC 7807**. 
* **Seguridad JWT**: Hashing seguro de contraseñas con `bcrypt` en el registro y emisión de tokens protegidos por un `Guard` de NestJS en operaciones de mutación del catálogo y analíticas.
* **Documentación OpenAPI**: Autodocumentación con Swagger UI disponible en la ruta `/api/docs`.

---

## Métricas Analíticas Computadas

El caso de uso GetAnalyticsMetricsUseCase calcula reactivamente:
- **inventoryValue**: Valor total del inventario (`sum(precio * stock)`).
- **booksByCategory**: Agrupación del catálogo por categorías.
- **stockByFormat**: Total de existencias agrupadas por formato.
- **worksByAgeBins**: Agrupación de libros por edad/antigüedad.



## Docker y Despliegue

* **Dockerfile**: Configurado con *multi-stage builds* (`deps`, `build`, `prod`) para reducir el tamaño final de la imagen.
* **Orquestación**: Integrado en el docker-compose.yml raíz para levantarse con un solo comando.

---

## Instalación y Uso Local

1. Instalar dependencias:
   ```bash
   cd backend
   npm install
   ```
2. Configurar `.env` basándose en `.env.development`:
   ```ini
   NODE_ENV=development
   PORT=3000
   JWT_SECRET=llave-secreta-dev
   JWT_EXPIRES_IN=24h
   CORS_ORIGIN=http://localhost:5173
   ```
3. Ejecutar en desarrollo:
   ```bash
   npm run start:dev
   ```
4. Swagger UI: [http://localhost:3000/api/docs](http://localhost:3000/api/docs).
