import express from "express";

const app = express();

// Middleware
app.use(express.json());

// Example route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express + Vercel!" });
});

export default app;
