const express = require('express');
const doctorRouter = express.Router();
const { createDoctor, getAllDoctors, getDoctors, updateDoctor, deleteDoctor, getTokenDoctor, forgotPasswordDoctor, updatePasswordDoctor } = require("../controllers/Doctor");
const { tokenValidator } = require('../middlewares/tokenValidator');
const authorizationController = require('../middlewares/authoriseControler');

doctorRouter.use(express.json())

doctorRouter.get("/", tokenValidator, getAllDoctors);
doctorRouter.get("/find/:id", tokenValidator, getDoctors);
doctorRouter.post("/reg", createDoctor);
doctorRouter.post("/log", getTokenDoctor);
doctorRouter.patch("/:id", tokenValidator, authorizationController, updateDoctor);
doctorRouter.delete("/:id", tokenValidator, authorizationController, deleteDoctor);
doctorRouter.post("/forgot", forgotPasswordDoctor);
doctorRouter.post("/update", updatePasswordDoctor);

module.exports = { doctorRouter };
