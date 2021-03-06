// HTTP-friendly error objects
import Boom from "boom";

import _isEmpty from "lodash/isEmpty";

/**
 * Middleware to handle empty JSON body requests and other edge cases if any.
 *
 * @param  {Object}   request
 * @param  {Object}   response
 * @param  {Function} next
 */
const json = (request, response, next) => {
  const { body, method } = request;
  const disallowedHttpHeaders = ["PUT", "POST", "PATCH"];

  if (
    request.is("application/json") &&
    disallowedHttpHeaders.includes(method) &&
    _isEmpty(body)
  ) {
    throw Boom.badRequest("Empty JSON");
  }

  next();
};

export default json;
