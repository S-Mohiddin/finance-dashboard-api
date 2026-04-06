#  Finance Dashboard API

A production-ready backend system for managing financial records and generating analytics, built with **Node.js, Express, and MongoDB**.

---

## Features

###  Authentication & Authorization

* JWT-based authentication
* Role-Based Access Control (RBAC)
* Roles:

  * **Viewer** → Read-only access
  * **Analyst** → Read + Dashboard analytics
  * **Admin** → Full CRUD + User management

---

###  Financial Records Management

* Create, update, delete (soft delete), and fetch records
* Supports:

  * Pagination (`page`, `limit`)
  * Filtering (`type=income/expense`)
  * Search (text-based on notes/category)

---

###  Dashboard Analytics

* Net balance calculation
* Category-wise breakdown
* Monthly trends
* Recent transactions
* Built using **MongoDB Aggregation Pipelines**

---

###  Security

* Input validation using `express-validator`
* Rate limiting using `express-rate-limit`
* Security headers via `helmet`
* CORS enabled

---

###  Error Handling

* Centralized global error handler
* Consistent JSON response structure

---

##  Setup Instructions

### 1️⃣ Install Dependencies

```bash
npm install
```

---

### 2️⃣ Configure Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=30d
```

---

### 3️⃣ Run the Server

```bash
npm run dev    # Development (nodemon)
npm start      # Production
```

---

## 👥 Role Permissions

| Role    | Permissions                        |
| ------- | ---------------------------------- |
| Viewer  | Read-only access to records        |
| Analyst | Read records + Dashboard analytics |
| Admin   | Full CRUD + User management        |

---

##  API Endpoints

###  Auth

* `POST /api/v1/auth/register` → Register user
* `POST /api/v1/auth/login` → Login (get JWT)
* `GET /api/v1/auth/me` → Current user profile

---

###  Users (Admin Only)

* `GET /api/v1/users` → Get all users
* `PUT /api/v1/users/:id` → Update role/status

---

###  Records

* `GET /api/v1/records`
  Supports:

  ```
  ?page=1&limit=10&type=income&search=keyword
  ```
* `POST /api/v1/records` → Create record (Admin)
* `PUT /api/v1/records/:id` → Update record (Admin)
* `DELETE /api/v1/records/:id` → Soft delete (Admin)

---

###  Dashboard (Analyst & Admin)

* `GET /api/v1/dashboard` → Aggregated financial insights

---

##  Example Dashboard Output

```json
{
  "totalIncome": 5000,
  "totalExpenses": 1000,
  "netBalance": 4000
}
```

---

## 🧠 Key Highlights

* Clean **MVC architecture**
* Modular and scalable code structure
* Advanced MongoDB aggregation usage
* Secure authentication & authorization
* Production-ready backend design

---

## 📦 Tech Stack

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT (Authentication)
* Express Validator
* Helmet
* Rate Limiter

---

##  Assumptions

* MongoDB Atlas or local instance is configured
* Default user role is `Viewer`
* Admin manually assigns higher roles
* Rate limiting is IP-based

---

##  Author

**Mohi (Mohiddin)**
Backend Developer 
