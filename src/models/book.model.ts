import mongoose from "mongoose";
import { BookInterface } from "../interfaces/book.interface";


const bookSchema = new mongoose.Schema<BookInterface>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true, enum:{
        values:  ['FICTION', 'NON-FICTION', 'SCIENCE', 'HISTORY', 'FANTASY'],
        message: '{VALUE} is not a valid genre' 
    } },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true, min: [0, "Copies must be a positive number"] },
    available: { type: Boolean, default: true },
}, {
    timestamps: true,
    versionKey: false
});

export const Book = mongoose.model('Book', bookSchema);

bookSchema.methods.updateAvailability = function () {
  this.available = this.copies > 0;
  return this.save();
};