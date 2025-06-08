import { Request, Response } from "express";
import { getExistingDrivers,getExistingDriverById,createNewDriver,updateExistingDriver,deleteExistingDriver } from "./driver.service";
 
//Business logic for driver operations
 
 
export const getAllDrivers = async (req: Request, res: Response) => {
    try {
        const allDrivers = await getExistingDrivers();
        if (allDrivers == null || allDrivers.length == 0) {
          res.status(404).json({ message: "No drivers found" });
        }else{
            res.status(200).json(allDrivers);            
        }            
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to fetch Drivers" });
    }
}
 
export const getDriversById = async (req: Request, res: Response) => {
    const driverId = parseInt(req.params.id);
    if (isNaN(driverId)) {
        res.status(400).json({ error: "Invalid driverId" });
         return; // Prevent further execution
    }
    try {
        const driver = await getExistingDriverById(driverId);
        if (driver == undefined) {
            res.status(404).json({ message: "Driver not found" });
        } else {
            res.status(200).json(driver);
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to fetch Driver" });
    }
}
 
export const createDriver = async (req: Request, res: Response) => {
    const { carMake,carModel,carYear,userId,online,delivering } = req.body;
    if (!carMake||!carModel||!carYear||!userId||!online||!delivering) {
        res.status(400).json({ error: "All fields are required" });
        return; // Prevent further execution
    }
    try {
        const driver = await createNewDriver({ carMake,carModel,carYear,userId,online,delivering  });
        if (driver == null) {
            res.status(500).json({ message: "Failed to create driver" });
        } else {
            res.status(201).json({message:driver});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to create driver" });
    }
}
 
export const updateDriver = async (req: Request, res: Response) => {
    const driverId = parseInt(req.params.id);
    if (isNaN(driverId)) {
        res.status(400).json({ error: "Invalid driver ID" });
        return; // Prevent further execution
    }
    const {  carMake,carModel,carYear,userId,online,delivering  } = req.body;
    if (!carMake||!carModel||!carYear||!userId||!online||!delivering) {
        res.status(400).json({ error: "All fields are required" });
        return; // Prevent further execution
    }
    try {
        const updatedDriver = await updateExistingDriver(driverId, {carMake,carModel,carYear,userId,online,delivering });
        if (updatedDriver == null) {
            res.status(404).json({ message: "Driver not found or failed to update" });
        } else {
            res.status(200).json({message:updatedDriver});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to update Driver" });
    }
}
 
 
 
export const deleteDriver = async (req: Request, res: Response) => {
    const driverId = parseInt(req.params.id);  
    if (isNaN(driverId)) {
        res.status(400).json({ error: "Invalid Driver ID" });
        return; // Prevent further execution
    }
    try {
        const deletedDriver = await deleteExistingDriver(driverId);
        if (driverId) {
            res.status(200).json({ message: "Driver deleted successfully" });
        } else {
            res.status(404).json({ message: "Driver not found" });
        }
    } catch (error:any) {    
        res.status(500).json({ error:error.message || "Failed to delete Driver" });
    }    
}