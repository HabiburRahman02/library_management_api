import mongoose from "mongoose";

export interface BorrowInterface {
    book: mongoose.Schema.Types.ObjectId;
    quantity: number;
    dueDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
}  