const Product=require("../model/productsModel")
const Products=require("../data/products.json")
const dotenv=require("dotenv")
const connectDatabase = require("../config/database")
const path=require("path")

connectDatabase()
dotenv.config({path:path.join(__dirname,"config","config.env")})

const seederProduct=async(req,res,next)=>{
    try{
        await Product.deleteMany() 
        console.log("products deleted")    
await Product.insertMany(Products)
console.log("all products added") 
    }
    catch(err){
        console.log(err.message)
    }
    process.exit()
}
seederProduct()