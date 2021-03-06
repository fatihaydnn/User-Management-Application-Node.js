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
                    errorMessage: "Adress Kay??t Edilemedi."
                })
            }
        } else {
            res.send({
                success: false,
                errorMessage: "??l/??l??e/Sokak Bilgisi ????z??mlenemedi"
            })
        }
    };

    // async updateDistrict(req, res, next) {
    //     const { id, name, code, user, city } = req.body;
    //     var check = await districtService.checkExists(code, name.trim().turkishToUpper(), city, id)
    //     if (check.success) {
    //         return res.send({
    //             success: false,
    //             field: [
    //                 {
    //                     field: "codeDistrict",
    //                     errorMessage: "Girmi?? Oldu??unuz ??l??e Kodu Bulunmaktad??r"
    //                 },
    //                 {
    //                     field: "nameDistrict",
    //                     errorMessage: "Girmi?? Oldu??unuz ??l??e Ad?? Sistemde Bulunmaktad??r"
    //                 }
    //             ]
    //         })
    //     }
    //     let result = await districtService.update(id, {
    //         districtName: name.trim().turkishToUpper(),
    //         districtCode: code,
    //         updatedAt: new Date(),
    //         updatedBy: user.userId
    //     });

    //     let activityLog = await authorizedActivityLogService.insertLog({
    //         user: user.userId,
    //         type: "action",
    //         actionType: "update",
    //         description: name + " il??esi g??ncellendi."
    //     });

    //     res.send(result);
    // };

    // async updateStreet(req, res, next) {
    //     const { id, name, code, user, district } = req.body;
    //     var check = await streetService.checkExists(code, name.trim().turkishToUpper(), district, id);
    //     if (check.success) {
    //         return res.send({
    //             success: false,
    //             field: [
    //                 {
    //                     field: "codeStreet",
    //                     errorMessage: "Girmi?? Oldu??unuz Sokak Kodu Bulunmaktad??r"
    //                 },
    //                 {
    //                     field: "nameStreet",
    //                     errorMessage: "Girmi?? Oldu??unuz Sokak Ad?? Sistemde Bulunmaktad??r"
    //                 }
    //             ]
    //         })
    //     }
    //     let result = await streetService.update(id, {
    //         streetName: name.trim().turkishToUpper(),
    //         streetCode: code,
    //         updatedAt: new Date(),
    //         updatedBy: user.userId
    //     });

    //     let activityLog = await authorizedActivityLogService.insertLog({
    //         user: user.userId,
    //         type: "action",
    //         actionType: "update",
    //         description: name + " soka???? g??ncellendi."
    //     });

    //     res.send(result);
    // };


}

module.exports = AddressController;
