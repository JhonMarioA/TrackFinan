# TrackFinan

TrackFinan is a personal finance web application for tracking income, expenses, budgets, and account balances.

This repository contains the backend API (Node.js + Express + MySQL) and a vanilla JavaScript frontend.

## Project Status

TrackFinan is currently in Version 1 (V1).

V1 is focused on:
- A clean relational database design.
- Core CRUD modules for finance management.
- JWT authentication.
- Basic reporting endpoints.
- A functional multi-page frontend in HTML, CSS, and JavaScript.

This is the first working version and it is expected to be improved in future iterations.

## Main Features (V1)

- User registration and login.
- Account management.
- Category management.
- Payment method management.
- Transaction management.
- Budget management.
- Reports:
	- income vs expense
	- expenses by category
	- balance by date range

## Tech Stack

- Backend: Node.js, Express, MySQL (`mysql2`)
- Auth: JWT (`jsonwebtoken`) + password hashing (`bcrypt`)
- Frontend: HTML, CSS, vanilla JavaScript
- Environment config: `dotenv`

## Architecture

The backend follows a layered architecture:

Route -> Controller -> Service -> Repository -> Database

Main backend folders:
- `src/routes`
- `src/controllers`
- `src/services`
- `src/repositories`
- `src/middlewares`
- `src/config`
- `src/utils`

## API Overview

Base URL: `http://localhost:3000/api`

Public endpoints:
- `POST /auth/register`
- `POST /auth/login`

Protected endpoints (Bearer token required):
- `GET/POST/PUT/DELETE /accounts`
- `GET /accounts/account-types`
- `GET /accounts/transaction-types`
- `GET/POST/PUT/DELETE /categories`
- `GET/POST/PUT/DELETE /payment-methods`
- `GET/POST/PUT/DELETE /transactions`
- `GET /transactions/filter`
- `GET/POST/PUT/DELETE /budgets`
- `GET /budgets/status`
- `GET /reports/income-vs-expense`
- `GET /reports/expenses-by-category?startDate&endDate`
- `GET /reports/balance?startDate&endDate`

## Database

Schema and constraints are defined in:
- `docs/Initial_Script_MySQL_TrackFinan.sql`

ER model documentation:
- `docs/er_model.md`

Important V1 behavior:
- Account balances are updated by SQL triggers on insert, update, and delete of transactions.

## Frontend

Frontend source lives in `frontend/` as a multi-page app.

Entry points:
- `frontend/index.html`
- `frontend/pages/*.html`

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root with:

```env
DB_HOST=localhost
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=TrackFinan_DB
JWT_SECRET=your_jwt_secret
PORT=3000
```

### 3. Create database schema

Run the SQL script:

- `docs/Initial_Script_MySQL_TrackFinan.sql`

### 4. Run the app

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

Server URL:
- `http://localhost:3000`

## V1 Limitations

- No automated test suite yet.
- Basic error handling structure, but can be standardized further.
- Reports are functional but limited to core financial summaries.
- No multi-currency, bank integrations, or advanced analytics yet.

## Future Improvements (Post-V1)

- Add automated tests (unit and integration).
- Improve validation and centralized error handling.
- Add transfers between accounts.
- Add advanced filters and richer dashboards/charts.
- Add Docker setup for local development/deployment.
- Improve CI/CD and deployment workflows.
- Add stronger security measures (rate limiting, helmet, etc.).
- Improve frontend UX/UI and add reusable components.
- Migrate to a more modern frontend framework (React, Vue, etc.) if needed.
- Add support for multi-currency and exchange rates.

## Notes

TrackFinan V1 prioritizes correctness and data integrity over advanced features.
The project is intentionally designed to evolve step by step in future versions.

