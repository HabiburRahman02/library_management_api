import e, { Request, Response } from "express";
import { Book } from "../models/book.model";

export const createBook = async (req: Request, res: Response) => {
  try {
    const bookData = req.body;
    const createBook = await Book.create(bookData);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: createBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Validation failed",
      error,
    });
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const query = req.query.filter ? { genre: req.query.filter } : {};
    console.log(req.query);
    const {
      sortBy = "createdAt" as string,
      sort = "asc" as string,
      limit = 10,
    } = req.query;
    const sortOrder = sort === "desc" ? -1 : 1;

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
      error,
    });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching book",
      error,
    });
  }
};


export const updateBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const bookData = req.body;
    const existing = await Book.findOne({
      isbn: bookData.isbn,
      _id: { $ne: bookId },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "ISBN already exists",
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(bookId, bookData, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating book",
      error,
    });
  }
};
