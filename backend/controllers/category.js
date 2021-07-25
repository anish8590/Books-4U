const { request } = require("express");
const Category = require("../models/category.js");

exports.getCategoryById =(req,res,next,id)=>{
    Category.findById(id).exec((err,cate)=>{
        if(err){
            return res.status(400).json({
                error:"Category not found"
            });
        }
        req.category= cate;
        next();
    });
};

exports.createCategory= (req,res)=>{
    const category = new Category(req.body);

    category.save((err,categ) => {
        if(err){
            return res.status(400).json({
                error:"Not able to save catgory"
            });
        }
        res.json({categ});
    });
};

exports.getCategory = (req,res)=>{
    return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
      if (err) {
        return res.status(400).json({
          error: "NO categories found"
        });
      }
      res.json(categories);
    });
  };

exports.updateCategory= (req,res)=>{
    const category = req.category;//params
    category.name=req.body.name;//body

    category.save((err,updatedCateg) => {
        if(err){
            return res.status(400).json({
                error:"Not able to update catgory"
            });
        }
        res.json(updatedCateg);
    });
};

exports.removeCategory= (req,res)=>{
    const category = req.category;//params

    category.remove((err,categ) => {
        if(err){
            return res.status(400).json({
                error:"Not able to remove catgory"
            });
        }
        res.json({
            message: "deleted category sucessfully"
        });
    });
};