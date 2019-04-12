import { notFound } from "boom";
import _map from "lodash/map";
import _partialRight from "lodash/partialRight";
import _pick from "lodash/pick";

import { getAllHumans, getHuman } from "../services/HumanService";
import { NotFoundHumanException } from "../../../utils/exceptions";

/**
 * Get all humans.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const fetchAll = (req, res, next) => {
  try {
    const humans = getAllHumans();

    // Pick name and age attribute from Array of humans.
    return res.json(_map(humans, _partialRight(_pick, ["name", "age"])));
  } catch (e) {
    if (e instanceof NotFoundHumanException) {
      next(notFound("Not found any human."));
    }
  }
};

/**
 * Get a human by Name of the human.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const fetchByName = (req, res, next) => {
  const { name } = req.params;

  try {
    const human = getHuman(name);

    // Pick name and age attribute from Object of the human.
    return res.json(_pick(human, ["name", "age"]));
  } catch (e) {
    if (e instanceof NotFoundHumanException) {
      next(notFound("Not found human by this name."));
    }
  }
};
