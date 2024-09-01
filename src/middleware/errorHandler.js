const errorHandler = (err, req, res, next) => {
  // Log the error for debugging purposes
  console.error(err);

  // Set a default status code and message
  let statusCode = 500;
  let message = "Internal Server Error";

  // Check if the error has a status code
  if (err.statusCode) {
    statusCode = err.statusCode;
  }

  // Check if the error has a custom message
  if (err.message) {
    message = err.message;
  }

  // Send the error response
  res.status(statusCode).json({
    error: {
      message,
      status: statusCode,
    },
  });
};

module.exports = errorHandler;
