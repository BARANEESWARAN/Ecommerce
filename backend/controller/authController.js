
const CatchAsyncError = require("../middlewares/CatchAsyncError");

const User=require("../model/Usernodel")


exports.registerUser=CatchAsyncError(async(req,res,next)=>{

const{name,email,password,avatar}=req.body;



const user=await User.create({
    name,
    email,
    password,
    avatar
})
res.status(201).json({
    success:true,
    user
})



})