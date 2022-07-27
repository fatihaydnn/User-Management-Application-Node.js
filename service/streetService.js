const StreetRepository = require("../repository/streetRepository");
const streetRepository = new StreetRepository();

class StreetService {
    async getStreets(districtCode) {
        return await streetRepository.getStreets(districtCode);
    }

}

module.exports = StreetService;
