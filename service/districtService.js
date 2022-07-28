const DistrictRepository = require("../repository/districtRepository");
const districtRepository = new DistrictRepository();

class DistrictService {
    async getDistricts(cityCode) {
        return await districtRepository.getDistricts(cityCode);
    }

    async getDistrictByCode(districtCode) {
        return await districtRepository.getDistrictByCode(districtCode);
    }
}

module.exports = DistrictService;
