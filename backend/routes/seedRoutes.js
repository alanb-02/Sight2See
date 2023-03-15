import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js';

// creates seed route using express
const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  // remove all previous records in the product model using await product press
  await Product.deleteMany({});
  // creating new products from data.js - inserst an array of products in to the products model in db
  const createdProducts = await Product.insertMany(data.products);
  // sending products back to the frontend
  res.send({ createdProducts });
});
export default seedRouter;
