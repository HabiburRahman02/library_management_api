import express from 'express';
import bookRoutes from './routes/book.routes';

const app = express();

// middleware to parse JSON bodies
app.use(express.json());  

app.use('/api/books', bookRoutes)

export default app;