// backend/src/app.ts
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './middleware/error.middleware';
import router from './routes';
import { setupSwagger } from "./config/swagger";

const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-frontend-domain.vercel.app"], 
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true, // allow cookies/headers
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// app.use(
//   cors({
//     origin: "http://localhost:5173", // your frontend
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     credentials: true, // needed if you use cookies / auth headers
//   })
// );

app.use(express.json());
app.use(cookieParser());


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/v1', router);

setupSwagger(app);

// Error handling middleware
app.use(globalErrorHandler);


export default app;