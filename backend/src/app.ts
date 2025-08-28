// backend/src/app.ts
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middleware/error.middleware";
import router from "./routes";
import { setupSwagger } from "./config/swagger";

const app = express();

// Middleware

const allowedOrigins = [
  "http://localhost:5173",
  "https://gatherly-frontend-nine.vercel.app",
  /\.vercel\.app$/, // ✅ allow any *.vercel.app frontend (regex)
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        allowedOrigins.some((o) =>
          typeof o === "string" ? o === origin : o.test(origin)
        )
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

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
