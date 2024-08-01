const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const Cart = require('./cart');

const p = path.join(
    rootDir,
    'data',
    'products.json'
);

getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb([]);
        }
        cb(JSON.parse(fileContent));
    });
};

module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
		this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
		getProductsFromFile(products => {
			if (this.id) {
				const existingProductIndex = products.findIndex(prod => prod.id === this.id);
				const updatedProducts = [...products];
				updatedProducts[existingProductIndex] = this;
				fs.writeFile(p, JSON.stringify(updatedProducts), err => {
					if (err) {
						console.error('An error occurred: ');
						console.log(err);
					}
				});
			} else {
				this.id = Math.random().toString();
				products.push(this);
				fs.writeFile(p, JSON.stringify(products), err => {
					if (err) {
						console.error('An error occurred: ');
						console.log(err);
					}
				});
			}
        });
    }

	static deleteProduct(id) {
		getProductsFromFile(products => {
			const existingProductIndex = products.findIndex(prod => prod.id === id);
			const productPrice = products[existingProductIndex].price;
			products.splice(existingProductIndex, 1);
			fs.writeFile(p, JSON.stringify(products), err => {
				if (err) {
					console.error('An error occurred: ');
					console.log(err);
				} else {
					Cart.deleteProduct(id, productPrice);
				}
			});
        });
	}

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(el => el.id === id);
            cb(product);
        });
    }
}
