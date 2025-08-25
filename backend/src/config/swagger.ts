import { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import  swaggerUi  from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0", // OpenAPI version
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation for my Node.js app",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
