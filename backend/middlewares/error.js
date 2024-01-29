//errorHndler

const ErrorHandler = require("../utils/errohandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
let message=err.message;
let error=new Error(message)

//ValidationError -model name,age must number 
if(err.name=="ValidationError"){
message=Object.values(err.errors).map(values=>values.message)
error=new Error(message,400)


}

//if user give wrong id after url
if(err.name=="BSONError"){
message=`Resource not found : ${err.name}`
error=new Error(message,400)

}

    res.status(err.statusCode).json({
        success: false,
        message: error.message || "Internalserver error",
        stack: err.stack,
        err:err
    
      
      
    });
};