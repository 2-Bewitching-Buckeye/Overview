const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/product', { useNewUrlParser: true, useUnifiedTopology: true });

const productSchema = mongoose.Schema({
  product_id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  slogan: String,
  category: String,
  description: String,
  default_price: Number,
  features: [{
    feature: String,
    value: String,
  }],
  styles: [{
    style_id: { type: Number, unique: true, required: true },
    name: String,
    original_price: Number,
    sale_price: Number,
    default: Boolean,
    photos: [{
      thumbnail_url: String,
      url: String,
    }]
  }]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;