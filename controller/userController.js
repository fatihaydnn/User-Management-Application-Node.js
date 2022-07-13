const {
    SECRET
} = require("../config/index");

const jwt = require("jsonwebtoken");
const UserService = require("../service/userService");
const userService = new UserService();

const ResponseSerializer = require("../serializers/responseSerializers");
const serializer = new ResponseSerializer();

class UserController {

    async registerUser(req, res, next) {

        const { user } = req.body;
        var checkEmail = await userService.getProfileByEmail(user.email);

        if (checkEmail.data !== null) {
            return res.send({
                errorMessage: "Girdiğiniz eposta başka bir hesap tarafından kullanılmaktadır. Lütfen başka bir eposta adresi giriniz",
                field: "email",
                success: false
            });
        }

        const result = await userService.register(user);
        if (result.success) {
            let token = jwt.sign(
                {
                    userId: result.data.id,
                    name: result.data.name,
                    surname: result.data.surname,
                    email: result.data.email,
                },
                SECRET,
                {
                    expiresIn: '365 days',
                }
            );


            let tokenResult = serializer.tokenResponseSerializers(result.data, token);

            res.send({
                success: true,
                data: tokenResult
            });
        } else {
            res.send({
                success: false,
                data: result
            })
        }



    };

    async getProfile(req, res, next) {
        const { userId } = req.body.user;
        let result = await userService.getProfileById(userId);
        result.data.token = req.headers.token;
        res.send(result);
    };

    // async getProfileByEmail(req,res,next){
    //     const { email} = req.body.email;
    //     let result = await emailService.getProfileByEmail(email);
    //     res.send(result);
    // }

    async login(req, res, next) {
        let { email, password } = req.body;
        let result = await userService.login(email, password);
        res.send(result);
    };

    async getUsers(req, res, next) {
        const { userId, email, name, surname } = req.body.user;
        console.log(userId, email, name, surname);
        let result = await userService.getUsers();
        res.send(result);
    }

    async getUserDetail(req, res, next) {
        const { userId } = req.body.user;
        let result = await userService.getProfileById(userId);
        res.send(result);
    }
}

module.exports = UserController;
