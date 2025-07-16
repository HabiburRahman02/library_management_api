import express, { Router } from 'express';
import { createBook } from '../controllers/book.controller';

 const bookRoutes = express.Router();

bookRoutes.post('/', createBook )

export default bookRoutes;