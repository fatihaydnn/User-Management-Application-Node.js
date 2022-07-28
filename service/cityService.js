const CityRepository = require("../repository/cityRepository");
const cityRepository = new CityRepository();

class CityService {
    async getCitys() {
        return await cityRepository.getCitys();
    }

    async getCityByCode(cityCode) {
        return await cityRepository.getCityByCode(cityCode);
    }
    
}

module.exports = CityService;
