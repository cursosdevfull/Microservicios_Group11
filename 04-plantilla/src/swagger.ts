import { Application, Request, Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Plantilla", version: "1.0.0" },
  },
  apis: [
    "./src/modules/**/infrastructure/presentation/*.routes.ts",
    "./src/swagger-component.ts",
  ],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app: Application, port: number) => {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api/v1/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(`Swagger docs available at http://localhost:${port}/api/v1/docs`);
};

export { swaggerDocs };
