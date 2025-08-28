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

// // const allowedOrigins = [
// //   "https://gatherly-frontend-nine.vercel.app",
// // ];
// // app.use(cors({
// //   origin: allowedOrigins
// // }));

// const allowedOrigins = [
//   "https://gatherly-frontend-nine.vercel.app",
//   /\.vercel\.app$/
// ];

// app.use(cors({
//   origin: allowedOrigins,
//   credentials: true
// }));

// app.use((req, res, next) => {
//     res.set({
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "*",
//         "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
//     });

//     next();
// });

// // app.use(cors({ origin: allowedOrigins }));

// // app.options("*", cors());

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

// backend/src/app.ts
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middleware/error.middleware";
import router from "./routes";
import { setupSwagger } from "./controllers/config/swagger";

const app = express();

// CORS Configuration
const allowedOrigins = [
  "https://gatherly-frontend-nine.vercel.app",
  /\.vercel\.app$/, // This allows all vercel.app subdomains
  ...(process.env.NODE_ENV === "development"
    ? [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
      ]
    : []),
];

// Single CORS configuration - remove conflicting manual headers
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Check if origin is allowed
      const isAllowed = allowedOrigins.some((allowedOrigin) => {
        if (typeof allowedOrigin === "string") {
          return allowedOrigin === origin;
        } else if (allowedOrigin instanceof RegExp) {
          return allowedOrigin.test(origin);
        }
        return false;
      });

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies and credentials
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
      "X-Auth-Token",
      "Cache-Control",
    ],
  })
);

// Handle preflight requests
app.options("*", cors());

// Other middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
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
