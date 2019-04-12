/**
 * Add the result variable to get more information from the error exception.
 */
class CustomException extends Error {
  /**
   * Add the value of the message to the result variable.
   * 
   * @param {(string|Object)} message
   */
  constructor(message) {
    super(message);
    this.result = message;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Not found human exception.
 */
class NotFoundHumanException extends CustomException {}

/**
 * Not found pet exception.
 */
class NotFoundPetException extends CustomException {}

/**
 * Not found pet for human's age is more than 30 exception.
 */
class NotFoundPetForHumanAgeMoreThanThirtyException extends CustomException {}

module.exports = {
  NotFoundHumanException,
  NotFoundPetException,
  NotFoundPetForHumanAgeMoreThanThirtyException
};
