exports.successResponse = (res, statusCode, message, data = {}, extraFields = {}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    ...extraFields
  });
};

exports.errorResponse = (res, statusCode, message, errors = null) => {
  const response = {
    success: false,
    message
  };
  if (errors) {
    response.errors = errors;
  }
  return res.status(statusCode).json(response);
};
