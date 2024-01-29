
//get ful async function and resolve and return promise
module.exports=func=>(req,res,next)=>{

    return Promise.resolve(func(req,res,next)).catch(next)
}