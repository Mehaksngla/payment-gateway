const errors = require("../../../lib/error");
const User = require("../../userModule/models/user");
const {generateToken} = require("../../../lib/authCheck");
const VerificationController = require("../../verificationModule/controller/verificationController")
const Utility = require("../../../utils/utility");
const verificationService = require("../../../services/verificationServices")
const constants = require("../../../constants/constants")

const getProducts = async(req,res)=>{
    let products = await Product.find();
    res.send('products..',products.data)
}

// module.exports = {router.get('/',getProducts)
// }
class UserController{
    static async createUser(userData){
        const query = {
            "$or": [
                { "email": userData.email},
                { "userName": userData.userName }
                ]
            };
        //Checks if user already exists
        let user = await User.findOne(query);
    
        if (user && (user.email.toLowerCase() === userData.email.toLowerCase())) {
            throw errors.ALREADY_REGISTERED("User with same email already exists.");
        }
        if (user && (user.userName.toLowerCase() === userData.userName.toLowerCase())) {
            throw errors.USERNAME_ALREADY_REGISTERED("User with same userName already exists.");
        }
        return User.create(userData);
    }
    
    static async loginUser(email, password){
        
        const user = await User.findOne({ email }).select("password");
        if (!user) throw errors.INVALID_LOGIN("Invalid credentials");
    
        //check password
        const isMatched = await user.matchPassword(password);
        if (!isMatched) {
            throw errors.INVALID_LOGIN("Invalid credentials");
        }
        
        const userId = user.id;
        const expiresIn = process.env.tokenExpireTime
    
    
        console.log(process.env.tokenExpireTime);
        
        return generateToken(
            userId,
            expiresIn,
            )
        }
    
    static async forgotPassword(email){
        const user = await User.findOne({ email: email });
        if (_.isNil(user)) {
            throw errors.USER_NOT_FOUND("User with given email id not found.");
        }
        const verificationDoc = await verificationService.forgotPassword(email);
        
        const substitutions = {
            link: "http://localhost:8000" + "#/resetpassword?" + "key=" + verificationDoc.code
        };
        await emailService.sendResetLink(constants.templateIds.forgotPassword, user.email, substitutions);
    
           
        return verificationDoc.code;
    }
}




module.exports = UserController;