import { Router } from "express";
import { createRestaurant,  deleteRestaurant,  getExistingRestaurantById, getRestaurant, updateRestaurant } from "./restaurant.controller";



export const restaurantRouter = Router();

//get all restaurants
restaurantRouter.get('/restaurants',getRestaurant);


//get restaurant by id
restaurantRouter.get('/restaurants/:id',getExistingRestaurantById);

//create a new restaurant

restaurantRouter.post('/restaurants',createRestaurant);

//update an existing restaurant

restaurantRouter.put('/restaurants/:id',updateRestaurant);

// //delete an existing restaurant
restaurantRouter.delete('/restaurants/:id',deleteRestaurant);