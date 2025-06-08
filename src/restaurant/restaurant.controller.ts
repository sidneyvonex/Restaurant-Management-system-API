import { Request, Response } from "express";
import { getRestaurants,createNewRestaurant,updateExistingRestaurant, deleteExistingRestaurant, getRestaurantById} from "./restaurant.service";



export const getRestaurant = async (req:Request, res:Response) => {
    try{
        const restaurants = await getRestaurants();
        if (restaurants == null || restaurants.length == 0) {
            res.status(404).json({ message: "No restaurants found" });
        }
        else{
            res.status(200).json(restaurants);
        }
    }catch (error:any) {
        res.status(500).json({ error: error.message || "Failed to fetch restaurants" });
    }
}
export const getExistingRestaurantById = async (req:Request, res:Response) => {
    const ExistingRestaurantId = parseInt(req.params.id);
    if (isNaN(ExistingRestaurantId)) {
        res.status(400).json({ error: "Invalid restaurant ID" });
        return; // Prevent further execution
    }
    try {
        const restaurant = await getRestaurantById(ExistingRestaurantId);
        if (restaurant == null) {
            res.status(404).json({ message: "Restaurant not found" });
        } else {
            res.status(200).json(restaurant);
        }
    } catch (error:any) {
        res.status(500).json({ error: error.message || "Failed to fetch restaurant" });
    }
}
export const createRestaurant = async (req:Request, res:Response) => {
    const {restaurantName,streetAddress,zipCode,cityId} = req.body;
    if(!restaurantName || !streetAddress || !zipCode || !cityId) {
    res.status(400).json({ error: "All fields are required" });
        return; // Prevent further execution
    }
    try{
        const newRestaurant = await createNewRestaurant({restaurantName, streetAddress, zipCode, cityId});
        if (newRestaurant == null) {
            res.status(500).json({ message: "Failed to create restaurant" });
        } else {
            res.status(201).json({ message: newRestaurant });
        }

    }catch (error:any) {
        res.status(500).json({ error: error.message || "Failed to create restaurant" });
    }
}

export const updateRestaurant = async (req:Request, res:Response) => {
    const restaurantExistingId = parseInt(req.params.id);
    if (isNaN(restaurantExistingId)) {
        res.status(400).json({ error: "Invalid restaurant ID" });
        return; // Prevent further execution
    }
    const {restaurantName, streetAddress, zipCode, cityId} = req.body
    if (!restaurantName || !streetAddress || !zipCode || !cityId) {
        res.status(400).json({ error: "All fields are required" });
        return; // Prevent further execution
    } try{
        const updatedRestaurant = await updateExistingRestaurant(
            restaurantExistingId,
            { restaurantName, streetAddress, zipCode, cityId }
        );
        if (updatedRestaurant == null) {
            res.status(500).json({ message: "Failed to update restaurant" });
        } else {
            res.status(200).json({ message: updatedRestaurant });
        }
    }catch (error:any) {
        res.status(500).json({ error: error.message || "Failed to update restaurant" });
    }
}

export const deleteRestaurant = async (req:Request, res:Response) => {
    const restaurantId = parseInt(req.params.id);
    if (isNaN(restaurantId)) {
        res.status(400).json({ error: "Invalid restaurant ID" });
        return; // Prevent further execution
    }
    const ExistingRestaurant = await getRestaurantById(restaurantId);
    if(!ExistingRestaurant) {
        res.status(404).json({ message: "Restaurant not found or failed to delete" });
        return; // Prevent further execution
    }
    try {
        const deletedRestaurant = await deleteExistingRestaurant (restaurantId);
        if (deletedRestaurant) {
            res.status(404).json({message: "Restaurant Deleted Successfully"});
        } else {
            res.status(200).json({ message: "Restaurant not found"});
        }
    } catch (error:any) {
        res.status(500).json({ error: error.message || "Failed to delete restaurant" });
    }
}
