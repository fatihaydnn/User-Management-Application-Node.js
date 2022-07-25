const Log = require("../model/log");


class LogRepository {
    async createLog(log) {
        let result;
        try {
            let newLog = new Log({
                ...log,
                createdAt: Date.now().toString()
            });

            result = await newLog.save();
            return {
                success: result !== null ? true : false,
                data: result
            };
        } catch (error) {
            return {
                success: false,
                errorMessage: error,
            };
        }
    };

    
    async getLogs(){
        let result;
        try{
            result = await Log.find({isDeleted : false}).populate('user').select('-user.password');
            return {
                success: true,
                data: result
            };
        }catch(error){
            return {
                success: false,
                errorMessage: error,
            }
        }
    }
}

module.exports = LogRepository;
