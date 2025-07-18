import { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/book.model";

export const createBorrow = async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    const book = await Book.findById(bookId);

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

    book.available = book.copies > 0;
    await book.save();

    const borrow = await Borrow.create({ book: bookId, quantity, dueDate });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error borrowing book",
      error,
    });
  }
};

export const getBorrowedBooks = async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo",
        },
      },
      {
        $unwind: "$bookInfo",
      },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn",
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve borrowed books summary",
      error,
    });
  }
};
