//authentication route methods in Controller


const User = require("../models/user.js");

const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

//validationResult only used
//ValidationResult is binded with request body
const {check, validationResult} = require("express-validator");

exports.signup = (req, res) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).json({
      error: errors.array()[0].msg
      //errors --> has location,msg & params
    });
  }

  //console.log("REQ BODY", req.body);
  const user = new User(req.body);

    //already present ? error & not sane : Saves no error;
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB"
      });
    }
    
    res.json({
        name: user.name,
        email: user.email,
        id: user._id
      });
  });
};

exports.signin = (req, res) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).json({
      error: errors.array()[0].msg
      //errors --> has location,msg & params
    });
  }

  //console.log("REQ BODY", req.body);
  const {email,password} = req.body;

  //find one entry in DB
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USER email does not exists"
      });
    }

    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match"
      });
    }

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });

};

exports.signout = (req, res) => {
  //res.send("user signout sucess")
  //cleare cookie
  res.clearCookie("token");
  res.json({
    message: "User signout successfull"
  });
};

//protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty : "auth" //holds _id while signin
});

//custom middleware

exports.isAuthenticated = (req,res, next)=> {
  let checker = req.profile && req.auth && req.profile._id==req.auth._id;
  //req.profile --> set from front end
  // req.auth --> set by isSignedIn Middleware

  if(!checker){
    return res.status(403).json({
      error:"ACCESS DENIED"
    });
  }
  next();
};

exports.isAdmin = (req,res, next)=> {
  if(req.profile.role==0){
    return res.status(403).json({
      error:"Not An ADMIN"
    });
  }
  next();
}

