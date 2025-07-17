import express from 'express';
import { createBook, getBookById, getBooks } from '../controllers/book.controller';

 const bookRoutes = express.Router();

bookRoutes.post('/', createBook )
bookRoutes.get('/', getBooks);
bookRoutes.get('/:id', getBookById);


export default bookRoutes;