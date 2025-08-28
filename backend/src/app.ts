// backend/src/app.ts
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middleware/error.middleware";
import router from "./routes";
import { setupSwagger } from "./controllers/config/swagger";

const app = express();

// Middleware
app.use(
  cors({
    origin: "https://gatherly-frontend-nine.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle OPTIONS preflight requests
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
