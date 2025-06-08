import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TDriverSelect,TDriverInsert,driverTable } from "../drizzle/schema";
 
 
//CRUD Operations for driver entity
 
 
//Get all drivers
export const getExistingDrivers = async():Promise<TDriverSelect[] | null> => {
     return await  db.query.driverTable.findMany({});
}
 
//Get driver by ID
export const getExistingDriverById = async(ExistingDriverId: number):Promise<TDriverSelect | undefined>=> {
      return await db.query.driverTable.findFirst({
        where: eq(driverTable.driverId,ExistingDriverId)
      })
}
 
// Create a new Driver
export const createNewDriver = async(driver:TDriverInsert):Promise<string> => {
       await db.insert(driverTable).values(driver).returning();
        return "Driver Created Successfully 😎"
}
 
// Update an existing Driver Details
export const updateExistingDriver = async(ExistingDriverId: number, driver:TDriverInsert):Promise<string> => {
    await db.update(driverTable).set(driver).where(eq(driverTable.driverId,ExistingDriverId));
    return "Driver Details  Updated Succeffully 😎";
}
 
 
export const deleteExistingDriver = async(ExistingDriverId: number):Promise<string> => {
   await db.delete(driverTable).where(eq(driverTable.driverId,ExistingDriverId));
   return "Driver Details Deleted Sucessfully";
}