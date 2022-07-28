const express = require("express");
const router = express.Router();
const { check, query } = require("express-validator");

const ValidationController = require("../controller/validationController");
const validationController = new ValidationController();

const AddressController = require("../controller/addressController");
const addressController = new AddressController();

const AuthorizationController = require("../controller/authorizationController");
const authorizationController = new AuthorizationController();


router.get(
    "/getAllCities",
    validationController.validateRequest,
    addressController.getCities
);

router.get(
    "/getDistricts",
    query(["cityCode"]).exists().isString().isNumeric(),
    validationController.validateRequest,
    addressController.getDistricts
);

router.get(
    "/getStreets",
    query(["districtCode"]).exists().isString().isNumeric(),
    validationController.validateRequest,
    addressController.getStreets
);

router.post(
    "/all",
    validationController.validateRequest,
    //authorizationController.validateToken,
    addressController.createAddress
);


module.exports = router;

