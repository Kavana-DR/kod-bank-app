# Kodbank

Full-stack App Router banking demo with registration, JWT login, protected dashboard, and MySQL persistence.

## Stack

- Next.js (App Router)
- Tailwind CSS
- MySQL (`mysql2`)
- JWT (`jsonwebtoken`)
- Password hashing (`bcryptjs`)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create env file:

```bash
cp .env.example .env.local
```

3. Fill in your Aiven MySQL credentials and `JWT_SECRET` in `.env.local`.

4. Create tables:

```sql
-- run db/schema.sql in your MySQL database
```

5. Run dev server:

```bash
npm run dev
```

## Routes

- `/register`: register user (`role=customer`, `balance=10000`, hashed password)
- `/login`: login and issue JWT (HS256, subject=username, role claim)
- `/dashboard`: protected page with `Check Balance` button and animated confetti background

## API

- `POST /api/register`
- `POST /api/login`
- `GET /api/balance`
- `POST /api/logout`

## Notes

- Auth cookie key: `kodbank_token` (HTTP-only)
- Token expiry: 1 day
- `UserToken` table stores JWT and expiry per login
