const path = require('path');
const express = require('express')
const mongoose = require('mongoose')
const app = express()

// *Memanggil Models dari product.js*
const Product = require('./models/products');

// connect to mongodb
mongoose.connect('mongodb://127.0.0.1/shop_db').then((result)=> {
    console.log('connected to mongodb')
}).catch((err)=>{
    console.log(err);
})

// set template engine nya
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

// route path untuk menampilkan respon nya berhasil
app.get('/', (req, res)=> {
    res.send('Hello World'); 
});


// listen untuk berhasil atau tidak saat dijalankan 
app.listen(3000, () => {
    console.log('shop app listening on http://127.0.0.1:3000')
})