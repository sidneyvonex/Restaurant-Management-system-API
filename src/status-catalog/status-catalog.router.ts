import { Router } from 'express';
import { getStatusCatalog, getStatusCatalogById,createStatusCatalog,updateStatusCatalog, deleteStatusCatalog } from './status-catalog.controller';

export const statusCatalogrouter = Router();

statusCatalogrouter.get('/statuscatalog',getStatusCatalog);
statusCatalogrouter.get('/statuscatalog/:id',getStatusCatalogById);
statusCatalogrouter.post('/statuscatalog',createStatusCatalog);
statusCatalogrouter.put('/statuscatalog/:id',updateStatusCatalog);
statusCatalogrouter.delete('/statuscatalog/:id', deleteStatusCatalog);

