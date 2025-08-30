// // backend/src/app.ts
// import express from "express";
// import morgan from "morgan";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import globalErrorHandler from "./middleware/error.middleware";
// import router from "./routes";
// import { setupSwagger } from "./controllers/config/swagger";

// const app = express();

// // Middleware
// app.use(
//   cors({
//     origin: "*",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//   })
// );

// // Handle OPTIONS preflight requests
// app.options(
//   "*",
//   cors({
//     origin: "*",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//   })
// );

// app.use(express.json());
// app.use(cookieParser());

// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

// // Routes
// app.use("/api/v1", router);

// setupSwagger(app);

// // Error handling middleware
// app.use(globalErrorHandler);

// export default app;

import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middleware/error.middleware";
import router from "./routes";
import { setupSwagger } from "./controllers/config/swagger";

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/v1", router);

setupSwagger(app);

// Error handling middleware
app.use(globalErrorHandler);

export default app;
