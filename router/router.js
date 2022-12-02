const express = require("express")
const multer = require("multer")
//เรียกใช้งานโมเดล
const Product = require("../models/products")

//อัพโหลดไฟล์
const storage = multer.diskStorage({
    destination:function(req,file,cb){   
        cb(null,"./public/images/products") //ตำแหน่งจัดเก็บไฟล์
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+".jpg") //เปลี่ยนชื่อไฟล์
    }
})
//เริ่มต้นอัพโหลด
const upload = multer({
    storage:storage
})
    

const router = express.Router()

router.get("/",(req,res)=>{
    Product.find().exec((err,doc)=>{
        res.render("index.ejs",{product:doc})
    })
    
})


router.get("/add-form",(req,res)=>{
    if(req.session.login){
        res.render("form.ejs")
    } else {
        res.render("admin.ejs")
    }
})



router.get("/manage",(req,res)=>{
    if(req.session.login){
        Product.find().exec((err,doc)=>{
            res.render("manage.ejs",{product:doc})
        })
    } else{
        res.render("admin.ejs")
    }
    
})

router.get("/logout",(req,res)=>{
    req.session.destroy((err)=>{
        res.redirect("/manage")
    })
})  
    
    //หน้าสินค้า EJS ระบุโดยใช้ ID database
router.get("/:id",(req,res)=>{
    const product_id = req.params.id
    // console.log(product_id);
    Product.findOne({_id:product_id}).exec((err,doc)=>{
        res.render("product.ejs",{products:doc})
    })
})

   
router.get("/delete/:id",(req,res)=>{
     Product.findByIdAndDelete(req.params.id,{
         usefindandmodify:false
     }).exec(err=>{
         if(err) console.log(err);
         res.redirect("/manage")
     })
}) 
 


router.post("/insert",upload.single("image"),(req,res)=>{
    let data = new Product({
        name:req.body.name,
        price:req.body.price,
        image:req.file.filename,
        description:req.body.description
    })
   Product.saveproduct(data,(err)=>{
       if(err) console.log(err);
       res.redirect("/")
   })
})

//แก้ไขข้อมูล 
router.post("/edit",(req,res)=>{
    const edit_id = req.body.edit_id
    Product.findOne({_id:edit_id}).exec((err,doc)=>{
        res.render("edit.ejs",{product:doc})
    })
})

//อัพเดท
router.post("/update",(req,res)=>{
    const update_id = req.body.update_id
    let data = {
        name:req.body.name,
        price:req.body.price,
        description:req.body.description
    }
   Product.findByIdAndUpdate(update_id,data,{usefindandmodify:false}).exec((err,doc)=>{
       res.redirect("/manage")
   })
})

router.post("/login",(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    const timeExpire = 10000 //10วินาที
    if(username==="admin" && password === "123"){
        // สร้าง cookie 
        req.session.username = username
        req.session.password = password
        req.session.login = true
        req.session.cookie.maxAge = timeExpire
        res.redirect("/manage")
    } else {
        res.render("404.ejs")
    }
})


module.exports =router