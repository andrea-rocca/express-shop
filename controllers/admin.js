const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
		editing: false,
    });
};

exports.postAddProduct = (req, res, next) => {
	const fallbackImg = 'https://cdn.pixabay.com/photo/2016/03/31/20/51/book-1296045_960_720.png';
	const title = req.body.title;
	const imageUrl = (req.body.imageUrl && req.body.imageUrl.length) ?
		req.body.imageUrl :
		fallbackImg;
	const price = req.body.price;
	const description = req.body.description;
	const product = new Product(null, title, imageUrl, price, description);
	product.save();
	res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		return res.redirect('/');
	}
	const prodId = req.params.productId;
	Product.findById(prodId, product => {
		if (!product) {
			res.redirect('/');
		}
		res.render('admin/edit-product', {
			pageTitle: 'Edit Product',
			path: '/admin/edit-product',
			editing: editMode,
			product: product
		});
	});
};

exports.postEditProduct = (req, res, next) => {
	const prodId = req.body.productId;
	const title = req.body.title;
	const price = req.body.price;
	const imageUrl = req.body.imageUrl;
	const description = req.body.description;
	const updatedProduct = new Product(prodId, title, imageUrl, price, description);
	updatedProduct.save();
	res.redirect('/');
};

exports.postDeleteProduct = (req, res, next) => {
	const prodId = req.body.productId;
	Product.deleteProduct(prodId);
	res.redirect('/admin/products');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    });
};

