# 🛒 Shopping Cart Application

A full-stack e-commerce shopping cart application built as part of the **ABCDE Ventures Assignment**.

---

## 🚀 Features

### Backend
- User Signup & Login (JWT Authentication)
- Single-Device Login Enforcement
- Product Listing
- Add Items to Cart (One Cart per User)
- Checkout → Convert Cart to Order
- Order History
- MongoDB + Mongoose
- Express.js REST APIs

### Frontend
- React (Vite)
- Product Listing UI
- Click Product → Add to Cart
- Checkout Button
- Cart & Order History (Alerts)

---

## 🧱 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- cors
- dotenv

### Frontend
- React (Vite)
- JavaScript
- Fetch API

---

## 📂 Project Structure

shopping-cart-app/
├── backend/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── server.js
│ ├── .env
│ └── package.json
│
├── frontend/
│ ├── src/
│ ├── App.jsx
│ └── package.json




---

## 🔐 Authentication Flow

- User logs in using username & password
- JWT token generated and stored in database
- Only **one active token per user** (single-device login)
- Token required for cart & order APIs

---

## 📦 API Endpoints

### Users
- `POST /users` → Register
- `POST /users/login` → Login
- `POST /users/logout` → Logout

### Products
- `GET /api/products` → List products
- `POST /api/products` → Add product

### Cart (Protected)
- `POST /carts` → Add item to cart
- `GET /carts` → View cart

### Orders (Protected)
- `POST /orders` → Checkout
- `GET /orders` → Order history

---

## ▶️ Running Locally

### Backend
```bash
cd backend
npm install
npm run dev



Frontend
cd frontend
npm install
npm run dev