import express, { Router } from 'express';
import { createBook, getBooks } from '../controllers/book.controller';

 const bookRoutes = express.Router();

bookRoutes.post('/', createBook )
bookRoutes.get('/', getBooks);

export default bookRoutes;