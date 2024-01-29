const express=require("express")
const app=express()
const products=require("./route/productRoute")
const auth=require("./route/auth")
const errorMiddleware=require("./middlewares/error")

app.use(express.json());
app.use("/api/v1/",products)
app.use("/api/v1/",auth)
app.use(errorMiddleware)


module.exports=app