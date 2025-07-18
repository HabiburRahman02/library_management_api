"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bookSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true, enum: {
            values: ['FICTION', 'NON-FICTION', 'SCIENCE', 'HISTORY', 'FANTASY'],
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
exports.Book = mongoose_1.default.model('Book', bookSchema);
