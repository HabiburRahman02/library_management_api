import e, { Request, Response } from "express";
import { Book } from "../models/book.model";

export const createBook = async (req: Request, res: Response) => {
    try {
        const bookData = req.body;
        const createBook = await Book.create(bookData);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: createBook
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Validation failed",
            error
        });
    }
}

export const getBooks = async (req: Request, res: Response) => {
    try {
        const query = req.query.filter ? { genre: req.query.filter } : {};
        console.log(req.query);
        const { sortBy = 'createdAt' as string, sort = 'asc' as string, limit = 10 } = req.query;
        const sortOrder = sort === 'desc' ? -1 : 1;

        const books = await Book.find(query)
            .sort({ [String(sortBy)]: sortOrder })
            .limit(Number(limit));
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching books",
            error
        });
    }
}   