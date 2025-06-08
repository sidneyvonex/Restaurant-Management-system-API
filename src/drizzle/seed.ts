//// This script seeds the database with initial data for the Tables.

import db from "./db";
import {
  stateTable, cityTable, userTable, restaurantTable, restaurantOwnerTable,
  categoryTable, menuItemTable, driverTable, addressTable, ordersTable,
  statusCatalogTable, orderStatusTable, commentTable, orderMenuItemTable } from "./schema";

async function seed() {
  // States
  const [california] = await db.insert(stateTable).values({ stateName: "California", stateCode: "CA" }).returning();
  const [texas] = await db.insert(stateTable).values({ stateName: "Texas", stateCode: "TX" }).returning();

  // Cities
  const [la] = await db.insert(cityTable).values({ cityName: "Los Angeles", stateId: california.stateId }).returning();
  const [houston] = await db.insert(cityTable).values({ cityName: "Houston", stateId: texas.stateId }).returning();

  // Users
  const [alice] = await db.insert(userTable).values({
    userName: "Alice Smith",
    contactPhone: "1234567890",
    email: "alice@example.com",
    password: "password1",
    emailVerified: true,
    phoneVerified: true
  }).returning();
  const [bob] = await db.insert(userTable).values({
    userName: "Bob Jones",
    contactPhone: "0987654321",
    email: "bob@example.com",
    password: "password2",
    emailVerified: false,
    phoneVerified: false
  }).returning();

  // Categories
  const [mainCourse] = await db.insert(categoryTable).values({ categoryName: "Main Course" }).returning();
  const [dessert] = await db.insert(categoryTable).values({ categoryName: "Dessert" }).returning();

  // Restaurants
  const [tastyBites] = await db.insert(restaurantTable).values({
    restaurantName: "Tasty Bites",
    streetAddress: "123 Main St",
    zipCode: "90001",
    cityId: la.cityId
  }).returning();
  const [pizzaPlace] = await db.insert(restaurantTable).values({
    restaurantName: "Pizza Place",
    streetAddress: "456 Elm St",
    zipCode: "77001",
    cityId: houston.cityId
  }).returning();

  // Restaurant Owners
  await db.insert(restaurantOwnerTable).values({ restaurantId: tastyBites.restaurantId, ownerId: alice.userId });
  await db.insert(restaurantOwnerTable).values({ restaurantId: pizzaPlace.restaurantId, ownerId: bob.userId });

  // Menu Items
  const [burger] = await db.insert(menuItemTable).values({
    menuName: "Burger",
    restaurantId: tastyBites.restaurantId,
    categoryId: mainCourse.categoryId,
    description: "Juicy beef burger",
    ingredients: "Beef, bun, lettuce",
    price: "9.99",
    active: true
  }).returning();
  const [iceCream] = await db.insert(menuItemTable).values({
    menuName: "Ice Cream",
    restaurantId: pizzaPlace.restaurantId,
    categoryId: dessert.categoryId,
    description: "Vanilla ice cream",
    ingredients: "Milk, sugar, vanilla",
    price: "3.99",
    active: true
  }).returning();

  // Drivers
  const [driver1] = await db.insert(driverTable).values({
    carMake: "Toyota",
    carModel: "Corolla",
    carYear: 2015,
    userId: alice.userId,
    online: true,
    delivering: false
  }).returning();
  const [driver2] = await db.insert(driverTable).values({
    carMake: "Honda",
    carModel: "Civic",
    carYear: 2017,
    userId: bob.userId,
    online: false,
    delivering: false
  }).returning();

  // Addresses
  const [addr1] = await db.insert(addressTable).values({
    streetAddress1: "789 Maple St",
    zipCode: "90001",
    userId: alice.userId,
    cityId: la.cityId
  }).returning();
  const [addr2] = await db.insert(addressTable).values({
    streetAddress1: "101 Pine St",
    zipCode: "77001",
    userId: bob.userId,
    cityId: houston.cityId
  }).returning();

  // Orders
  const [order1] = await db.insert(ordersTable).values({
    restaurantId: tastyBites.restaurantId,
    estimatedDeliveryTime: new Date(),
    deliveryAddressId: addr1.addressId,
    userId: alice.userId,
    driverId: driver1.driverId,
    price: "9.99",
    finalPrice: "9.99"
  }).returning();
  
  const [order2] = await db.insert(ordersTable).values({
    restaurantId: pizzaPlace.restaurantId,
    estimatedDeliveryTime: new Date(),
    deliveryAddressId: addr2.addressId,
    userId: bob.userId,
    driverId: driver2.driverId,
    price: "3.99",
    finalPrice: "3.99"
  }).returning();

  // Status Catalog
  const [pending] = await db.insert(statusCatalogTable).values({ statusCatalogName: "Pending" }).returning();
  const [delivered] = await db.insert(statusCatalogTable).values({ statusCatalogName: "Delivered" }).returning();

  // Order Statuses
  await db.insert(orderStatusTable).values({ orderId: order1.ordersId, statusCatalogId: pending.statusCatalogId });
  await db.insert(orderStatusTable).values({ orderId: order2.ordersId, statusCatalogId: delivered.statusCatalogId });

  // Comments
  await db.insert(commentTable).values({
    orderId: order1.ordersId,
    userId: alice.userId,
    commentText: "Great food!",
    isPraise: true
  });
  await db.insert(commentTable).values({
    orderId: order2.ordersId,
    userId: bob.userId,
    commentText: "Late delivery",
    isComplaint: true
  });

  // Order Menu Items
  await db.insert(orderMenuItemTable).values({
    orderId: order1.ordersId,
    menuItemId: burger.menuId,
    quantity: 1,
    itemPrice: "9.99",
    price: "9.99"
  });
  await db.insert(orderMenuItemTable).values({
    orderId: order2.ordersId,
    menuItemId: iceCream.menuId,
    quantity: 2,
    itemPrice: "3.99",
    price: "7.98"
  });

  console.log("✅ Database seeded successfully");
  process.exit(0);
}

seed().catch((e) => {
  console.error("❌ Seeding failed:", e);
  process.exit(1);
});


