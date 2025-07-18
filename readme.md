# 📚 Library Management API

A simple RESTful API for managing books and borrowing records using Node.js, Express, TypeScript, and MongoDB with Mongoose.

## 🚀 Features

- Add, view, update, and delete books
- Borrow books with quantity tracking
- Track total borrowed books per book
- MongoDB Aggregation for advanced summary
- Proper error handling
- Clean and structured codebase

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB & Mongoose
- Aggregation Pipeline
- Postman for API testing

---


## API Endpoints

1. **Create a Book**  
   `POST /api/books`

2. **Get All Books**  
   `GET /api/books`

3. **Get Book by ID**  
   `GET /api/books/:bookId`

4. **Update Book**  
   `PUT /api/books/:bookId`

5. **Delete Book**  
   `DELETE /api/books/:bookId`

6. **Borrow a Book**  
   `POST /api/borrow`

7. **Borrowed Books Summary (Aggregation)**  
   `GET /api/borrow`

## 📦 Installation & Setup


```bash
git clone https://github.com/HabiburRahman02/library_management_api.git
cd library-management-api
npm install

PORT=5000
MONGODB_URI=mongodb+srv://library_api:jYcGDiFJfYm9dlx4@cluster3.ggy8e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster3

npm start



