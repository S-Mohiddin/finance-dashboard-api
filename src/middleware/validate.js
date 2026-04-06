const { validationResult } = require('express-validator');
const { errorResponse } = require('../utils/apiResponse');

exports.validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(err => ({
      field: err.path,
      message: err.msg
    }));
    return errorResponse(res, 400, 'Validation Error', formattedErrors);
  }
  next();
};
