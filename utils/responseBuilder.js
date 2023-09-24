const { serverConstant, userActionConstant } = require("../constants");

class ResponseBuilder {
  constructor(message, data) {
    this.data = data;
    this.message = message;
  }

  build() {
    let response = {};
    if (this.data !== null || this.data !== undefined) {
      response = {
        data: this.data,
        message: this.message,
      };
    } else {
      response = {
        message: this.message,
      };
    }
    return response;
  }
}

function responseBuilder(data, message) {
  return new ResponseBuilder(data, message).build();
}

module.exports = { responseBuilder };
