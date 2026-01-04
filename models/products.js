const mongoose = require('mongoose')

// schema untuk product nya
const productSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    brand : {
        type: String,
        required: true,
    },
    price : {
        type: Number,
        required: true,
    },
    "color" : {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum:['Baju', 'Celana','Aksesoris', 'Jaket'],
    }
})

// membuat object untuk model Product
const Product = mongoose.model('Product', productSchema); 

// export supaya bisa dipanggil di file index.js dan manapun, logicnya gak digabung khusus untuk model
module.exports = Product


