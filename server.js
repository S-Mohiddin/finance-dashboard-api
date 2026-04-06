require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./src/config/db');

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Basic Route
app.get('/', (req, res) => {
  res.json({ message: 'Finance Dashboard API is running...' });
});

// App Routes
app.use('/api/v1/auth', require('./src/routes/authRoutes'));
app.use('/api/v1/users', require('./src/routes/userRoutes'));
app.use('/api/v1/records', require('./src/routes/recordRoutes'));
app.use('/api/v1/dashboard', require('./src/routes/dashboardRoutes'));

// Global Error Handler
const errorHandler = require('./src/middleware/error');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
