"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_routes_1 = __importDefault(require("./routes/book.routes"));
const borrow_routes_1 = __importDefault(require("./routes/borrow.routes"));
const app = (0, express_1.default)();
// middleware to parse JSON bodies
app.use(express_1.default.json());
app.use('/api/books', book_routes_1.default);
app.use('/api/borrow', borrow_routes_1.default);
app.get('/', (req, res) => {
    res.send('Library_Api');
});
exports.default = app;
