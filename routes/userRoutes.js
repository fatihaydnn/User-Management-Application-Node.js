const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const ValidationController = require("../controller/validationController");
const validationController = new ValidationController();

const UserController = require("../controller/userController");
const userController = new UserController();

const LogController = require("../controller/logController");
const logController = new LogController();

const AuthorizationController = require("../controller/authorizationController");
const res = require("express/lib/response");
const user = require("../model/user");
const log = require("../model/log");
const authorizationController = new AuthorizationController();

router.post(
    "/register",
    check(["user"]).exists().isObject(),
    check(["user.name", "user.surname", "user.email", "user.password"]).exists(),
    check(["user.email"]).notEmpty().isEmail(),
    check(["user.name"]).notEmpty().isString(),
    check(["user.surname"]).notEmpty().isString(),
    check(["user.password"]).notEmpty().isString(),
    validationController.validateRequest,
    userController.registerUser
);

router.post(
    "/login",
    check(["email", "password"]).exists().notEmpty(),
    check(["email"]).isEmail(),
    validationController.validateRequest,
    userController.login
);

router.get(
    "/all",
    validationController.validateRequest,
    authorizationController.validateToken,
    userController.getUsers
);

router.post(
    "/detail",
    validationController.validateRequest,
    authorizationController.validateToken,
    userController.getUserDetail
);

router.get(
    "/user",
    validationController.validateRequest,
    authorizationController.validateToken,
    userController.getUsers
);

router.get(
    "/log",
    validationController.validateRequest,
    //authorizationController.validateToken,
    logController.getLogs
);

router.post(
    "/delete",
    check(["id"]).exists().notEmpty().isMongoId(),
    validationController.validateRequest,
    authorizationController.validateToken,
    userController.deleteById
);

module.exports = router;

