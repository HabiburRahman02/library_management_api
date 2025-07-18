import express from 'express';
import bookRoutes from './routes/book.routes';
import borrowRoutes from './routes/borrow.routes';

const app = express();

// middleware to parse JSON bodies
app.use(express.json());  

app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes); 

app.get('/',(req, res)=>{
    res.send('Library_Api')
})

export default app;