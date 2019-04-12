import { Router } from "express";

import { fetchAll } from "../controllers/PetController";

const router = Router();

// GET /v1/pets
router.get("/", fetchAll);

export default router;
