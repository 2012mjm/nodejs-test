## Prerequisites

- [Node.js](https://yarnpkg.com/en/docs/install)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [NPM](https://docs.npmjs.com/getting-started/installing-node)

## Installing

Clone the repository, install the dependencies and get started right away.

    $ git clone git@github.com:2012mjm/nodejs-test.git
    $ cd nodejs-test
    $ yarn   # or npm install

Make a copy of `.env.example` as `.env` and update your application details. Now, start the application.

    $ yarn start:dev (For development)
    $ NODE_ENV=production yarn start (For production)

Navigate to http://localhost:8848/v1/api-docs/ to verify installation.

## Tests

    $ yarn test

Run tests with coverage.

    $ yarn test:coverage

## File structure

  - `public` (contains all static files like images, styles and javascript)
  - `src` (NodeJS source code)
    - `api`
        - `v1` (API version)
            - `controllers` (contains logic for interacting with services and rendering appropriate response to the client)
            - `docs` (swagger documents)
            - `routes` (contains the route definitions for our API)
            - `services` (it encapsulates the application's business logic and interacting with controllers and models)
            - `validators` (contains validation requests before controllers)
    - `middlewares` (Express middlewares which process the incoming requests before handling them down to the routes)
    - `utils`
      - `constants.js` (constants like fake data)
      - `exceptions.js` (defines custom error exception)
    - `env.js` (initialize environment variables)
    - `index.js` (the entry point to our application)
  - `test` (community convention for automated unit test files)
  - `.env.example` (system constants like current app version, app IP, app host, ...)
  - `package.json` (remembers all packages that your app depends on and their versions)

## How to Contribute
### Development Workflow
You can run several commands:

- `yarn prestart` - creates a build folder with all the packages
- `yarn lint` - checks the code style.
- `yarn lint:fix` - fix the code style.
- `yarn prettier` - prettier the code style.
- `yarn codecov` - runs the code coverage.
- `yarn test` - runs the complete test suite.
- `yarn test:coverage` - runs the complete test suite with coverage.

### Style Guide
We use an automatic code formatter called Prettier. Run yarn prettier after making any changes to the code.

Then, our linter will catch most issues that may exist in your code. You can check the status of your code styling by simply running yarn lint.

### Understand the logic
Currently, this system consists of two entities, including Human and Pet, each pet being linked to human beings, Human entity has two parameters including Name and Age, also Pet entity has two parameters including Name and Type.

*If the age of each human is more than 30, he/she doesn't want to show his/her pets and system should return zero result, these age conditions may apply to other new entities*

To define a new entity in the system, you must first create a controller for that entity in `/src/api/v1/controllers/` path, for example, `HumanController.js` and then you need to add actions, for example, `fetchAll` action.

    export const fetchAll = (req, res, next) => {
        return HumanService.getAllHumans();
    };

After this step, you need to add this controller and actions to the routes, first create a file similar to your entity name in the `/src/api/v1/routes/` path, for example, `human.js`

    import { Router } from "express";
    const router = Router();

    router.get("/", fetchAll);
    
    export default router;

Then modify the `/src/api/v1/routes/index.js` file as follows

    import human from "./human";
    router.use("/humans", human);

Note that the logic of the system is written inside the services, and the controller is only responsible for receiving data from the client and displaying the result to they, so create a file similar to your controller name in the `/src/api/v1/services/` path, for example, `HumanService.js`

    import constants from "./utils/constants";

    export const getAllHumans = () => {
        const { humans } = constants; // Get humans fake list
        return humans;
    };

Also, to validate the parameters sent by the client to the actions, you must first create a file similar to your controller name in the `/src/api/v1/validators/` directory, for example: `HumanValidator.js` and use it in the routes.

### Exception Handler
For any error occurring in the application logic within the Services, you must return a specific exception

First, you create an exception in the exceptions.js file in the `/src/utils/` path.

Then in the where the error occurs, it returns the exception for the result of the function.

    if (humans.length === 0)
        throw new NotFoundHumanException();

Finally, you need to `try` and `catch` in your controller for handle errors and send to the client a corresponding message for each exception.

    try {
        return HumanService.getAllHumans();
    } catch (e) {
        if (e instanceof NotFoundHumanException) {
            next(notFound("Not found any human."));
        }
    }

### API Documentation
For API documentation we used Swagger, this is simplify API development for users, teams, and enterprises with the Swagger open source and professional toolset.

Use the `/src/api/v1/docs/` path to write your new API documentation

### Write Test
We write Test after making new action to the code.

Use the `/test/v1/controllers/` path to write your new Test