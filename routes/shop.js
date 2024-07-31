const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/product-list', shopController.getProducts);

router.get('/product-detail/:productId', shopController.getProductDetails);

router.post('/cart', shopController.postCart);

router.get('/cart', shopController.getCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
