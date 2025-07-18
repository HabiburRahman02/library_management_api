"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookById = exports.updateBookById = exports.getBookById = exports.getBooks = exports.createBook = void 0;
const book_model_1 = require("../models/book.model");
const createBook = async (req, res) => {
    try {
        const bookData = req.body;
        const createBook = await book_model_1.Book.create(bookData);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: createBook,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Validation failed",
            error,
        });
    }
};
exports.createBook = createBook;
const getBooks = async (req, res) => {
    try {
        const query = req.query.filter ? { genre: req.query.filter } : {};
        console.log(req.query);
        const { sortBy = "createdAt", sort = "asc", limit = 10, } = req.query;
        const sortOrder = sort === "desc" ? -1 : 1;
        const books = await book_model_1.Book.find(query)
            .sort({ [String(sortBy)]: sortOrder })
            .limit(Number(limit));
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching books",
            error,
        });
    }
};
exports.getBooks = getBooks;
const getBookById = async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const book = await book_model_1.Book.findById(bookId);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching book",
            error,
        });
    }
};
exports.getBookById = getBookById;
const updateBookById = async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const bookData = req.body;
        const existing = await book_model_1.Book.findOne({
            isbn: bookData.isbn,
            _id: { $ne: bookId },
        });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: "ISBN already exists",
            });
        }
        const updatedBook = await book_model_1.Book.findByIdAndUpdate(bookId, bookData, {
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating book",
            error,
        });
    }
};
exports.updateBookById = updateBookById;
const deleteBookById = async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const deletedBook = await book_model_1.Book.findByIdAndDelete(bookId);
        if (!deletedBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting book",
            error,
        });
    }
};
exports.deleteBookById = deleteBookById;
