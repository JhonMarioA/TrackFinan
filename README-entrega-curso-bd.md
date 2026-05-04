# TrackFinan 

## Descripción del proyecto

TrackFinan es una aplicación web para control de finanzas personales. Permite registrar usuarios, administrar cuentas, categorías, medios de pago, transacciones y presupuestos, además de consultar reportes básicos de ingresos, gastos y balance.

El proyecto incluye backend en Node.js + Express + MySQL y frontend multipágina hecho con HTML, CSS y JavaScript vanilla.


## Base de datos

Nombre de la base de datos:

- `TrackFinan_DB`

Fuente principal de la estructura:

- `docs/Initial_Script_MySQL_TrackFinan.sql`

Documento de apoyo del modelo:

- `docs/er_model.md`

Notas relevantes:

- La base está diseñada para MySQL.
- Las reglas de negocio principales se apoyan en triggers para mantener sincronizado el balance de las cuentas.
- El script incluye la creación de tablas, relaciones, restricciones y triggers.

## Usuarios y claves de revisión (disponible para la base datos exportada en el dump)

La aplicación permite registrar usuarios desde la interfaz de autenticación. Para facilitar la revisión, se puede usar el siguiente usuario de prueba:

- Usuario de prueba: `demo@test.com`
- Contraseña: `123456`


## Cómo fue realizado

El proyecto fue construido con las siguientes herramientas y tecnologías:

- Node.js
- Express
- MySQL
- mysql2
- JWT para autenticación
- bcrypt para cifrado de contraseñas
- dotenv para variables de entorno
- HTML5, CSS3 y JavaScript vanilla en el frontend

Arquitectura del backend:

Route -> Controller -> Service -> Repository -> Database

Estructura principal del backend:

- `src/routes`
- `src/controllers`
- `src/services`
- `src/repositories`
- `src/middlewares`
- `src/config`
- `src/utils`

## Funcionalidades principales

- Registro e inicio de sesión.
- Administración de cuentas.
- Administración de categorías.
- Administración de medios de pago.
- Registro, edición y eliminación de transacciones.
- Gestión de presupuestos.
- Reportes de ingresos vs gastos.
- Reportes por categoría.
- Reportes de balance por rango de fechas.

## Frontend

El frontend vive en `frontend/` como una aplicación multipágina.

Puntos de entrada:

- `frontend/index.html`
- `frontend/pages/*.html`

## Configuración local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Crear archivo `.env`

```env
DB_HOST=localhost
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=TrackFinan_DB
JWT_SECRET=your_jwt_secret
PORT=3000
```

### 3. Crear la base de datos

Ejecutar el script:

- `docs/Initial_Script_MySQL_TrackFinan.sql`

### 4. Ejecutar el proyecto

```bash
npm run dev
```

O en modo producción:

```bash
npm start
```

La aplicación queda disponible en:

- `http://localhost:3000`

## Declaración de derechos de uso

Este trabajo puede ser consultado, modificado y mejorado por otros estudiantes con fines académicos, siempre que se reconozca la autoría original y no se use con fines comerciales sin autorización.


## Posibles mejoras

- Agregar validación centralizada para entradas del backend.
- Mejorar el manejo global de errores y respuestas HTTP.
- Incorporar pruebas automatizadas para backend y frontend.
- Separar aún más la lógica de reportes en capas dedicadas.
- Añadir Docker y un flujo de despliegue más reproducible.
- Mejorar la interfaz móvil y la consistencia visual.
- Implementar filtros más avanzados en transacciones y reportes.
- Agregar analítica visual con gráficas más ricas.
- Fortalecer medidas de seguridad como rate limiting y headers de protección.