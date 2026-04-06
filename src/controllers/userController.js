const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const { successResponse, errorResponse } = require('../utils/apiResponse');

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private/Admin
exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({});
  successResponse(res, 200, 'Users retrieved successfully', users);
});

// @desc    Update user role & status
// @route   PUT /api/v1/users/:id
// @access  Private/Admin
exports.updateUser = catchAsync(async (req, res, next) => {
  const { role, status } = req.body;
  
  const user = await User.findById(req.params.id);

  if (!user) {
    return errorResponse(res, 404, 'User not found');
  }

  if (role) user.role = role;
  if (status) user.status = status;

  await user.save();

  successResponse(res, 200, 'User updated successfully', {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status
  });
});
