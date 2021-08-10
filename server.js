const express = require("express");
const morgan = require("morgan");
const route = require("./route");

const errorHandler = async (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

const app = express();

// Body Parser
app.use(express.json());

// Dev logging middleware
app.use(morgan("dev"));

// Add CORS middleware
const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
};
app.use(allowCrossDomain);

// Mount Routers
app.use("/", route);

app.use(errorHandler);

const PORT = 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
