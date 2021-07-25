const express = require("express");
const router= express.Router();

const { getUserById, getUser ,updateUser ,userPurchaseList} = require("../controllers/user.js");
const { isSignedIn, isAuthenticated } = require("../controllers/authentication.js");

//if : in route --> interpret as user id
//automatically populate in req.profile object
//with user object(DB)
router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated ,getUser);
//router.get("/user", getAllUsers);

//update user info
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.get("/orders/user/:userId", isSignedIn, isAuthenticated, userPurchaseList);

module.exports=router;
