const Record = require('../models/Record');
const catchAsync = require('../utils/catchAsync');
const { successResponse, errorResponse } = require('../utils/apiResponse');

// @desc    Get all records with filtering, pagination, search
// @route   GET /api/v1/records
// @access  Private (All roles)
exports.getRecords = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10, category, type, startDate, endDate, search } = req.query;

  let query = { isDeleted: false };

  // Filtering
  if (category) query.category = category;
  if (type) query.type = type;
  if (startDate || endDate) {
    query.date = {};
    if (startDate) query.date.$gte = new Date(startDate);
    if (endDate) query.date.$lte = new Date(endDate);
  }

  // Search by keyword in notes/category (using text index)
  if (search) {
    query.$text = { $search: search };
  }

  // Pagination constraints
  const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
  const parsedLimit = parseInt(limit, 10);

  const records = await Record.find(query)
    .populate('createdBy', 'name email role')
    .sort({ date: -1 })
    .skip(skip)
    .limit(parsedLimit);

  const total = await Record.countDocuments(query);

  successResponse(res, 200, 'Records retrieved successfully', records, {
    pagination: {
      total,
      page: parseInt(page, 10),
      pages: Math.ceil(total / parsedLimit),
    }
  });
});

// @desc    Get single record
// @route   GET /api/v1/records/:id
// @access  Private (All roles)
exports.getRecord = catchAsync(async (req, res, next) => {
  const record = await Record.findOne({ _id: req.params.id, isDeleted: false }).populate('createdBy', 'name email');

  if (!record) {
    return errorResponse(res, 404, 'Record not found');
  }

  successResponse(res, 200, 'Record retrieved successfully', record);
});

// @desc    Create new record
// @route   POST /api/v1/records
// @access  Private (Admin)
exports.createRecord = catchAsync(async (req, res, next) => {
  req.body.createdBy = req.user.id;
  const record = await Record.create(req.body);
  successResponse(res, 201, 'Record created successfully', record);
});

// @desc    Update record
// @route   PUT /api/v1/records/:id
// @access  Private (Admin)
exports.updateRecord = catchAsync(async (req, res, next) => {
  let record = await Record.findOne({ _id: req.params.id, isDeleted: false });

  if (!record) {
    return errorResponse(res, 404, 'Record not found');
  }

  record = await Record.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  successResponse(res, 200, 'Record updated successfully', record);
});

// @desc    Delete (soft) record
// @route   DELETE /api/v1/records/:id
// @access  Private (Admin)
exports.deleteRecord = catchAsync(async (req, res, next) => {
  const record = await Record.findOne({ _id: req.params.id, isDeleted: false });

  if (!record) {
    return errorResponse(res, 404, 'Record not found');
  }

  record.isDeleted = true;
  await record.save();

  successResponse(res, 200, 'Record deleted successfully');
});
