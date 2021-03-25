const express = require('express');
const app = express();
const port = 3000;
const dotenv = require('dotenv');
//loader verification
const loaderToken = require('../loaderio-9562954a7d597633fdb1001e991dd007.txt')

dotenv.config({
  path: './config.env',
})

const productsRouter = require('./routes/productsRouter.js')

app.use(express.json());

app.use('/products', productsRouter)

app.get('/loaderio-9562954a7d597633fdb1001e991dd007.txt', (req, res) => {
  res.send(loaderToken)
})

app.listen(port, () => {
  console.log(`Connected to port: ${port}`)
})