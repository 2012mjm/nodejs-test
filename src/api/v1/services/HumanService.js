import _find from "lodash/find";

import constants from "../../../utils/constants";
import { NotFoundHumanException } from "../../../utils/exceptions";

/**
 * Get all humans.
 *
 * @returns {Object[]}
 */
export const getAllHumans = () => {
  const { humans } = constants;

  if (humans.length === 0) throw new NotFoundHumanException();

  return humans;
};

/**
 * Get a pet by Name of the human.
 *
 * @param   {string} name
 * @returns {Object}
 */
export const getHuman = name => {
  const { humans } = constants;

  // Find the human by Name of the human.
  const human = _find(
    humans,
    item => item.name.toLowerCase() === name.toLowerCase()
  );

  if (human === undefined) throw new NotFoundHumanException();

  return human;
};
