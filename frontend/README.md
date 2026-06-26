# Frontend - Librería SGyA

Este proyecto es el panel web interactivo para la gestión y analítica de la **Librería SGyA**. Está desarrollado en **React** y **Vite** usando **TypeScript**.

---

## Arquitectura y Diseño de UI

* **Organización Feature-First**: El código se organiza de forma modular por características operativas y de negocio (`features/auth`, `features/books`, `features/dashboard`).
* **Abstracción de Librerías de Terceros**: Las visualizaciones interactivas de **Plotly.js** se encuentran estrictamente encapsuladas dentro de componentes contenedores (`DonutChart.tsx`, `ClusteredBarChart.tsx`, `HistogramChart.tsx`), evitando acoplar el dashboard a la API externa del proveedor visual.
* **Estilos**: Construido de manera ágil usando Tailwind CSS para lograr una interfaz moderna y adaptativa (responsive).

---

## Estado, Rendimiento e Interactividad

* **Manejo de Estado Global**: Uso estricto de **Redux Toolkit** (slices para `auth`, `books`, `dashboard` y `notifications`).
* **Rendimiento Optimizado (Reselect)**: Se implementan selectores memorizados mediante `createSelector` para recalcular las métricas y datos de los gráficos de forma eficiente, evitando re-renderizados innecesarios.
* **Estados Asíncronos**: Control estructurado de estados de carga (`isLoading`), éxito y errores (`error`) a través de `createAsyncThunk`.
* **Sistema de Notificaciones**: Toast reactivos para informar sobre éxitos y fallas de llamadas API.

---

## Autenticación y Seguridad

* **Interceptor HTTP**: Configuración de un cliente centralizado Axios con interceptores para adjuntar automáticamente el JWT Bearer Token almacenado en las cabeceras de peticiones salientes hacia rutas privadas.
* **Control del Ciclo de Vida del Token**: El token se gestiona globalmente en Redux (se borra del `localStorage` e inicializa el estado ante acciones de `Logout`).
* **Rutas Protegidas**: Rutas privadas `/dashboard`, `/books/manage`, `/books/create` y `/books/:isbn13/edit` controladas por el componente, redirigiendo al inicio de sesión si el usuario no cuenta con una sesión válida.

---

## Docker y Despliegue (Cumplido)

* **Dockerfile**: Estructurado con *multi-stage builds* (etapas `deps`, `build` y `prod` con servidor Nginx Alpine) para minimizar el tamaño de distribución de producción.

---

## Instalación y Uso Local

1. Instalar dependencias:
   ```bash
   cd frontend
   npm install
   ```
2. Crear un archivo `.env.development` (o `.env`):
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```
3. Ejecutar servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Navegador: Acceder a [http://localhost:5173](http://localhost:5173).
