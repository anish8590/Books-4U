const express= require("express");
const router = express.Router();

const {getCategoryById, createCategory, getCategory, getAllCategory, updateCategory, removeCategory} = require("../controllers/category.js");
const {isAuthenticated, isSignedIn, isAdmin} = require("../controllers/authentication.js");
const {getUserById} = require("../controllers/user.js");

//params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//ROUTES --CRUD
//create
router.post("/category/create/:userId",isSignedIn, isAuthenticated, isAdmin, createCategory);
//read
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);
//update
router.put("/category/:categoryId/:userId",isSignedIn, isAuthenticated, isAdmin, updateCategory);
//delete
router.delete("/category/:categoryId/:userId",isSignedIn, isAuthenticated, isAdmin, removeCategory);

module.exports = router;  