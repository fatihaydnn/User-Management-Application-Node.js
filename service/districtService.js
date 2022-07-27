const DistrictRepository = require("../repository/districtRepository");
const districtRepository = new DistrictRepository();

class DistrictService {
    async getDistricts(cityCode) {
        return await districtRepository.getDistricts(cityCode);
    }

}

module.exports = DistrictService;
