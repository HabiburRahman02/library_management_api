import express from 'express';
import { createBook, deleteBookById, getBookById, getBooks, updateBookById } from '../controllers/book.controller';

 const bookRoutes = express.Router();

bookRoutes.post('/', createBook )
bookRoutes.get('/', getBooks);
bookRoutes.get('/:bookId', getBookById);
bookRoutes.put('/:bookId', updateBookById);
bookRoutes.delete('/:bookId', deleteBookById);


export default bookRoutes;