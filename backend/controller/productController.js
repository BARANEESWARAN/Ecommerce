const  Product  = require("../model/productsModel");
const ErrorHandler = require("../utils/errohandler");
const mongoose=require("mongoose")
const CatchAsyncEror=require("../middlewares/CatchAsyncError");
const ApiFeatures = require("../utils/ApiFeatures");
exports.getProducts =CatchAsyncEror( async (req, res, next) => {
 const resperpage=2;
       
  const apiFeatures=  new ApiFeatures(Product.find(), req.query).search().filter().paginate(resperpage)
    const products = await apiFeatures.query;
   
      res.status(200).json({
        success: true,
        message: "This route shows all the products in the database",
        count: products.length,
        products
      });
    
  })
  

// <-------create Product -api/v1/product/new---------->


exports.newProduct =CatchAsyncEror( async (req,res,next) => {
    
        
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product
        });
    
  
    
})

// <-------get single Product -api/v1/product/:id---------->


exports.getSingleProduct=async(req,res,next)=>{
 
    try {
        const product = await Product.findById(req.params.id);
      
        if (product) {
          return res.status(200).json({
            success: true,
            product
          });
        } else {
          return res.status(404).json({
            success: false,
            message: "Product not found"
          });
        }
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }
      

   
}
// <-------Update single Product -api/v1/product/:id---------->


exports.updateProduct = async (req, res, next) => {
    try {
      let product = await Product.findById(req.params.id);
  
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Data not found"
        });
      }
  
      // Use the findByIdAndUpdate method to update the product
      product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
  
      res.status(200).json({
        success: true,
        product
      });
    } catch (error) {
      console.error(error);
  
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  };
  









// <-------Delete single Product -api/v1/product/:id---------->




exports.deleteProduct = async (req, res, next) => {
  try {
    const productId =new  mongoose.Types.ObjectId(req.params.id);
    const product = await Product.findById(productId);

    
    if(product){
        await Product.deleteOne({ _id: req.params.id });

        res.status(200).json({
          success: true,
          message: "Product deleted successfully"
        });
    }
   else {
        return next(new ErrorHandler("Product not found", 404))
      }

  
  } catch (error) {
    next(error); // Pass the error to the Express error handling middleware
  }
};

