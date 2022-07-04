var jwt = require('jsonwebtoken');
const { SECRET } = require("../config/index");


class AuthorizationController {
    async validateToken(req, res, next) {
        var token = req.headers.token.replace("Bearer ", "");
        try {
            var decoded = jwt.verify(token, SECRET);
            decoded.token = req.headers.token;
            req.body.user = decoded; // req.body e ekliyoruz sonraki adımlarda erişmek için
            next();
        } catch (err) {
            // err
            console.log(err)
            return res.status(400).json({
                success: false,
                type: "token",
                errorMessage: "Oturumunuz zaman aşımına uğramıştır. Lütfen tekrar giriş yapınız."
            });
        }
    }
}



module.exports = AuthorizationController;
