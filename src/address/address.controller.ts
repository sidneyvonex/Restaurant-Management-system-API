import { Request, Response } from "express";
import { getExistingAddresses,getExistingAddressById,createNewAddress,updateExistingAddress,deleteExistingAddress} from "./address.services";
 
//Business logic for Address Related operations
 
 
export const getAddress = async (req: Request, res: Response) => {
    try {
        const allAddresses = await getExistingAddresses();
        if (allAddresses == null || allAddresses.length == 0) {
          res.status(404).json({ message: "No Addresses found" });
        }else{
            res.status(200).json(allAddresses);            
        }            
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to fetch addresses " });
    }
}
 
export const getAddressById = async (req: Request, res: Response) => {
    const selectedAddressId = parseInt(req.params.id);
    if (isNaN(selectedAddressId)) {
        res.status(400).json({ error: "Invalid address ID" });
         return; // Prevent further execution
    }
    try {
        const address = await getExistingAddressById(selectedAddressId);
        if (address == undefined) {
            res.status(404).json({ message: "Address not found" });
        } else {
            res.status(200).json(address);
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to address and its details" });
    }
}
 
export const createAddress = async (req: Request, res: Response) => {
    const { streetAddress1,streetAddress2,zipCode,deliveryInstructions,userId,cityId} = req.body;
    if (!streetAddress1||!zipCode||!deliveryInstructions||!userId||!cityId) {
        res.status(400).json({ error: "All fields are required" });
        return; // Prevent further execution
    }
    try {
        const createdAddress = await createNewAddress({ streetAddress1,streetAddress2,zipCode,deliveryInstructions,userId,cityId });
        if (createdAddress == null) {
            res.status(500).json({ message: "Failed to create Address" });
        } else {
            res.status(201).json({message:createdAddress});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to create Address" });
    }
}
 
export const updateAddress = async (req: Request, res: Response) => {
    const selectedAddressId = parseInt(req.params.id);
    if (isNaN(selectedAddressId)) {
        res.status(400).json({ error: "Invalid Address Id" });
        return; // Prevent further execution
    }
    const { streetAddress1,streetAddress2,zipCode,deliveryInstructions,userId,cityId } = req.body;
    if (!streetAddress1||!zipCode||!deliveryInstructions||!userId||!cityId) {
        res.status(400).json({ error: "All fields are required" });
        return; // Prevent further execution
    }
    try {
        const updatedAddress = await updateExistingAddress(selectedAddressId, {streetAddress1,streetAddress2,zipCode,deliveryInstructions,userId,cityId });
        if (updatedAddress == null) {
            res.status(404).json({ message: "Address not found or failed to update" });
        } else {
            res.status(200).json({message:updatedAddress});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to update Address" });
    }
}
 
 
 
export const deleteAddress = async (req: Request, res: Response) => {
    const selectedAddressId = parseInt(req.params.id);  
    if (isNaN(selectedAddressId)) {
        res.status(400).json({ error: "Invalid Address ID" });
        return; // Prevent further execution
    }
    try {
        const deletedAddress = await deleteExistingAddress(selectedAddressId);
        if (selectedAddressId) {
            res.status(200).json({ message: "Address deleted successfully" });
        } else {
            res.status(404).json({ message: "Address not found" });
        }
    } catch (error:any) {    
        res.status(500).json({ error:error.message || "Failed to delete Address" });
    }    
}