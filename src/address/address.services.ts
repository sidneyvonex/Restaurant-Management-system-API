import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TAddressSelect,TAddressInsert,addressTable } from "../drizzle/schema";
 
 
//CRUD Operations for Address entity
 
 
//Get all Addresses
export const getExistingAddresses = async():Promise<TAddressSelect[] | null> => {
     return await  db.query.addressTable.findMany({});
}
 
//Get address by ID
export const getExistingAddressById = async(existingAddressId: number):Promise<TAddressSelect | undefined>=> {
      return await db.query.addressTable.findFirst({
        where: eq(addressTable.addressId,existingAddressId)
      })
}
 
// Create a New Address
export const createNewAddress = async(address:TAddressInsert):Promise<string> => {
       await db.insert(addressTable).values(address).returning();
        return "Address Details Created Successfully 😎"
}
 
// Update an existing Address
export const updateExistingAddress = async(existingAddressId: number, address:TAddressInsert):Promise<string> => {
    await db.update(addressTable).set(address).where(eq(addressTable.addressId,existingAddressId));
    return "Address Details  Updated Succeffully 😎";
}

 //delete an existing Address
export const deleteExistingAddress = async(existingAddressId: number):Promise<string> => {
   await db.delete(addressTable).where(eq(addressTable.addressId,existingAddressId));
   return "Selected Address Deleted Sucessfully";
}