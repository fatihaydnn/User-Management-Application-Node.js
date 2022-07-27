const District = require("../model/district");


class DistrictRepository {
        async getDistricts(cityCode){
        let result;
        try{
            result = await District.find({city_key : cityCode}).select('districtName districtCode');
            return {
                success: true,
                data: result
            };
        }catch(error){
            return {
                success: false,
                errorMessage: error,
            }
        }
    }
}

module.exports = DistrictRepository;
