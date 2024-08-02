const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            productsCSS: true,
            activeShop: true
        });
    });
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'Shop',
            path: '/product-list',
            hasProducts: products.length > 0,
            productsCSS: true,
            activeShop: true
        });
    });
};

exports.getProductDetails = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('shop/product-detail', {
            path: '/product-list',
            pageTitle: product.title,
            product: product
        });
    });
};

exports.getCart = (req, res, next) => {
	Cart.getProducts(cart => {
		Product.fetchAll(products => {
			const cartProducts = [];
			for (let product of products) {
				const cartProductData = cart.products.find(prod => prod.id === product.id);
				if (cartProductData) {
					cartProducts.push({
						productData: product,
						qty: cartProductData.qty
					});
				}
			}
			res.render('shop/cart', {
				path: '/cart',
				pageTitle: 'Your Cart',
				products: cartProducts
			});
		});
	});
};

exports.postCart = (req, res, next) => {
	const prodId = req.body.productId;
	Product.findById( prodId, product => {
		Cart.addProduct(prodId, product.price, () => {
			res.redirect('/cart');
		});
	});
};

exports.postCartDelete = (req, res, next) => {
	const prodId = req.body.productId;
	Product.findById(prodId, product => {
		Cart.deleteProduct(prodId, product.price);
		res.redirect('/cart');
	});
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
};
