import path from "path";
import swaggerJSDoc from "swagger-jsdoc";

export default ({ apiVersion, apiVersionPath }) => {
  /**
   * Swagger definition.
   */
  const swaggerDefinition = {
    info: {
      title: process.env.APP_NAME,
      version: apiVersion,
      description: process.env.APP_DESCRIPTION
    },
    basePath: `/${apiVersionPath}`
  };

  /**
   * Options for the swagger docs.
   */
  const swaggerOptions = {
    // import swaggerDefinitions
    swaggerDefinition,
    // path to the API docs
    apis: [
      path.join(__dirname, `../api/${apiVersionPath}/routes/index.js`),
      path.join(__dirname, `../api/${apiVersionPath}/docs/*.js`),
      path.join(__dirname, `../api/${apiVersionPath}/docs/*.yml`),
      path.join(__dirname, `../api/${apiVersionPath}/docs/*.yaml`)
    ]
  };

  /**
   * Initialize swagger-jsdoc.
   */
  return swaggerJSDoc(swaggerOptions);
};
