import express, { Router } from "express";

import swaggerSpec from "../../../utils/swagger";
import human from "./human";
import pet from "./pet";

export default ({
  apiVersion,
  apiVersionPath,
  swaggerIndexContent,
  pathToSwaggerUi
}) => {
  // Contains all API routes for the application.
  const router = Router();

  // GET /v1/swagger.json
  router.get("/swagger.json", (req, res) => {
    res.json(swaggerSpec({ apiVersion, apiVersionPath }));
  });

  // GET /v1/api-docs
  const swaggerCustomIndexContent = swaggerIndexContent.replace(
    "https://petstore.swagger.io/v2/swagger.json",
    `/${apiVersionPath}/swagger.json`
  );

  router.get("/api-docs/index.html", (req, res) =>
    res.send(swaggerCustomIndexContent)
  );
  router.get("/api-docs", (req, res) =>
    res.redirect(`/${apiVersionPath}/api-docs/index.html`)
  );
  router.use("/api-docs", express.static(pathToSwaggerUi));

  // GET /v1
  router.get("/", (req, res) => {
    res.json({
      app: req.app.locals.title,
      apiVersion
    });
  });

  // GET /v1/humans
  router.use("/humans", human);

  // GET /v1/pets
  router.use("/pets", pet);

  return router;
};
