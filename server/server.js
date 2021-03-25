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

app.get('/loaderio-9562954a7d597633fdb1001e991dd007.txt', (req, res) => {
  res.send('loaderio-9562954a7d597633fdb1001e991dd007')
})

app.listen(port, () => {
  console.log(`Connected to port: ${port}`)
})