const app=require("./app")
const path=require("path")
const dotenv=require("dotenv")
const connectDatabase = require("./config/database")
const { Server } = require("tls")

connectDatabase()
dotenv.config({path:path.join(__dirname,"config","config.env")})


// Connecting Port
const server=app.listen(process.env.PORT,(err)=>{
    if(err) throw err
    else{
        console.log(`server running port ${process.env.PORT} in ${process.env.NODE_ENV}`)
    }
})

//Unhandl error - mogourl mistake
process.on("unhandledRejection",(error)=>{
console.log(`Error :${error.message}`)
console.log("sutting down server due to unhadle rejection")
server.close(()=>{
process.exit(1)
})
})


//uncaughtException error - not defined variable
process.on("uncaughtException",(error)=>{
console.log(`Error :${error.message}`)
console.log("sutting down server due to uncaught exception")
server.close(()=>{
process.exit(1)
})
})
