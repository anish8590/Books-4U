require('dotenv').config();
//create .env adds environment variables

const mongoose= require("mongoose");
const express= require("express");
const app= express();
const bodyParser =require("body-parser");
const cookieParser = require("cookie-parser");
const cors= require("cors");

//for routes api
const authRoutes = require("./routes/authentication.js");
const userRoutes = require("./routes/user.js");
const categoryRoutes = require("./routes/category.js");
const productRoutes = require("./routes/product.js");
const orderRoutes = require("./routes/order.js");
const paymentBRoutes = require("./routes/paymentBRoutes.js");

//mongoose.connect('mongodb://localhost:27017/tshirt', 
mongoose.connect(process.env.DATABASE, 
            { 
                useNewUrlParser: true ,
                useUnifiedTopology: true,
                useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED");
}).catch(()=>{
    console.log("DB CONNECTION FAILED");
});

 //myfun.run().then().catch();
 //then()-->success
 //catch()-->failure

 //middlewares
 //app.use(bodyParser.json())
 //body-parser middleware added to express.urllencoded
 app.use(express.urlencoded({extended: true})); 
 app.use(express.json());
 app.use(cookieParser());
 app.use(cors());

//ROUTES-design-api for all rooutes
//API Middleware - prefix too
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);  
app.use("/api",productRoutes);
app.use("/api",orderRoutes);
app.use("/api",paymentBRoutes);
  
const port= process.env.PORT || 7090;
//dotenv --> loads environment variable(hides port)

//STARTING SERVER
app.listen(port, () => {
    console.log(`app is running at ${port}`)
    //backtags
})  