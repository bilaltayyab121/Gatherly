import express from "express";
import serverless from "serverless-http";

const app = express();

// Middleware
app.use(express.json());

// Example route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express + Vercel!" });
});

export const handler = serverless(app);
