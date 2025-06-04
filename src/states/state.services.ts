


//CRUD OPERTIONS FOR STATE ENTITY

import db from "../drizzle/db";
import { TStateSelect } from "../drizzle/schema";

//Get all States
export const getStateServices = async ():Promise<TStateSelect[]  | null> => {
    return await db.query.stateTable.findMany({});
}


//Get State by Id 
export const getStateByIdServices = async(stateId:number):Promise<TStateSelect | null> => {}