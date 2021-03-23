const express = require('express');
const app = express();
const port = 3000;
const dotenv = require('dotenv');

dotenv.config({
  path: './config.env',
})

const productsRouter = require('./routes/productsRouter.js')

app.use(express.json());

app.use('/products', productsRouter)

app.listen(port, () => {
  console.log(`Connected to port: ${port}`)
})