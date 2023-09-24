const express = require("express");
const router = express.Router();
const { responseBuilder } = require("../../utils/responseBuilder");
const { serverConstant, statusCodeConstant } = require("../../constants/");

const baseURL = serverConstant.BASE_API;
router.use(baseURL, require("./authentication"));
router.use(baseURL, require("./todo"));

router.get("/", (req, res) => {
  try {
    const generatedResponse = responseBuilder(serverConstant.SERVER_IS_RUNNING);
    // throw new Error("This is a test error.");
    return res.status(statusCodeConstant.SUCCESS).send(generatedResponse);
  } catch (error) {
    let generatedResponse = responseBuilder();
    return res.status(statusCodeConstant.ERROR).send(generatedResponse);
  }
});

router.use("*", (req, res) => {
  try {
    const generatedResponse = responseBuilder(serverConstant.INVALID_API_PATH);
    return res.status(statusCodeConstant.SUCCESS).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder();
    return res.status(statusCodeConstant.ERROR).send(generatedResponse);
  }
});

module.exports = router;
