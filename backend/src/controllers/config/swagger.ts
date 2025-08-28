import path from "path";
import express, { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
dotenv.config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Gatherly API",
      version: "1.0.0",
      description: "API documentation for my Node.js app",
    },
    servers: [
      {
        url: process.env.VERCEL_URL
          ? `https://gatherly-backend.vercel.app/api/v1`
          : "http://localhost:3000/api/v1",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./dist/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  // 👇 Mount swagger-ui assets manually
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
    })
  );

  // 👇 Extra: serve static files directly in case Vercel blocks them
  app.use(
    "/api-docs",
    express.static(path.join(require.resolve("swagger-ui-dist"), ".."))
  );
};
