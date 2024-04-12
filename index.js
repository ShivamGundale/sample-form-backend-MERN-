const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/mernstore', { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Database connected');
}


const detailSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
    Email: {
    type: String,
    required: true
  },
  Phone_no: {
    type: Number,
    required: true
  },
 
});

const Product = mongoose.model('Product', detailSchema, 'products');

server.use(express.json());
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.post('/', async (req, res) => {

  let product = new Product();
  product.Name = req.body.Name;
  product.Email = req.body.Email;
  product.Phone_no = req.body.Phone_no;
  
  const doc = await product.save();
  res.send(doc);
  console.log(doc);
});

server.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error fetching products.');
  }
});


server.listen(8080, () => {
  console.log('Server started');
});
