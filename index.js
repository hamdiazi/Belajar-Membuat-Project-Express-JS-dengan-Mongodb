const path = require('path');
const express = require('express')
const methodOverride = require('method-override')
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
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))


// route path untuk menampilkan respon nya berhasil
app.get('/', (req, res)=> {
    res.send('Hello World'); 
});

// route path , untuk ke kelompok product 
app.get('/products', async (req, res) => {
    const { category } = req.query
    if (category) {
    const products = await Product.find({category})
    // console.log(products)
    res.render('products/index', {products, category})
}   else {
    const products = await Product.find({})
    res.render('products/index', {products, category: 'All'})
    }
})


// membuat route ke create form
app.get('/products/create', async (req, res) => {
    res.render('products/create')
})

//route untuk post
app.post('/products', async (req, res) => {
    const product = new Product(req.body)
    await product.save()
    res.redirect(`/products/${product._id}`)
})


// membuat route ke detail product
app.get('/products/:id', async (req, res) => {
    const {id} = req.params
    const product  = await Product.findById(id)
    res.render('products/show', {product})
})


// membuat route ke edit product
app.get('/products/:id/edit', async (req, res) => {
    const {id} = req.params
    const product  = await Product.findById(id)
    res.render('products/edit', {product})
})

// route untuk PUT dan EDIT Product
app.put('/products/:id', async (req, res) => {
    const {id} = req.params
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true})
    res.redirect(`/products/${product._id}`)
})


// route untuk DELETE Product
app.delete('/products/:id', async (req, res) => {
    const {id} = req.params
    await Product.findByIdAndDelete(id)
    res.redirect(`/products`)
})

// listen untuk berhasil atau tidak saat dijalankan 
app.listen(3000, () => {
    console.log('shop app listening on http://127.0.0.1:3000')
})