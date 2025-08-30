// import express from "express";
// import serverless from "serverless-http";

// const app = express();

// // Middleware
// app.use(express.json());

// // Example route
// app.get("/api/hello", (req, res) => {
//   res.json({ message: "Hello from Express + Vercel!" });
// });

// export const handler = serverless(app);

import app from "../src/app";
import serverless from "serverless-http";

// Create the serverless handler
const handler = serverless(app);

// Export the handler for Vercel with proper CORS handling
export default async (req: any, res: any) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://gatherly-frontend-nine.vercel.app"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Pass to the serverless handler
  return handler(req, res);
};
