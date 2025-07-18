"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrowedBooks = exports.createBorrow = void 0;
const borrow_model_1 = require("../models/borrow.model");
const book_model_1 = require("../models/book.model");
const createBorrow = async (req, res) => {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const book = await book_model_1.Book.findById(bookId);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        if (!book.available) {
            return res.status(400).json({
                success: false,
                message: "Book is not available for borrowing",
            });
        }
        if (book.copies < quantity) {
            return res.status(400).json({
                success: false,
                message: `Only ${book.copies} copies available`,
            });
        }
        const borrow = await borrow_model_1.Borrow.create({ book: bookId, quantity, dueDate });
        book.copies -= quantity;
        if (book.copies === 0) {
            book.available = false;
        }
        await book.save();
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error borrowing book",
            error,
        });
    }
};
exports.createBorrow = createBorrow;
const getBorrowedBooks = async (req, res) => {
    try {
        const summary = await borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: { $sum: '$quantity' }
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'bookInfo'
                }
            },
            {
                $unwind: '$bookInfo'
            },
            {
                $project: {
                    _id: 0,
                    totalQuantity: 1,
                    book: {
                        title: '$bookInfo.title',
                        isbn: '$bookInfo.isbn'
                    }
                }
            }
        ]);
        res.status(200).json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: summary
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve borrowed books summary',
            error
        });
    }
};
exports.getBorrowedBooks = getBorrowedBooks;
