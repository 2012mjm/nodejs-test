// Object schema description language and validator for JavaScript objects
import Joi from "joi";

import validate from "../../../utils/validate";

const SCHEMA = {
  name: Joi.string()
    .label("Name")
    .max(90)
    .required()
};

/**
 * Validate find human request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
export const humanParamsValidator = (req, res, next) => {
  return validate(req.params, SCHEMA)
    .then(() => next())
    .catch(err => next(err));
};

