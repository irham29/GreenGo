const express = require("express");
const router = express.Router();

const LoginRegisController = require("../app/controllers/LoginRegisController")

router.get("/login", LoginRegisController.login);
router.post("/loginProcess", LoginRegisController.loginProcess);
router.get("/logout", LoginRegisController.logout);

router.get('/registration', LoginRegisController.registration);
router.post("/registrationProcess", LoginRegisController.registrationProcess);


module.exports = router;