import {v2 as cloudinary} from 'cloudinary'
import connectCloudinary from "../config/cloudinary.js";
import productModel from '../models/ProductModel.js';





// add product
const addproduct = async (req, res) => {
    try {
        const { name, description, category, prices, popular } = req.body;

        // image from multer
        const image = req.file;
        let imageurl;
        if (image) {
            const result = await cloudinary.uploader.upload(image.path,{resource_type:"image"});
            imageurl = result.secure_url;
        }
        else{
            imageurl = "https://via.placeholder.com/150";
        }
        const parsedPrices = JSON.parse(prices);

        const price = parsedPrices.reduce((acc, curr) => {
            acc[curr.size] = Number(curr.price);
            return acc;
        }, {});

        const sizes = parsedPrices.map(item => item.size);

        const productdata = {
            name,
            description,
            category,
            image: imageurl,
            price,
            sizes,
            popular: popular === "true",
            date: Date.now()
        };

        const product = new productModel(productdata);
        await product.save();

        res.json({
            success: true,
            message: "Food Added",
            product
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Server error" });
    }
};



// remove product
const removeproduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await productModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Food Removed",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// update product
const updateproduct = async (req, res) => {
  try {
    const { id, name, description, category, prices, popular } = req.body;

    let updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (category) updateData.category = category;
    if (popular !== undefined) updateData.popular = popular === "true";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      updateData.image = result.secure_url;
    }

    // ✅ Handle prices & sizes update robustly
    if (prices) {
      let parsedPrices;
      try {
        parsedPrices = JSON.parse(prices);
      } catch {
        return res.json({
          success: false,
          message: "Invalid prices format",
        });
      }

      let priceObj = {};

      if (Array.isArray(parsedPrices)) {
        // Frontend sends array of { size, price }
        parsedPrices.forEach(curr => {
          if (curr.size && curr.price !== undefined) {
            priceObj[curr.size] = Number(curr.price);
          }
        });
      } else if (typeof parsedPrices === "object") {
        // Frontend sends object { S: 100, M: 150 }
        for (let size in parsedPrices) {
          priceObj[size] = Number(parsedPrices[size]);
        }
      } else {
        return res.json({
          success: false,
          message: "Invalid prices format",
        });
      }

      updateData.price = priceObj;
      updateData.sizes = Object.keys(priceObj);
    }

    const updatedProduct = await productModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedProduct) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server error" });
  }
};




// list product

const listproduct = async (req,res)=>{
    try {
        const products=await productModel.find({});
        res.json({success:true,products})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Server error" });
    }
}

//single produt

const singleproduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server error" });
  }
};


export {removeproduct,updateproduct,listproduct,singleproduct,addproduct}



