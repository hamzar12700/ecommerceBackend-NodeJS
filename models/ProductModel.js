import mongoose from "mongoose";

let productSchema = new mongoose.Schema({
        name :{
            type : String,
            required : true
        },
        desc : {
            type : String,
            required : true
        },
        price : {
            type : Number,
            required : true
        },
        images : {
            type : Array,
            required : true
        },
        category : {
            type : String,
            required : true
        },
        subCategory : {
            type : String,
            required : true
        },
        sizes:{
            type : Array,
            required : true
        },
        bestSeller : {
            type : Boolean,

        },
        date:{
            type : Date,
        }

})

const productModel = mongoose.model('product', productSchema)

export default productModel;