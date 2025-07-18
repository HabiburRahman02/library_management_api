import express from "express";
import { createBorrow, getBorrowedBooks } from "../controllers/borrow.controller";

const borrowRoutes = express.Router();

borrowRoutes.post("/", createBorrow);
borrowRoutes.get("/", getBorrowedBooks);

export default borrowRoutes;
