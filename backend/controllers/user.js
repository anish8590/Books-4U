const User = require("../models/user.js");
const Order =require("../models/order.js")
//id --> from url
//params
exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec( (err,user) => {
        if(err || !user){
            return res.status(400).json({
                error: "NO user was found in DB"
            });
        }

        req.profile = user; //all user info
        next();
    });
};

//normal method
exports.getUser = (req, res) => {
    //TODO:get back for password
    req.profile.salt= undefined;
    req.profile.encry_password= undefined;
    req.profile.createdAt= undefined;
    req.profile.updatedAt= undefined;
    return res.json(req.profile);
};

exports.updateUser = (req,res) => {
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set : req.body},
        {new : true, useFindAndModify: false},
        (err,user) => {
            if(err){
                return res.status(400).json({
                    error:"You are not authorized to update this"
                });
            }
            user.salt= undefined;
            user.encry_password= undefined;
            res.json(user);
        }
    )
};

exports.userPurchaseList = (req,res) => {
    Order.find({user: request.profile._id})
    //as other objects used in one object use populate
    .populate("user", "_id name")
    .exec((err,orders)=> {
        if(err){
            return res.status(400).json({
                error:"No orders so far"
            });
        }
        return res.json(orders);
    });
};

exports.pushOrderInPurchaseList =(req,res,next) => {
    let purchases = [];
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantitity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        });
    });

    //store purchases in db
    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$push: {purchases,purchases} },
        //replace original with local
        {new: true},
        (err, purchases) => {
            if(err){
                return res.status(400).json({
                    error:"unable to save purchase list"
                });
            }
            next();
        }
    );
};

exports.getAllUsers = (req, res) => {
    User.find().exec((err,users)=>{
        if(err || !users){
            return res.status(400).json({
                error: "NO users was found in DB"
            });
        }

        res.json(users);
    });
};