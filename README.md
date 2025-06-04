# 🍽️ Restaurant Management API

This is the Backend of a Restaurant Management system built with **Node.js**, **Express**, **PostgreSQL**, and **Drizzle ORM**. It manages restaurants, menus, orders, drivers, and users in a scalable, relational database structure.

##Tech Stack
- **Node.js**
- **Express.js**
- **PostgreSQL**
- **Drizzle ORM**
- **TypeScript**

```##📂 Project Structure
  src/
├── drizzle/
│ ├── schema.ts # Drizzle ORM schema
│ ├── migrate.ts
│ ├── seed.ts 
│ └── db.ts # DB connection logic
├── middleware/
│ ├── logger.ts
│ ├── limiter.ts
│ ├── bearAuth.ts
└── server.ts
```
  
## **Features**

### Entities

- **State & City**
  - States and cities with `stateCode`, relationships to addresses and restaurants.

- **User**
  - Handles registration, email & phone verification, and roles (driver, owner).

- **Restaurant**
  - Owned by users, located in cities, has a full menu.

- **Menu Item & Category**
  - Items have ingredients, price, and active state.
  - Organized by category.

- **Order**
  - Linked to users, restaurants, drivers, delivery addresses.
  - Tracks price, discount, final cost, and timestamps.

- **Driver**
  - Users can be assigned as drivers with vehicle details and delivery status.

- **Comments & Ratings**
  - Users can leave complaints or praise on orders.

- **Order Status**
  - Tracks the lifecycle of an order via a status catalog.

### Time Management

Every table that requires timestamps uses:
```ts
createdAt: timestamp('createdAt').defaultNow().notNull(),
updatedAt: timestamp('updatedAt').defaultNow().notNull().$onUpdate(() => new Date()),



