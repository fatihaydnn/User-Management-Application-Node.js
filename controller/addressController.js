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

    async createAddress(req, res, next) {
        const { address } = req.body;
        const cityData = await cityService.getCityByCode(address.city);
        const districtData = await districtService.getDistrictByCode(address.district);
        const streetData = await streetService.getStreetByCode(address.street);

        console.log(cityData, districtData, streetData)

        if (cityData.success && districtData.success && streetData.success) {
            address.city = cityData.data._id;
            address.district = districtData.data._id;
            address.street = streetData.data._id;

            console.log(address)
            const result = await addressService.createAddress(address);

            if (result.success) {
                res.send({
                    success: true,
                    data: result
                });
            } else {
                res.send({
                    success: false,
                    errorMessage: "Adress Kayıt Edilemedi."
                })
            }
        } else {
            res.send({
                success: false,
                errorMessage: "İl/İlçe/Sokak Bilgisi Çözümlenemedi"
            })
        }
    };

}

module.exports = AddressController;
