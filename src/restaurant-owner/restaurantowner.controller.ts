import { Request, Response } from "express";
import { getRestaurantOwnerById,getRestaurantsOwners,createNewRestaurant,updateRestaurantOwner,deleteRestaurantOwner } from "./restaurantowner.services";
 
//Business logic for restaurantOwner-related operations
 
 
export const getAllRestaurantOwner = async (req: Request, res: Response) => {
    try {
        const allRestaurantOwners = await getRestaurantsOwners();
        if (allRestaurantOwners == null || allRestaurantOwners.length == 0) {
          res.status(404).json({ message: "No users found" });
        }else{
            res.status(200).json(allRestaurantOwners);            
        }            
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to fetch Restaurant Owners" });
    }
}
 
export const getExistingRestaurantOwnerById = async (req: Request, res: Response) => {
    const restaurantOwnerId = parseInt(req.params.id);
    if (isNaN(restaurantOwnerId)) {
        res.status(400).json({ error: "Invalid Restaurant Owner ID" });
         return; // Prevent further execution
    }
    try {
        const restaurantOwner = await getRestaurantOwnerById(restaurantOwnerId);
        if (restaurantOwner == undefined) {
            res.status(404).json({ message: "Restaurant Owner not found" });
        } else {
            res.status(200).json(restaurantOwner);
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to fetch Restaurant Owner" });
    }
}
 
export const createRestaurantOwner = async (req: Request, res: Response) => {
    const { restaurantId,ownerId } = req.body;
    if (!restaurantId||!ownerId) {
        res.status(400).json({ error: "All fields are required" });
        return; // Prevent further execution
    }
    try {
        const restaurantOwner = await createNewRestaurant({ restaurantId,ownerId  });
        if (restaurantOwner == null) {
            res.status(500).json({ message: "Failed to create Restaurant Owner" });
        } else {
            res.status(201).json({message:restaurantOwner});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to create Restaurant Owner" });
    }
}
 
export const updateExistingRestaurantOwner = async (req: Request, res: Response) => {
    const restaurantOwnerId = parseInt(req.params.id);
    if (isNaN(restaurantOwnerId)) {
        res.status(400).json({ error: "Invalid Restaurant Owner ID" });
        return; // Prevent further execution
    }
    const { restaurantId,ownerId  } = req.body;
    if (!restaurantId||!ownerId) {
        res.status(400).json({ error: "All fields are required" });
        return; // Prevent further execution
    }
    try {
        const updatedResturantOwner = await updateRestaurantOwner(restaurantOwnerId, {restaurantId ,ownerId});
        if (updatedResturantOwner == null) {
            res.status(404).json({ message: "Restaurant Owner not found or failed to update" });
        } else {
            res.status(200).json({message:updatedResturantOwner});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to update Restaurant Owner" });
    }
}
 
 
 
export const deleteExistingRestaurantOwner = async (req: Request, res: Response) => {
    const restaurantOwnerId = parseInt(req.params.id);  
    if (isNaN(restaurantOwnerId)) {
        res.status(400).json({ error: "Invalid Restaurant Owner ID" });
        return; // Prevent further execution
    }
    try {
        const deletedRestaurantOwner = await deleteRestaurantOwner(restaurantOwnerId);
        if (deletedRestaurantOwner) {
            res.status(200).json({ message: "Restaurant Owner deleted successfully" });
        } else {
            res.status(404).json({ message: "Restaurant Owner not found" });
        }
    } catch (error:any) {    
        res.status(500).json({ error:error.message || "Failed to delete Restaurant Owner" });
    }    
}