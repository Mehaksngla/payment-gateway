const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const hashPass = function(value) {
    return bcrypt.hashSync(value);
};

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required : true,
        trim : true
    },
    email:{
        type:String,
        required : true,
        lowercase:true,
        trim : true,
        unique:true
    },
    userName:{
        type:String,
        required : true,
        lowercase:true,
        trim : true,
        unique:true
    },
    password:{
        type:String,
        required : true,
        select : false,
        set : hashPass

    },
    resetLink : {
        data : String,
        default : ''
    }
})

userSchema.methods.matchPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};


const User = module.exports=mongoose.model('User',userSchema)