import { Router } from "express";
import { createRestaurantOwner,updateExistingRestaurantOwner,deleteExistingRestaurantOwner,getAllRestaurantOwner,getExistingRestaurantOwnerById } from "./restaurantowner.controller";

 
export const restaurantOwnerRouter = Router();
 
// Restaurant Owner routes definition
 
 
// Get all Restaurant Owner
restaurantOwnerRouter.get('/restaurantowner', getAllRestaurantOwner);
 
// Get Restaurant Owner by ID
restaurantOwnerRouter.get('/restaurantowner/:id', getExistingRestaurantOwnerById);
 
// Create a new Restaurant Owner
restaurantOwnerRouter.post('/restaurantowner', createRestaurantOwner);
 
// Update an existing Restaurant Owner
restaurantOwnerRouter.put('/restaurantowner/:id',updateExistingRestaurantOwner);
 
 
// Delete an existing Restaurant Owner
restaurantOwnerRouter.delete('/restaurantowner/:id', deleteExistingRestaurantOwner);