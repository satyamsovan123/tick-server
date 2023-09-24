const express = require("express");
const router = express.Router();
const { signUp } = require("../controllers/authentication/signUp");
const { signIn } = require("../controllers/authentication/signIn");
const {
  verifyAuthenticationDataRequest,
  verifyJWT,
} = require("../middlewares");
const {
  deleteAccount,
} = require("../controllers/authentication/deleteAccount");

router.post("/signup", verifyAuthenticationDataRequest, signUp);
router.post("/signin", verifyAuthenticationDataRequest, signIn);
router.delete("/account", verifyJWT, deleteAccount);

module.exports = router;
