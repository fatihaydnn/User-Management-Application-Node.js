const CityRepository = require("../repository/cityRepository");
const cityRepository = new CityRepository();

class CityService {
    async getCitys() {
        return await cityRepository.getCitys();
    }

    
}

module.exports = CityService;
