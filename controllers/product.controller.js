const Product = require('../models/product.model');

exports.product_create = function (req, res, next) {
   
    const productData =  { name, price, description } = req.body;
    const product = new Product(productData);

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send(product)
    })
};

exports.product_details = function (req, res, next) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};

exports.product_update = function (req, res, next) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Update succesfully!');
    });
};

exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

