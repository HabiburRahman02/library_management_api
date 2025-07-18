import mongoose from "mongoose";
import { BorrowInterface } from "../interfaces/borrow.interface";

const borrowSchema = new mongoose.Schema<BorrowInterface>({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: [true, 'Quantity is required'], min: [1, 'At least 1 copy must be borrowed'] },
    dueDate: { type: Date, required: [true, 'Due Date is required'] },
}, {
    timestamps: true,
    versionKey: false   
})

export const Borrow = mongoose.model('Borrow', borrowSchema);   



 