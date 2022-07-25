const LogRepository = require("../repository/logRepository");
const logRepository = new LogRepository();

class LogService {
    async createLog(log) {
        return await logRepository.createLog(log);
    }

    async getLogs() {
        return await logRepository.getLogs();
    }

    
}

module.exports = LogService;
