const mongoose=require("mongoose")
const validator=require("validator")
const  bcrypt=require("bcrypt")


const userSchema=new mongoose.Schema({

name:{
    type:String,
    required:[true,"please enter name"]
},
email:{
    type:String,
    unique:true,
    required:[true,"please enter email"],
    validate:[validator.isEmail,"please enter vlid email address"]
},
password:{
    type:String,
    required:[true,"please enter password"],
maxlength:[6,"password cannot exceed 6 characters"]
},
avatar:{
    type:String,
    required:true
},
role:{
    type:String,
    default:"user"
},
resetPasswordToken:String,
resetPasswordTokenExpire:Date,
createdAt:{
    type:Date,
    default:Date.now
}
})

userSchema.pre("save",async function(next){
    this.password= await bcrypt.hash(this.password,10)
})

let userModel=mongoose.model("user",userSchema)

module.exports=userModel;