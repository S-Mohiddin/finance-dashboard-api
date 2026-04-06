const jwt = require('jsonwebtoken');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const { errorResponse } = require('../utils/apiResponse');

// Protect routes
exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exists
  if (!token) {
    return errorResponse(res, 401, 'Not authorized to access this route');
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    
    if (!req.user) {
      return errorResponse(res, 401, 'User no longer exists');
    }

    if (req.user.status !== 'active') {
      return errorResponse(res, 403, 'User account is inactive');
    }

    next();
  } catch (err) {
    return errorResponse(res, 401, 'Not authorized to access this route');
  }
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return errorResponse(
        res,
        403,
        `User role ${req.user.role} is not authorized to access this route`
      );
    }
    next();
  };
};
