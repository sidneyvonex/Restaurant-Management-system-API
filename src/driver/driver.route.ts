import { Router } from "express";
import { createDriver, deleteDriver, getAllDrivers, getDriversById, updateDriver } from "./driver.controller";

 
export const driverRouter = Router();
 
// Driver routes definition
 
 
// Get all Drivers
driverRouter.get('/driver', getAllDrivers);
 
// Get Driver by ID
driverRouter.get('/driver/:id', getDriversById);
 
// Create a new Driver
driverRouter.post('/driver', createDriver);
 
// Update an existing Driver
driverRouter.put('/driver/:id',updateDriver);
 
 
// Delete an existing Driver
driverRouter.delete('/driver/:id', deleteDriver);