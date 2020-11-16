const { Router } = require("express");
const { check } = require("express-validator");
const { registerHandler, loginHandler } = require("./handlers");

const router = Router();

router.post(
  "/register",
  [
    check("email", "Incorrect email").isEmail(),
    check("password", "A minimal password length is 6 symbols").isLength({
      min: 6,
    }),
  ],
  registerHandler
);

router.post(
  "/login", 
  [
    check("email", "Please, enter a correct email").normalizeEmail().isEmail(),
    check("password", "Please, enter a password").exists()
  ], 
  loginHandler
);

module.exports = router;
