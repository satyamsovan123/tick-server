const Joi = require("joi");
const { userActionConstant } = require("../../../constants");

class AuthenticationDataValidator {
  constructor(data = {}) {
    this.data = data;
    this.validatorSchema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: {} })
        .min(4)
        .required()
        .messages({
          "string.empty": `${userActionConstant.EMAIL} ${userActionConstant.IS_EMPTY} ${userActionConstant.PROVIDE_VALID_DATA}`,
          "string.email": `${userActionConstant.EMAIL} ${userActionConstant.IS_INVALID} ${userActionConstant.PROVIDE_VALID_DATA}`,
          "string.min": `${userActionConstant.EMAIL} ${userActionConstant.SHOULD_HAVE} at least {#limit} characters.  ${userActionConstant.PROVIDE_VALID_DATA}`,
          "any.required": `${userActionConstant.EMAIL} ${userActionConstant.IS_REQUIRED} ${userActionConstant.PROVIDE_VALID_DATA}`,
        }),
      password: Joi.string()
        .min(6)
        .required()
        .messages({
          "string.empty": `${userActionConstant.PASSWORD} ${userActionConstant.IS_EMPTY} ${userActionConstant.PROVIDE_VALID_DATA}`,
          "string.min": `${userActionConstant.PASSWORD} ${userActionConstant.SHOULD_HAVE} at least {#limit} characters. ${userActionConstant.PROVIDE_VALID_DATA}`,
          "any.required": `${userActionConstant.PASSWORD} ${userActionConstant.IS_REQUIRED} ${userActionConstant.PROVIDE_VALID_DATA}`,
        }),
    }).messages({
      "object.unknown": `${userActionConstant.REDUNDANT_DATA}`,
    });
    this.validationResult = this.validatorSchema.validateAsync(data);
  }

  async getValidationResult() {
    let dataIsInvalid = false;
    let feedbackMessage = "";
    try {
      await this.validationResult;
      return { dataIsInvalid, feedbackMessage };
    } catch (error) {
      dataIsInvalid = true;
      feedbackMessage = error?.message ?? userActionConstant.VERIFY_DATA_ERROR;
      return { dataIsInvalid, feedbackMessage };
    }
  }
}

module.exports = { AuthenticationDataValidator };
