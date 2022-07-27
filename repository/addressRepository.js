const Address = require("../model/address");


class AddressRepository {
    async createAddress(address) {
        let result;
        try {
            let newAddress = new Address({
                ...address,
                createdAt: Date.now().toUTCString()
            });

            result = await newAddress.save();
            return {
                success: result !== null ? true : false,
                data: result
            };
        } catch (error) {
            return {
                success: false,
                errorMessage: error,
            };
        }
    };

    
    async getAddresss(){
        let result;
        try{
            result = await Address.find({isDeleted : false}).populate('user').select('-user.password');
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

module.exports = AddressRepository;
