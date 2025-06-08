import { Router } from "express";
import { getAddress, getAddressById, createAddress,updateAddress,deleteAddress } from "./address.controller";

 
export const addressRouter = Router();
// Address routes definition
 
 
// Get all Addresses
addressRouter.get('/address', getAddress);
 
// Get Restaurant Owner by ID
addressRouter.get('/address/:id', getAddressById);
 
// Create a new Restaurant Owner
addressRouter.post('/address', createAddress);
 
// Update an existing Restaurant Owner
addressRouter.put('/address/:id',updateAddress);
 
 
// Delete an existing Restaurant Owner
addressRouter.delete('/address/:id', deleteAddress);