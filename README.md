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

##  Role Permissions

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

##  Key Highlights

* Clean **MVC architecture**
* Modular and scalable code structure
* Advanced MongoDB aggregation usage
* Secure authentication & authorization
* Production-ready backend design

---

##  Tech Stack

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

<img width="1560" height="1013" alt="Screenshot 2026-04-06 155618" src="https://github.com/user-attachments/assets/9e373a32-773e-4a5a-a26d-1f84308e6943" />
<img width="1578" height="1005" alt="Screenshot 2026-04-06 155738" src="https://github.com/user-attachments/assets/dab6a3b8-e260-4d0d-9d78-c826a9dc63d9" />
<img width="1572" height="1005" alt="Screenshot 2026-04-06 155914" src="https://github.com/user-attachments/assets/204165b9-1f5d-4e06-bc49-c5c6134d8a10" />
<img width="1576" height="1014" alt="Screenshot 2026-04-06 155926" src="https://github.com/user-attachments/assets/79b21a07-40c8-4405-8e8b-938b65f81907" />
<img width="1574" height="1000" alt="Screenshot 2026-04-06 160057" src="https://github.com/user-attachments/assets/366e2f2e-1d95-4455-8e22-1a1c4d26414a" />
<img width="1055" height="993" alt="Screenshot 2026-04-06 160211" src="https://github.com/user-attachments/assets/e271a52e-1b5b-4817-b1ba-f13078f72512" />

