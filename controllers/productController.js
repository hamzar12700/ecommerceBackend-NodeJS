import {v2 as cloudinary} from 'cloudinary'
import upload from '../middleware/multer.js';
import productModel from '../models/ProductModel.js';

export const addProduct = async (req, res) => {
  try {
    console.log("REQ FILES:", req.files);
    console.log('req files ka data khtm yahan tk');

    const { name, desc, price, category, subCategory, sizes, bestSeller } = req.body;

    const image1 = req.files.image1?.[0];
    const image2 = req.files.image2?.[0];
    const image3 = req.files.image3?.[0];
    const image4 = req.files.image4?.[0];

    const image = [image1, image2, image3, image4].filter(Boolean);
    console.log("Images to upload:", image);

    const imageUrl = await Promise.all(
      image.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
        return result.secure_url;
      })
    );

    // Parse sizes safely
    let parsedSizes = [];
    try {
      parsedSizes = JSON.parse(sizes);
    } catch (e) {
      return res.status(400).json({ success: false, message: "Invalid sizes format" });
    }

    const productData = {
      name,
      desc,
      category,
      subCategory,
      price: Number(price),
      bestSeller: bestSeller === "true",
      sizes: parsedSizes,
      images: imageUrl,
      date: Date.now()
    };

    console.log("Final Product Data:", productData);

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: 'Product Added' });

  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

export const listProduct = async(req,res)=>{
  try {
     let product = await productModel.find({});
    res.send({success : true , product })
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
}

export const removeProduct = async (req,res)=>{
      try {
         const {productId} = req.body
     let product = await productModel.findByIdAndDelete(productId);
    res.send({success : true , product })
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
}

export const singleProduct = async (req,res)=>{
          try {
         const {productId} = req.body
     let product = await productModel.findById(productId);
    res.send({success : true , product })
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
}