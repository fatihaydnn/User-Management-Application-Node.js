const City = require("../model/city");


class CityRepository {
        async getCitys(){
        let result;
        try{
            result = await City.find().select('cityName cityCode');
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

    async getCityByCode(cityCode){
        let result;
        try{
            result = await City.findOne({ cityCode : cityCode}).select('cityName cityCode');
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

module.exports = CityRepository;
