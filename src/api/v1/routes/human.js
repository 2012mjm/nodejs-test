import { Router } from "express";

import { fetchAll, fetchByName } from "../controllers/HumanController";
import { fetchByHumanName } from "../controllers/PetController";
import { humanParamsValidator } from "../validators/HumanValidator";

const router = Router();

// GET /v1/humans
router.get("/", fetchAll);

// GET /v1/humans/:name
router.get("/:name", humanParamsValidator, fetchByName);

// GET /v1/humans/:name/pets
router.get("/:name/pets", humanParamsValidator, fetchByHumanName);

export default router;
