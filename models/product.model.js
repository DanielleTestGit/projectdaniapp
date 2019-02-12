const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {type: String, required: true, maxlength: 150, minlength: 5},
    price: {type: Number, required: true},
    description: {type: String, required: true, maxlength: 500, minlength: 10},
});


// Export the model
module.exports = mongoose.model('Product', ProductSchema);