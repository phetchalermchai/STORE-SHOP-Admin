//ใช้งาน mongoose
const mongoose = require("mongoose")


//เชื่อมไปยัง mongoDB
const dbUrl ="mongodb://localhost:27017/productDB"
mongoose.connect(dbUrl,{
    usenewurlparser:true,
    useunifiedtopology:true
}).catch(err=>console.log(err))

//สร้าง schema
let productschema = mongoose.Schema({
    name:String,
    price:Number,
    image:String,
    description:String
})

//สร้าง model
let Product = mongoose.model("products",productschema)


// ส่งออก Model
module.exports=Product

//ออกแบบ บันทึกข้อมูล 
module.exports.saveproduct = function(model,data){
    model.save(data)
}