const Address = require("../model/address");


class AddressRepository {
    async createAddress(address) {
        let result;
        try {
            let newAddress = new Address({
                ...address,
                createdAt: Date.now()
            });

            result = await newAddress.save();
            return {
                success: result !== null ? true : false,
                data: result
            };
        } catch (error) {
            console.log(error)
            return {
                success: false,
                errorMessage: error,
            };
        }
    };

    
    async getAddresss(){
        let result;
        try{
            result = await Address.find({isDeleted : false}).populate('user').populate('city','cityName cityCode').populate('district','districtName districtCode').populate('street', 'streetName streetCode').select('-user.password');
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

    // async update(id, entity) {
    //     try {
    //         let result = await Address.findByIdAndUpdate(id, { $set: entity }, { new: true })
    //             .select("-user -isDeleted")
    //             .populate("city", "cityName cityCode")
    //             .populate("district", "districtName districtCode")
    //             .populate("street", "streetName streetCode")
    //         return {
    //             success: result !== null ? true : false,
    //             data: result
    //         };
    //     } catch (error) {
    //         return {
    //             success: false,
    //             errorMessage: error,
    //         };
    //     }
    // };

}

module.exports = AddressRepository;
