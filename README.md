# 🐟 Jadhav's Fish Farm — React + Node.js Full Stack Project

## Tech Stack
| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Frontend  | React 18, React Router v6, Axios, CSS   |
| Backend   | Node.js, Express.js, mysql2, JWT, bcrypt|
| Database  | MySQL                                   |

---

## Project Structure
```
fishfarm/
├── frontend/               # React app
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── api/
│       │   └── axios.js          # Axios instance + interceptors
│       ├── components/
│       │   ├── Navbar.js / .css
│       │   ├── Footer.js / .css
│       │   └── ProductCard.js / .css
│       ├── context/
│       │   ├── AuthContext.js    # Login/logout/user state
│       │   └── CartContext.js    # Cart state (localStorage)
│       ├── pages/
│       │   ├── Home.js           # Landing page
│       │   ├── Products.js       # Product listing + add to cart
│       │   ├── Cart.js           # Cart management
│       │   ├── Checkout.js       # Order placement
│       │   ├── OrderSuccess.js   # Confirmation
│       │   ├── MyOrders.js       # Customer order history
│       │   ├── Profile.js        # User profile
│       │   ├── About.js
│       │   ├── Contact.js
│       │   ├── Feedback.js
│       │   ├── Login.js
│       │   ├── Register.js
│       │   └── Admin/
│       │       ├── AdminLogin.js
│       │       ├── AdminLayout.js    # Sidebar layout
│       │       ├── AdminDashboard.js # Stats + recent orders
│       │       ├── AdminProducts.js  # CRUD products
│       │       ├── AdminOrders.js    # View + update order status
│       │       ├── AdminFeedback.js
│       │       ├── AdminContacts.js
│       │       └── Admin.css
│       ├── App.js            # Routes
│       ├── index.js
│       └── index.css         # Global styles + design tokens
│
├── backend/                # Node.js/Express API
│   ├── config/
│   │   └── db.js             # MySQL connection pool
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   ├── feedbackController.js
│   │   └── contactController.js
│   ├── middleware/
│   │   └── auth.js           # JWT protect + adminOnly
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── feedbackRoutes.js
│   │   └── contactRoutes.js
│   ├── server.js             # Express app entry point
│   ├── database.sql          # MySQL schema + seed data
│   ├── package.json
│   └── .env.example          # Copy to .env and fill in values
│
└── README.md
```

---

## Quick Start

### 1. Database Setup
```bash
mysql -u root -p < backend/database.sql
```

### 2. Backend
```bash
cd backend
cp .env.example .env        # Edit DB credentials if needed
npm install
npm run dev                 # Runs on http://localhost:5000
```

### 3. Frontend
```bash
cd frontend
npm install
npm start                   # Runs on http://localhost:3000
```

---

## API Endpoints

### Auth
| Method | Endpoint              | Description         | Auth     |
|--------|-----------------------|---------------------|----------|
| POST   | /api/auth/register    | Register customer   | Public   |
| POST   | /api/auth/login       | Customer login      | Public   |
| POST   | /api/auth/admin/login | Admin login         | Public   |

### Products
| Method | Endpoint              | Description         | Auth     |
|--------|-----------------------|---------------------|----------|
| GET    | /api/products         | Get all products    | Public   |
| GET    | /api/products/:id     | Get one product     | Public   |
| POST   | /api/products         | Add product         | Admin    |
| PUT    | /api/products/:id     | Update product      | Admin    |
| DELETE | /api/products/:id     | Delete product      | Admin    |

### Orders
| Method | Endpoint              | Description         | Auth     |
|--------|-----------------------|---------------------|----------|
| POST   | /api/orders           | Place order         | Public   |
| GET    | /api/orders/my        | Customer orders     | Customer |
| GET    | /api/orders           | All orders          | Admin    |
| PATCH  | /api/orders/:id/status| Update status       | Admin    |

### Feedback & Contact
| Method | Endpoint              | Description         | Auth     |
|--------|-----------------------|---------------------|----------|
| POST   | /api/feedback         | Submit feedback     | Public   |
| GET    | /api/feedback         | View all feedback   | Admin    |
| POST   | /api/contact          | Send message        | Public   |
| GET    | /api/contact          | View all messages   | Admin    |

---

## Default Admin Credentials
- **Email:** admin@fishfarm.com
- **Password:** admin123

## Features
- 🛒 Add to cart / update qty / remove items
- 💳 Checkout with COD / UPI / Bank Transfer
- 📦 Order tracking (Pending → Confirmed → Delivered)
- 🔐 JWT authentication for customers and admins
- 📊 Admin dashboard with live stats
- ✏ Admin CRUD for products
- ⭐ Customer feedback with star rating
- 📞 Contact form
- 📱 Fully responsive design
