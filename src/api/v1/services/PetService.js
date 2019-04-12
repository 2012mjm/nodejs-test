import _filter from "lodash/filter";

import constants from "../../../utils/constants";
import {
  NotFoundPetException,
  NotFoundPetForHumanAgeMoreThanThirtyException
} from "../../../utils/exceptions";

import { getHuman } from "./HumanService";

/**
 * Get all pets.
 *
 * @returns {Object[]}
 */
export const getAllPets = () => {
  const { pets } = constants;

  if (pets.length === 0) throw new NotFoundPetException();

  return pets;
};

/**
 * Get a pet by Id of the human.
 *
 * @param   {string} humanName
 * @returns {Object}
 */
export const getPetsByHumanName = async humanName => {
  const { pets } = constants;

  // Get the human by Name of the human.
  const human = await getHuman(humanName);

  // Given the logic of the system, return zero result if the human's age is more than 30
  if (human.age > 30)
    throw new NotFoundPetForHumanAgeMoreThanThirtyException();

  // Find pets for the human by Id of the human.
  const humanPets = _filter(pets, { human_id: human.id });

  if (humanPets === undefined) throw new NotFoundPetException();

  return humanPets;
};
