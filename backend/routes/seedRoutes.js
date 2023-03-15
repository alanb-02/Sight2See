import express from 'express';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import data from '../data.js';

// creates seed route using express
const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  // remove all previous records in the product model using await product press
  await Product.deleteMany({});
  // creating new products from data.js - inserst an array of products in to the products model in db
  const createdProducts = await Product.insertMany(data.products);

  // remove all previous records in the user model using await user press
  await User.deleteMany({});
  // creating new users from data.js - insert an array of user in to the user model in db
  const createdUsers = await User.insertMany(data.users);

  // sending products back to the frontend
  res.send({ createdProducts, createdUsers });
});
export default seedRouter;
