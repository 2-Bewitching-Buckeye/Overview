const express = require('express');

const { getProduct, getProducts, getStyles, getRelated } = require('../controller/query.js');

const router = express.Router();

router.get('/', getProducts);

router.get('/:product_id', getProduct);

router.get('/:product_id/styles', getStyles);

router.get('/:product_id/related', getRelated);

module.exports = router;