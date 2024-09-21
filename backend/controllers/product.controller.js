import Product from "../models/product.model.js"; 
import mongoose from "mongoose";


export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error in fetching products", error.message);
    res.status(500).json({ message: "Server Error" });
  }
}
export const createProduct = async (req, res) => {
  const product = req.body;
  console.log("Incoming product data:", product);
  //user will send data in req.body
  if (!product.name || !product.price || !product.image) {
     console.log("Validation failed: Missing fields"); 
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  const newProduct = new Product(product);
  const savedProduct = await newProduct.save();
  try {
    
    console.log("Product saved:", savedProduct); 
    res.status(201).json({ success: true, newProduct });
  } catch (error) {
    console.error("Error in create product", error.message);
    res.status(500).json({ message: "Server Error" });
  }
}
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product id" });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Error in update product", error.message);
    res.status(500).json({ message: "Server Error" });
  }
}
export const deleteProduct =  async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product id" });
  }
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log("Error in delete product", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
      
}
