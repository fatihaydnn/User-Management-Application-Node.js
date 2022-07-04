const UserRepository = require("../repository/userRepository");
const userRepository = new UserRepository();

class UserService {
    async register(user) {
        return await userRepository.register(user);
    }

    async getProfileById(id) {
        return await userRepository.getProfileById(id);
    }

    async login(email, password) {
        return await userRepository.login(email, password);
    }

    async getProfileByEmail(email) {
        return await userRepository.getProfileByEmail(email);
    }

    async getUsers() {
        return await userRepository.getUsers();
    }
}

module.exports = UserService;
