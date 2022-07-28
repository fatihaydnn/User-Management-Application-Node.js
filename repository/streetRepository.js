const Street = require("../model/street");


class StreetRepository {
    async getStreets(districtCode) {
        let result;
        try {
            result = await Street.find({ district_key: districtCode }).select('streetName streetCode');
            return {
                success: true,
                data: result
            };
        } catch (error) {
            return {
                success: false,
                errorMessage: error,
            }
        }
    }

    async getStreetByCode(streetCode) {
        let result;
        try {
            result = await Street.findOne({ streetCode: streetCode }).select('streetName streetCode');
            return {
                success: true,
                data: result
            };
        } catch (error) {
            return {
                success: false,
                errorMessage: error,
            }
        }
    }
}

module.exports = StreetRepository;
