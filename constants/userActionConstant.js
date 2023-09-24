const userActionConstant = {
  PLEASE_TRY_AGAIN_LATER: "Please try again later.",

  SIGN_UP_SUCCESS: "You are now signed up.",
  SIGN_UP_ERROR: "We are unable to sign you up.",

  SIGN_IN_SUCCESS: "You are now signed in.",
  SIGN_IN_ERROR: "We are unable to sign you in.",

  GET_TODO_SUCCESS: "Your todos were retrived successfully.",
  GET_TODO_ERROR: "We are unable to retrive your todos.",

  ADD_TODO_SUCCESS: "Your todo was added successfully.",
  ADD_TODO_ERROR: "We are unable to add your todo.",

  DELETE_TODO_SUCCESS: "Your todos were deleted successfully.",
  DELETE_TODO_ERROR: "We are unable to delete your todos.",

  SIGN_IN_AGAIN: "We are sorry, but we need you to sign in again.",
  INVALID_CREDENTIALS:
    "We are unable to validate your credentials. Please provide valid credentials.",
  EMAIL_ALREADY_EXISTS:
    "We already have an account with this email. Please sign in.",
  NO_TODOS_FOUND: "We are unable to retrive your todos. Please add some todos.",
  NO_EMAIL_FOUND: "We are unable to retrive your account. Please sign up.",

  PROVIDE_VALID_DATA: "Please provide valid data.",
  REDUNDANT_DATA:
    "Please do not provide redundant data. It hurts the server 😢.",

  GENERIC_ERROR: "Something went wrong.",
  VERIFY_DATA_ERROR: "We are unable to validate your data.",

  IS_REQUIRED: "is required.",
  IS_EMPTY: "is empty.",
  IS_INVALID: "is invalid.",
  SHOULD_HAVE: "should have",

  EMAIL: "Email",
  PASSWORD: "Password",
  TODO: "Todo",
  IS_COMPLETE: "Completion status",
};

module.exports = { userActionConstant };
