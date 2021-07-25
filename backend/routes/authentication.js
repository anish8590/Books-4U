var express = require("express");
var router = express.Router();
//instead of app.get, use routers

//validationREsult not used:: validator
const {check, validationResult} = require("express-validator");
const {signout,signin,signup, isSignedIn} = require("../controllers/authentication.js")

// [] --> express validator
router.post("/signup",[
    check("name", "name should be at least 3 char").isLength({min:3}),
    check("email", "email is required").isEmail(),
    check("password","password should be atleast 3 char").isLength({min:3})
],signup);

router.post("/signin",[
    check("email", "email is required").isEmail(),
    check("password","password required & atleast 3 char").isLength({min:3})
],signin);

router.get("/signout", signout);

router.get("/test",  isSignedIn, (req,res)=> {
    res.json(req.auth);
});


module.exports= router;
//throw router(all requests in this port thrown)