const { json } = require("body-parser");

    class ApiFeatures {
        constructor(query, queryStr){
            this.query = query;
            this.queryStr = queryStr;
        }
    
        search(){
           let keyword =  this.queryStr.keyword ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: 'i'
                }
           }: {};
    
           this.query.find({...keyword})
           return this;
        }
        filter(){
            const queryStrcopy={...this.queryStr}
           //before
         
             //after
             const removefields=["keyword","limit","page"];
             removefields.forEach(field=> delete queryStrcopy[field])
       
             let queryStr = JSON.stringify(queryStrcopy);
             queryStr =  queryStr.replace(/\b(gt|gte|lt|lte)/g, match => `$${match}`)
     
             this.query.find(JSON.parse(queryStr));
console.log(queryStr)
return this

        }

        paginate(resperpage){
let currentpage=Number(this.queryStr.page) || 1;
let skip=resperpage*(currentpage-1);
this.query.limit(resperpage).skip(skip)
return this;

        }
}

module.exports=ApiFeatures;