const AddressRepository = require("../repository/addressRepository");
const addressRepository = new AddressRepository();

class AddressService {
    async createAddress(address) {
        return await addressRepository.createAddress(address);
    }

    async getAddresss() {
        return await addressRepository.getAddresss();
    }

    // async update(id, entity) {
    //     return await addressRepository.update(id, entity)
    // }

    
}

module.exports = AddressService;
