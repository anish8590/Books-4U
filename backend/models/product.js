const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
//pulling out an id and refer it to current Schema
//Product --> associated to Category

const productSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
      },
      description: {
        type: String,
        trim: true,
        required: true,
        maxlength: 2000
      },
      price: {
        type: Number,
        required: true,
        maxlength: 32,
        trim: true
      },
      category: {
        type: ObjectId,
        ref: "Category",
        //export name
        required: true
      },
      stock: {
        type: Number
      },
      sold: {
        type: Number,
        default: 0
      },
      photo: {
        data: Buffer,
        contentType: String
        //AWS S3 bucket pulls address not store in DB
      }
    },
    { timestamps: true }
    //instead ofcreated at & updated at method
);

    
module.exports = mongoose.model("Product", productSchema);