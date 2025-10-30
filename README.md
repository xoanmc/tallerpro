
# 🚗 TallerPro — Sistema de Gestión de Taller Mecánico

**TallerPro** es una aplicación **Full-Stack** moderna para la gestión de talleres mecánicos.  
Permite administrar clientes, vehículos, piezas y órdenes de trabajo de forma eficiente, con una arquitectura modular y escalable.

---

## 🧩 Stack Tecnológico

### 🖥️ Frontend
- **React + TypeScript + Vite** → Interfaz moderna y rápida (SPA).
- **Mantine UI + Emotion** → Componentes visuales elegantes y accesibles.
- **Axios** → Cliente HTTP para consumir la API.
- **React Router DOM** → Navegación entre rutas sin recargas.
- **React Query (@tanstack/react-query)** → Manejo avanzado de peticiones y caché.
- **React Hook Form + Zod** → Formularios con validación tipada.
- **ESLint + Prettier** → Linter y formateador para mantener la calidad del código.

### ⚙️ Backend
- **Java 17 + Spring Boot 3.5** → Framework principal del servidor.
- **Spring Data JPA (Hibernate)** → Acceso a base de datos mediante repositorios.
- **PostgreSQL** → Base de datos relacional.
- **Spring Validation** → Validación de DTOs.
- **Spring Security (JWT-ready)** → Autenticación y autorización seguras.
- **Lombok** → Reducción de código repetitivo.
- **MapStruct** → Conversión automática entre entidades y DTOs.
- **Springdoc OpenAPI (Swagger UI)** → Documentación interactiva de la API.

### ☁️ Infraestructura / DevOps
- **Docker + Docker Compose** → Orquestación de servicios (API y BD).
- **Render / Railway / Vercel** → Despliegue en la nube (gratuito o low-cost).
- **Maven** → Gestión de dependencias y build backend.
- **npm + Vite** → Gestión de dependencias y build frontend.
- **Git + GitHub** → Control de versiones y colaboración.

---

## 🧱 Estructura del Proyecto

```bash
tallerpro/
├── backend/                     # API REST (Spring Boot + Java)
│   ├── src/main/java/com/tallerpro/
│   │   ├── api/ (controllers, DTOs, exception handlers)
│   │   ├── service/ (lógica de negocio)
│   │   ├── domain/ (entidades JPA)
│   │   ├── repository/ (Spring Data JPA)
│   │   ├── mapper/ (MapStruct)
│   │   └── config/ (seguridad, CORS, etc.)
│   ├── pom.xml
│   └── application.yml
│
├── frontend/                    # SPA React (Vite + TypeScript)
│   ├── src/
│   │   ├── app/ (api base, rutas, queryClient)
│   │   ├── features/ (auth, clientes, vehículos, órdenes)
│   │   └── components/ (layout, tablas, formularios)
│   ├── package.json
│   ├── vite.config.ts
│   └── .env.example
│
├── infra/                       # Configuración Docker / despliegue
│   └── docker-compose.yml
│
└── README.md
```

---

## 🚀 Instalación y Ejecución

### 🧰 Backend (Spring Boot)
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
> La API se ejecutará por defecto en `http://localhost:8080`

### 💻 Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
> La aplicación estará disponible en `http://localhost:5173`

---

## 🔐 Variables de Entorno

Ejemplo de archivo `.env` en el frontend:
```env
VITE_API_URL=http://localhost:8080/api
```

---

## 🧠 Características Destacadas

- Arquitectura limpia y escalable (frontend y backend desacoplados).
- Validación robusta en ambas capas (Zod + Spring Validation).
- Documentación automática con Swagger (`/swagger-ui/index.html`).
- Manejo global de errores con `GlobalExceptionHandler`.
- Formularios tipados y validación reactiva con Zod.
- Diseño moderno y responsive con Mantine.

---

## 🧪 Pruebas
- **Backend:** JUnit 5 + Mockito.
- **Frontend (opcional):** Vitest + React Testing Library.

---

## 👨‍💻 Autor
**Juan Mosquera Cid**  
Ingeniero Informático · Full-Stack Developer  
📍 A Coruña, España  
🔗 [LinkedIn](https://www.linkedin.com/in/juan-mosquera-cid/)  
✉️ [xoanmc@hotmail.com](mailto:xoanmc@hotmail.com)

---

## 📜 Licencia
Este proyecto está licenciado bajo la **MIT License**.  
Puedes usarlo, modificarlo y distribuirlo libremente citando al autor.
