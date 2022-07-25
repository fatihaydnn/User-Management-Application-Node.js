const {
    SECRET
} = require("../config/index");

const jwt = require("jsonwebtoken");
// const LogService = require("../service/userService");
// const userService = new LogService();

const LogService = require("../service/logService");
const logService = new LogService();

const ResponseSerializer = require("../serializers/responseSerializers");
const serializer = new ResponseSerializer();

class LogController {

    async getLogs(req, res, next) {
        let result = await logService.getLogs();
        res.send(result);

    }

}

module.exports = LogController;
