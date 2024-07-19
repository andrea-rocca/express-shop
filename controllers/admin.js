const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product', 
        path: '/admin/add-product',
        productsCSS: true,
        formsCSS: true,
        activeAddProduct: true
    });
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products', 
            path: '/admin/products'
        });
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = (req.body.imageUrl && req.body.imageUrl.length) ? 
        req.body.imageUrl : 
        'https://cdn.pixabay.com/photo/2016/03/31/20/51/book-1296045_960_720.png';
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, imageUrl, price, description);
    product.save();
    res.redirect('/');
};