import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { restaurantTable, TRestaurantInsert, TRestaurantSelect } from "../drizzle/schema";




//Get all restaurants
export const getRestaurants = async():Promise<TRestaurantSelect[] | null> =>{
    return await db.query.restaurantTable.findMany({});


}

//Get restaurant by ID
export const getRestaurantById = async(restaurantId:number):Promise<TRestaurantSelect | undefined> => {
    return await db.query.restaurantTable.findFirst(
        {
            where:eq(restaurantTable.restaurantId, restaurantId)
        }
    )
}

//Create a new restaurant
export const createNewRestaurant = async(restaurant:TRestaurantInsert):Promise<string> => {
    await db.insert(restaurantTable).values(restaurant).returning();
    return "Restaurant created Successfully🎉";
}

//update an existing restaurant
export const updateExistingRestaurant = async(restaurantId:number, restaurant:Partial<TRestaurantInsert>):Promise<string> => {
    await db.update(restaurantTable).set(restaurant).where(eq(restaurantTable.restaurantId, restaurantId));
    return "Restaurant updated Successfully 😎"
}

//Delete a restaurant
export const deleteExistingRestaurant = async(restaurantId:number):Promise<string> => {
    await db.delete(restaurantTable).where(eq(restaurantTable.restaurantId, restaurantId));
    return "Restaurant deleted Successfully 🎉"
}