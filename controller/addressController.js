const AddressService = require("../service/addressService");
const addressService = new AddressService();

const CityService = require("../service/cityService");
const cityService = new CityService();

const StreetService = require("../service/streetService");
const streetService = new StreetService();

const DistrictyService = require("../service/districtService");
const districtService = new DistrictyService();

class AddressController {

    async getAddresss(req, res, next) {
        let result = await addressService.getAddresss();
        res.send(result);

    }

    async getCities(req, res, next) {
        let result = await cityService.getCitys();
        res.send(result);
    }

    async getDistricts(req, res, next) {
        const { cityCode } = req.query;
        let result = await districtService.getDistricts(cityCode);
        res.send(result);
    }

    async getStreets(req, res, next) {
        const { districtCode } = req.query;
        let result = await streetService.getStreets(districtCode);
        res.send(result);
    }
}

module.exports = AddressController;
