import { Request, Response } from "express";
import { getAllExistingStatusCatalog, getExistingStatusCatalogById, createNewStatusCatalog, updateExistingStatusCatalog, deleteExistingStatusCatalog} from "./status-catalog.service";
 
//Business logic for Status Catalog Related operations
 
 
export const getStatusCatalog = async (req: Request, res: Response) => {
    try {
        const allStatusCatalog = await getAllExistingStatusCatalog();
        if (allStatusCatalog == null || allStatusCatalog.length == 0) {
          res.status(404).json({ message: "Status Catalog not  found" });
        }else{
            res.status(200).json(allStatusCatalog);            
        }            
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to fetch Status Catalog  " });
    }
}
 
export const getStatusCatalogById = async (req: Request, res: Response) => {
    const insertedStatusCatalogId = parseInt(req.params.id);
    if (isNaN(insertedStatusCatalogId)) {
        res.status(400).json({ error: "Invalid Status Catalog ID" });
         return; // Prevent further execution
    }
    try {
        const statusCatalog = await getExistingStatusCatalogById(insertedStatusCatalogId);
        if (statusCatalog == undefined) {
            res.status(404).json({ message: "Status Catalog not found" });
        } else {
            res.status(200).json(statusCatalog);
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to find Status Catalog" });
    }
}
 
export const createStatusCatalog = async (req: Request, res: Response) => {
    const { statusCatalogName} = req.body;
    if (!statusCatalogName) {
        res.status(400).json({ error: "All fields are required" });
        return; // Prevent further execution
    }
    try {
        const createdStatusCatalog = await createNewStatusCatalog({statusCatalogName});
        if (createdStatusCatalog == null) {
            res.status(500).json({ message: "Failed to create Status Catalog" });
        } else {
            res.status(201).json({message:createdStatusCatalog});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to create Status Catalog" });
    }
}
 
export const updateStatusCatalog = async (req: Request, res: Response) => {
    const insertedStatusCatalogId = parseInt(req.params.id);
    if (isNaN(insertedStatusCatalogId)) {
        res.status(400).json({ error: "Invalid Status Catalog Id" });
        return; // Prevent further execution
    }
    const { statusCatalogName} = req.body;
    if (!statusCatalogName) {
        res.status(400).json({ error: "All fields are required" });
        return; // Prevent further execution
    }
    try {
        const updatedStatusCatalog = await updateExistingStatusCatalog(insertedStatusCatalogId, {statusCatalogName});
        if (updatedStatusCatalog == null) {
            res.status(404).json({ message: "Status Catalog  not found or failed to update" });
        } else {
            res.status(200).json({message:updatedStatusCatalog});
        }
    } catch (error:any) {
        res.status(500).json({ error:error.message || "Failed to update Status Catalog " });
    }
}
 
 
 
export const deleteStatusCatalog = async (req: Request, res: Response) => {
    const InsertedStatusCatalogId = parseInt(req.params.id);  
    if (isNaN(InsertedStatusCatalogId)) {
        res.status(400).json({ error: "Invalid Status Catalog ID" });
        return; // Prevent further execution
    }
    try {
        const deletedOrderMenuItem = await deleteExistingStatusCatalog(InsertedStatusCatalogId);
        if (deletedOrderMenuItem) {
            res.status(200).json({ message: "Status Catalog deleted successfully" });
        } else {
            res.status(404).json({ message: "Status Catalog not found" });
        }
    } catch (error:any) {    
        res.status(500).json({ error:error.message || "Failed to delete Status Catalog" });
    }    
}
