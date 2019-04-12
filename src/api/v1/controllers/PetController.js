import { notFound } from "boom";
import _map from "lodash/map";
import _partialRight from "lodash/partialRight";
import _pick from "lodash/pick";

import { getAllPets, getPetsByHumanName } from "../services/PetService";
import {
  NotFoundPetException,
  NotFoundHumanException,
  NotFoundPetForHumanAgeMoreThanThirtyException
} from "../../../utils/exceptions";

/**
 * Get all pets.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const fetchAll = (req, res, next) => {
  try {
    const pets = getAllPets();

    // Pick name and type attribute from Array of pets.
    return res.json(_map(pets, _partialRight(_pick, ["name", "type"])));
  } catch (e) {
    if (e instanceof NotFoundPetException) {
      next(notFound("Not found any pet."));
    }
  }
};

/**
 * Get a pets for the human by Name of the human.
 * Given the logic of the system, Return zero result if the human's age is more than 30.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const fetchByHumanName = async (req, res, next) => {
  const { name: humanName } = req.params;

  try {
    const pets = await getPetsByHumanName(humanName);

    // Pick name and type attribute from Array of pets.
    return res.json(_map(pets, _partialRight(_pick, ["name", "type"])));
  } catch (e) {
    if (e instanceof NotFoundPetException) {
      next(notFound("Not found pet for this human."));
    } else if (e instanceof NotFoundHumanException) {
      next(notFound("Not found human by this name."));
    } else if(e instanceof NotFoundPetForHumanAgeMoreThanThirtyException) {
      next(notFound("Not found pet for this human, because the human's age is more than 30"));
    }
  }
};
