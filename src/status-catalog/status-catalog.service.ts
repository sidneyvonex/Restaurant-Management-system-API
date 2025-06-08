import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TStatusCatalogSelect,TStatusCatalogInsert,statusCatalogTable } from "../drizzle/schema";
 
 
//CRUD Operations for Status Catalog  entity
 
 
//Get all Status Catalog  Items
export const getAllExistingStatusCatalog = async():Promise<TStatusCatalogSelect[] | null> => {
     return await  db.query.statusCatalogTable.findMany({});
}
 
//Get Status Catalog by ID
export const getExistingStatusCatalogById = async(existingStatusCatalogId: number):Promise<TStatusCatalogSelect | undefined>=> {
      return await db.query.statusCatalogTable.findFirst({
        where: eq(statusCatalogTable.statusCatalogId,existingStatusCatalogId)
      })
}
 
// Create a New Status Catalog
export const createNewStatusCatalog = async(statusCatalog:TStatusCatalogInsert):Promise<string> => {
       await db.insert(statusCatalogTable).values(statusCatalog).returning();
        return "Status Catalog Created Successfully 😎"
}
 
// Update an existing Status Catalog
export const updateExistingStatusCatalog = async(existingStatusCatalogId: number, statusCatalog:TStatusCatalogInsert):Promise<string> => {
    await db.update(statusCatalogTable).set(statusCatalog).where(eq(statusCatalogTable.statusCatalogId,existingStatusCatalogId));
    return "Status Catalog  Updated Succeffully 😎";
}

 //delete an existing Status Catalog
export const deleteExistingStatusCatalog = async(existingStatusCatalogId: number):Promise<string> => {
   await db.delete(statusCatalogTable).where(eq(statusCatalogTable.statusCatalogId,existingStatusCatalogId));
   return "Status Catalog Deleted Sucessfully";
}