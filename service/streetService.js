const StreetRepository = require("../repository/streetRepository");
const streetRepository = new StreetRepository();

class StreetService {
    async getStreets(districtCode) {
        return await streetRepository.getStreets(districtCode);
    }

    async getStreetByCode(streetCode) {
        return await streetRepository.getStreetByCode(streetCode);
    }
}

module.exports = StreetService;
