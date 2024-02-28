const { NextResponse } = require("next/server");

const errorMiddleware = (req, params, next, error) => {
  return NextResponse.json(
    {
      message: "Server error occured while processing data.",
      method: req.method,
      url: req.url,
    },
    { status: 500 }
  );
};

const customErrorMiddleware = (errorMessage, statusCode) => {
  statusCode = statusCode ? statusCode : 500;
  return NextResponse.json(
    {
      success: false,
      msg: errorMessage,
    },
    { status: statusCode }
  );
};

module.exports = { errorMiddleware, customErrorMiddleware };
