const products = [];

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        prods: products, 
        pageTitle: 'Add Product', 
        path: '/admin/add-product',
        productsCSS: true,
        formsCSS: true,
        activeAddProduct: true
    });
};

exports.postAddProduct = (req, res, next) => {
    products.push({title: req.body.title});
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    res.render('shop', {
        prods: products, 
        pageTitle: 'Shop', 
        path: '/', 
        hasProducts: products.length > 0,
        productsCSS: true,
        activeShop: true
    });
};