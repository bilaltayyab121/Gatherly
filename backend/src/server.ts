// // import app from './app';

// // const PORT = process.env.port || 3000;

// // const server = app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });

// // process.on('unhandledRejection', (err: Error) => {
// //   console.log('UNHANDLED REJECTION! 💥 Shutting down...');
// //   console.log(err.name, err.message);
// //   server.close(() => {
// //     process.exit(1);
// //   });
// // });

// // process.on('SIGTERM', () => {
// //   console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
// //   server.close(() => {
// //     console.log('💥 Process terminated!');
// //   });
// // });

// // export default app;

// // backend/src/server.ts
// import app from "./app";
// import serverless from "serverless-http";

// export const handler = serverless(app);

import express from "express";

const app = express();

// Middleware
app.use(express.json());

// Example route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express + Vercel!" });
});

export default app;
