const mongoose=require("mongoose");






const connectDatabase=async()=>{

try{
const res=await mongoose.connect("mongodb://127.0.0.1:27017/amazon",{
    useNewUrlParser:true,
    useunifiedTopology:true
})
console.log(`mongoDb is connected to the host ${res.connection.host}`) 
}
catch(err){
    console.log(err)
}

}

module.exports=connectDatabase