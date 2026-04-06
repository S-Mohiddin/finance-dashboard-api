const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return errorResponse(res, 400, 'User already exists');
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role: 'Viewer', // default
  });

  const token = generateToken(user._id);

  successResponse(res, 201, 'User registered successfully', {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  });
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return errorResponse(res, 400, 'Please provide an email and password');
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.matchPassword(password))) {
    return errorResponse(res, 401, 'Invalid credentials');
  }

  if (user.status !== 'active') {
    return errorResponse(res, 403, 'User account is inactive');
  }

  const token = generateToken(user._id);

  successResponse(res, 200, 'Login successful', {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  });
});

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  successResponse(res, 200, 'User profile retrieved', user);
});
