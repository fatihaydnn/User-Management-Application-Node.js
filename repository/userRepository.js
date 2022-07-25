const User = require("../model/user");

const jwt = require("jsonwebtoken");

/**Serializers functions */
const ResponseSerializer = require("../serializers/responseSerializers");
const serializer = new ResponseSerializer();

/**encrypt and hash password */
const Utils = require("../utils/Auth");
const utils = new Utils();

/**secret key  */
const { SECRET } = require("../config/index");
const res = require("express/lib/response");
class UserRepository {
    async register(user) {
        let result;
        try {
            let newUser = new User({
                ...user,
                createdAt: Date.now(),
                password: await utils.hashedPassword(user.password)
            });

            result = await newUser.save();
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

    async getProfileById(id) {
        let result;
        try {
            result = await User.findById(id)
            if (!result) {
                return {
                    success: false,
                    errorMessage: "kullanıcı bulunamadı",
                };
            }
        } catch (error) {
            return {
                success: false,
                errorMessage: error,
            };
        }
        return {
            success: true,
            data: result
        };
    };

    async getUsers(){
        let result;
        try{
            result = await User.find({isDeleted : false}).select("name surname email");
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

    async deleteById(id, entity){
        try{
            let result = await User.findByIdAndUpdate(id, { $set: entity }, { new: true });
            return{
                success: true,
                data: result
            }
        }catch(error){
            console.log(error)
            return {
                success: false,
                errorMessage: error,
            }
        }
    }

    async getProfileByEmail(email) {
        let result;
        try {
            result = await User.findOne({
                email: email
            });

        } catch (error) {
            console.log(error)
            return {
                success: false,
                errorMessage: error,
            };
        }
        return {
            success: true,
            data: result
        };
    };

    

    async login(email, password) {
        let result, user;
        try {
            user = await User.findOne({
                email: email
            });
            if (!user) {
                return {
                    errorMessage: "E-posta veya şifre hatalı!",
                    success: false
                };
            }

            let isMatchPassword = await utils.encryptPassword(password, user.password);

            if (isMatchPassword) {
                let token = jwt.sign(
                    {
                        userId: user._id,
                        email: user.email,
                        name: user.name,
                        surname: user.surname
                    },
                    SECRET,
                    {
                        expiresIn: "365 days"
                    }
                );

                result = serializer.tokenResponseSerializers(user, token);
                    
                return {
                    success: true,
                    data: result,
                };
            } else {
                return {
                    errorMessage: "E-mail veya şifre hatalı!",
                    success: false,
                };
            }
        } catch (error) {
            console.log(error)
            return {
                success: false,
                errorMessage: error,
            };
        }

    };
}

module.exports = UserRepository;
