import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{type:String,require:true},
    description:{type:String,require:true},
    category:{type:String,require:true},
    image:{type:String,require:true},
    price:{type:Object,require:true},
    date:{type:Number,require:true},
    sizes:{type:Array,require:true},
    popular:{type:Boolean},
})

const productModel = mongoose.model('product',productSchema);


export default productModel;