const bcrypt = require("bcryptjs");

class Auth {
    async hashedPassword(password) {
        const hashed = await bcrypt.hash(password, 15);
        return hashed;
    };

    async encryptPassword(password, hashPassword) {
        const isMatch = await bcrypt.compare(password, hashPassword);
        return isMatch;
    };
}

module.exports = Auth;
