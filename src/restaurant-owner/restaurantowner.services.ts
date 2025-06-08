import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TRestaurantOwnerInsert, TRestaurantOwnerSelect, restaurantOwnerTable } from "../drizzle/schema";
 
 
//CRUD Operations for Restaurant Owner entity
 
 
//Get all Restaurant Owners
export const getRestaurantsOwners = async():Promise<TRestaurantOwnerSelect[] | null> => {
     return await  db.query.restaurantOwnerTable.findMany({});
}
 
//Get Restaurant Owner by ID
export const getRestaurantOwnerById = async(restaurantOwnerId: number):Promise<TRestaurantOwnerSelect | undefined>=> {
      return await db.query.restaurantOwnerTable.findFirst({
        where: eq(restaurantOwnerTable.restaurantOwnerId,restaurantOwnerId)
      })
}
 
// Create a new Restaurant Owner
export const createNewRestaurant = async(restaurantOwner:TRestaurantOwnerInsert):Promise<string> => {
       await db.insert(restaurantOwnerTable).values(restaurantOwner).returning();
        return "Restaurant Owner Created Successfully 😎"
}
 
// Update an existing Restaurant Owner
export const updateRestaurantOwner = async(restaurantOwnerId: number, restaurantOwner:TRestaurantOwnerInsert):Promise<string> => {
    await db.update(restaurantOwnerTable).set(restaurantOwner).where(eq(restaurantOwnerTable.restaurantOwnerId,restaurantOwnerId));
    return "Restaurant  Updated Succeffully 😎";
}

 //delete an existing Restaurant Owner
 
export const deleteRestaurantOwner = async(restaurantOwnerId: number):Promise<string> => {
   await db.delete(restaurantOwnerTable).where(eq(restaurantOwnerTable.restaurantOwnerId,restaurantOwnerId));
   return "Restaurant Owner Delete Sucessfully";
}