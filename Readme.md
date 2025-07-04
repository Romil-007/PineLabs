# PineLabs POS Management Platform

A Point of Sale management platform with React frontend and Node.js backend for managing transactions, inventory, and customers.

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Setup](#quick-setup)
- [Environment Variables](#environment-variables)
- [Features](#features)

## 🚀 What it does
- Transaction management and payment processing
- Customer and inventory tracking  
- Invoice generation and reporting
- POS device management

## 🛠 Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, Chart.js, React Router
**Backend:** Node.js, Express, MongoDB, Redis, JWT
**Optional:** Firebase, Neo4j



## ⚡ Quick Setup

**Prerequisites:** Node.js, MongoDB, Redis (optional)

```bash
# 1. Install dependencies
cd Backend && npm install
cd ../Frontend && npm install

# 2. Setup environment files (see below)

# 3. Run the application
cd Backend && npm run dev    # Backend on :5000
cd Frontend && npm run dev   # Frontend on :5173
```

## 🔑 Environment Variables

### Backend `.env` (Required)
```env
PORT=5000
MONGO_DB_URL=mongodb://localhost:27017/pinelabs_pos
JWT_SECRET=your_secret_key
```

### Backend `.env` (Optional)
```env
REDIS_URL=redis://localhost:6379
FIREBASE_API_KEY=your_firebase_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
NEO4J_URI=bolt://localhost:7687
```

### Frontend `.env`
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## ✨ Features

- **Authentication:** Email/Password login, OTP verification, JWT sessions
- **Transactions:** POS transactions, multiple payment methods, receipts
- **Customers:** Profile management, transaction history  
- **Inventory:** Product catalog, stock tracking
- **Reporting:** Sales dashboard, analytics, revenue tracking
- **POS Management:** Device registration and monitoring

## 📁 Project Structure
```
├── Backend/
│   ├── [server.js](Backend/server.js) - Main server
│   ├── [Configs/DbConnection.js](Backend/Configs/DbConnection.js) - Database setup
│   ├── Controllers/ - Business logic
│   │   ├── [authController.js](Backend/Controllers/authController.js) - Auth logic
│   │   └── [merchantController.js](Backend/Controllers/merchantController.js) - Merchant ops
│   ├── Models/ - Database schemas
│   │   ├── [merchantModel.js](Backend/Models/merchantModel.js) - User data
│   │   ├── [customerModel.js](Backend/Models/customerModel.js) - Customer data
│   │   ├── [transactionModel.js](Backend/Models/transactionModel.js) - Transactions
│   │   └── [productsModel.js](Backend/Models/productsModel.js) - Products
│   └── Routes/ - API endpoints
├── Frontend/
│   ├── [src/App.jsx](Frontend/src/App.jsx) - Main component
│   ├── components/ - UI components
│   │   ├── auth/ - Login/Register forms
│   │   ├── modals/ - Popup dialogs
│   │   └── ui/ - Reusable components
│   ├── pages/ - Main pages
│   │   ├── [Dashboard.jsx](Frontend/src/pages/Dashboard.jsx) - Overview
│   │   ├── [Transactions.jsx](Frontend/src/pages/Transactions.jsx) - Transaction mgmt
│   │   └── [Customers.jsx](Frontend/src/pages/Customers.jsx) - Customer mgmt
│   └── utils/ - Helper functions
```
---

**Author:** Romil Pandey
