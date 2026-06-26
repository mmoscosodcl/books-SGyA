# Librería SGyA - Catálogo y Analítica

Este proyecto es un sistema Full-Stack para gestionar un catálogo de libros y mostrar métricas analíticas en tiempo real.

---

## Arquitectura de Software

### Backend (NestJS + TypeScript)
Implementa Arquitectura Limpia (Clean / Hexagonal Architecture):
* **Dominio**: Entidades puras y reglas de negocio sin dependencias externas.
* **Aplicación**: Casos de uso (crear, actualizar libros y calcular métricas).
* **Infraestructura**: Controladores REST, repositorio en memoria (patrón repositorio), guards para autenticación JWT y filtros de excepciones globales.

### Frontend (React + TypeScript + Redux Toolkit)
Organización modular basada en características funcionales (Feature-First):
* **Estado**: Redux Toolkit para manejar el catálogo de libros, notificaciones y filtros analíticos.
* **Rendimiento**: Selectores optimizados (`createSelector`) para recalcular las métricas y gráficos en tiempo real en el cliente.
* **Vista**: Componentes gráficos basados en Plotly aislados mediante contenedores (wrappers).

---

## Ejecución del Entorno

Para iniciar el entorno completo dockerizado en desarrollo o producción, ejecute el siguiente comando en la raíz:

```bash
docker compose up --build
```

---

## Enlaces Locales

* **Frontend Dashboard**: [http://localhost:5173](http://localhost:5173)
* **Backend REST API**: [http://localhost:3000/api](http://localhost:3000/api)
* **Swagger UI (Documentación)**: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

---

## Documentación Detallada

* **[README de Backend](backend/README.md)**
* **[README de Frontend](frontend/README.md)**

