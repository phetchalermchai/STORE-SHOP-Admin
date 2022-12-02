const express = require("express")
const path = require("path")
const cookieparser = require("cookie-parser")
const session = require("express-session")
const router = require("./router/router")
const app = express()


app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
app.use(express.urlencoded({extended:false}))
app.use(cookieparser())
app.use(session({
    secret:"mysession",
    resave:false,
    saveUninitialized:false
}))
app.use(router)
app.use(express.static(path.join(__dirname,"public")))


app.listen(3000,()=>{
    console.log("Run Server Port 3000");
})











































// const http = require("http")
// const fs =require("fs")
// const url = require("url")

// const index = fs.readFileSync(__dirname+"/templates/index.html","utf-8")
// const product1 = fs.readFileSync(__dirname+"/templates/product1.html","utf-8")
// const product2 = fs.readFileSync(__dirname+"/templates/product2.html","utf-8")
// const product3 = fs.readFileSync(__dirname+"/templates/product3.html","utf-8")


// const server = http.createServer((req, res) => {

//     const {pathname,query} =url.parse(req.url,true)
//     console.log(req.url)

//     if (pathname === "/" || pathname === "/home") {
//         res.end(index)
//     }else if(pathname==="/product"){
//         if(query.id==="1"){
//             res.end(product1)
//         }else if(query.id==="2"){
//             res.end(product2)
//         }else if(query.id==="3"){
//             res.end(product3)
//         }else{
//             res.writeHead(404)
//             res.end("404 Not Found")
//         }
        
//     }else{
//         res.writeHead(404)
//         res.end("404 Not Found")
//     }
// })

// server.listen(3000, "localhost", () => {
//     console.log("start server port 3000")
// })