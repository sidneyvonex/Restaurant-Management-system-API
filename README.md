# 🍽️ Restaurant Management API

This is the Backend of a Restaurant Management system built with **Node.js**, **Express**, **PostgreSQL**, and **Drizzle ORM**. It manages restaurants, menus, orders, drivers, and users in a scalable, relational database structure.
> 🗄️ **Database**: Uses [Neon](https://neon.tech) – a fully managed, serverless PostgreSQL database.

## Tech Stack
- **Node.js**
- **Express.js**
- **PostgreSQL**
- **Drizzle ORM**
- **TypeScript**

## 📂 Project Structure
```
  src/
├── drizzle/
│ ├── schema.ts # Drizzle ORM schema
│ ├── seed.ts #adding Initial Data
│ └── db.ts # DB connection logic
├── middleware/
│ ├── logger.ts #logging the requests
│ ├── limiter.ts #limits the n.o of requests per minute
│ ├── bearAuth.ts #
└── server.ts
```
## 🔰 How to Initialize the Project 

### 1. Initialize the project with pnpm
```bash
pnpm init
```
### 2.Install depedencies
```
pnpm add bcrypt dotenv drizzle-kit drizzle-orm express jsonwebtoken nodemailer pg rate-limiter-flexible zod
```
### 3.Install dev dependencies
```
pnpm add -D @types/bcrypt @types/express @types/jsonwebtoken @types/node @types/nodemailer @types/pg tsx typescript
```
### 4.Initialize TypeScript config
```
pnpm tsc --init
```
### 5.Replace the generated tsconfig.json content with:
```
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "outDir": "./dist",
    "rootDir": "./src",
    "moduleResolution": "nodenext",
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```
### 6. Create your project files and folders as per the project structure:
```
src/
├── drizzle/
│   ├── schema.ts
│   ├── migrate.ts
│   ├── seed.ts
│   └── db.ts
├── middleware/
│   ├── logger.ts
│   ├── limiter.ts
│   └── bearAuth.ts
└── server.ts
```
### 7. Use Postman (or any API client) to test your API endpoints during development.


