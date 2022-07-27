const AddressRepository = require("../repository/addressRepository");
const addressRepository = new AddressRepository();

class AddressService {
    async createAddress(address) {
        return await addressRepository.createAddress(address);
    }

    async getAddresss() {
        return await addressRepository.getAddresss();
    }

    
}

module.exports = AddressService;
